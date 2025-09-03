import { useState, useEffect } from "react";
import {
  Image,
  Pause,
  Play,
  Check,
  ArrowCounterClockwise,
  ArrowClockwise,
} from "phosphor-react";

// Add isRecording to the props being passed up to parent
interface BottomCameraControlsProps {
  onCapture: () => void;
  onUpload: () => void;
  onNext?: () => void;
  onRecordingStart?: () => void; // New prop for notifying parent when recording starts
  onTogglePause?: (isPaused: boolean) => void; // New prop for notifying parent when pause state changes
  maxRecordingDuration?: number; // in seconds
  onRecordingStateChange?: (isRecording: boolean) => void;
}

interface RecordingSession {
  startPercent: number; // Starting position in progress percentage
  endPercent: number; // Ending position in progress percentage
}

const BottomCameraControls = ({
  onCapture,
  onUpload,
  onNext = () => {},
  onRecordingStart = () => {}, // Default empty function
  onTogglePause = () => {}, // Default empty function
  maxRecordingDuration = 60, // Default 60 seconds max recording time
  onRecordingStateChange = () => {},
}: BottomCameraControlsProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingProgress, setRecordingProgress] = useState(0);
  const [recordingStartTime, setRecordingStartTime] = useState<number | null>(
    null
  );
  const [totalElapsedTime, setTotalElapsedTime] = useState(0);
  const [recordingSessions, setRecordingSessions] = useState<
    RecordingSession[]
  >([]);
  const [removedSessions, setRemovedSessions] = useState<RecordingSession[]>(
    []
  );
  const [currentSessionStartPercent, setCurrentSessionStartPercent] =
    useState(0);
  // New state to track when recording has finished (reached max time)
  const [isRecordingFinished, setIsRecordingFinished] = useState(false);
  // Add new state for remaining time
  const [remainingTime, setRemainingTime] = useState(maxRecordingDuration);

  // Helper function to format time as mm:ss
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  // Handle recording progress
  useEffect(() => {
    let progressInterval: ReturnType<typeof setInterval>;

    if (isRecording && recordingStartTime && !isPaused) {
      progressInterval = setInterval(() => {
        const currentElapsed = (Date.now() - recordingStartTime) / 1000;
        const totalElapsed = totalElapsedTime + currentElapsed;
        const progress = Math.min(
          (totalElapsed / maxRecordingDuration) * 100,
          100
        );

        setRecordingProgress(progress);
        setRemainingTime(Math.max(0, maxRecordingDuration - totalElapsed));

        if (progress >= 100) {
          handleStopRecording();
        }
      }, 100);
    }

    return () => {
      if (progressInterval) {
        clearInterval(progressInterval);
      }
    };
  }, [
    isRecording,
    recordingStartTime,
    isPaused,
    totalElapsedTime,
    maxRecordingDuration,
  ]);

  const handleCapturePress = () => {
    if (!isRecording) {
      // Start recording
      startRecording();
    } else {
      // Toggle pause/resume if already recording
      togglePauseResume();
    }
  };

  const setRecordingState = (state: boolean) => {
    setIsRecording(state);
    onRecordingStateChange(state);
  };

  const startRecording = () => {
    setRecordingState(true);
    setIsPaused(false);
    onTogglePause(false);
    setRecordingStartTime(Date.now());
    setRecordingProgress(0);
    setTotalElapsedTime(0);
    setRecordingSessions([]);
    setRemovedSessions([]);
    setCurrentSessionStartPercent(0);
    setIsRecordingFinished(false); // Reset recording finished state when starting a new recording
    setRemainingTime(maxRecordingDuration); // Reset remaining time
    onRecordingStart(); // Notify parent component that recording has started
  };

  const togglePauseResume = () => {
    if (isPaused) {
      // Resume recording - start a new session
      setIsPaused(false);
      onTogglePause(false);
      setRecordingStartTime(Date.now());
      setCurrentSessionStartPercent(recordingProgress);
    } else {
      // Pause recording - end current session
      setIsPaused(true);
      onTogglePause(true);

      // Add the current session to the sessions array
      setRecordingSessions((prevSessions) => [
        ...prevSessions,
        {
          startPercent: currentSessionStartPercent,
          endPercent: recordingProgress,
        },
      ]);

      // Save the elapsed time so far
      if (recordingStartTime) {
        const currentElapsed = (Date.now() - recordingStartTime) / 1000;
        setTotalElapsedTime((prev) => prev + currentElapsed);
      }
      setRecordingStartTime(null);
    }
  };

  const handleUndo = () => {
    // Remove the last recording session
    if (recordingSessions.length > 0) {
      const lastSession = recordingSessions[recordingSessions.length - 1];

      // Add to the removed sessions stack for redo functionality
      setRemovedSessions((prev) => [...prev, lastSession]);

      // Update total elapsed time
      const sessionDuration =
        ((lastSession.endPercent - lastSession.startPercent) / 100) *
        maxRecordingDuration;
      setTotalElapsedTime((prev) => Math.max(0, prev - sessionDuration));

      // Update recording progress
      if (recordingSessions.length > 1) {
        const previousSession = recordingSessions[recordingSessions.length - 2];
        setRecordingProgress(previousSession.endPercent);
        setCurrentSessionStartPercent(previousSession.endPercent);
      } else {
        setRecordingProgress(0);
        setCurrentSessionStartPercent(0);
      }

      // Remove the last session
      setRecordingSessions((prev) => prev.slice(0, -1));
    }
  };

  const handleRedo = () => {
    // Restore the last removed session if available
    if (removedSessions.length > 0) {
      const sessionToRestore = removedSessions[removedSessions.length - 1];

      // Add back to recording sessions
      setRecordingSessions((prev) => [...prev, sessionToRestore]);

      // Update total elapsed time
      const sessionDuration =
        ((sessionToRestore.endPercent - sessionToRestore.startPercent) / 100) *
        maxRecordingDuration;
      setTotalElapsedTime((prev) => prev + sessionDuration);

      // Update recording progress
      setRecordingProgress(sessionToRestore.endPercent);
      setCurrentSessionStartPercent(sessionToRestore.endPercent);

      // Remove from the removed sessions stack
      setRemovedSessions((prev) => prev.slice(0, -1));
    }
  };

  const handleNext = () => {
    // Proceed to the next step (edit, add effects, etc.)
    onNext();
  };

  const handleStopRecording = () => {
    // Add the final session if we're recording
    if (
      isRecording &&
      !isPaused &&
      recordingProgress > currentSessionStartPercent
    ) {
      setRecordingSessions((prevSessions) => [
        ...prevSessions,
        {
          startPercent: currentSessionStartPercent,
          endPercent: recordingProgress,
        },
      ]);
    }

    // Stop the active recording but preserve the sessions
    setIsRecording(false);
    setIsPaused(true); // Set to paused to show controls
    onTogglePause(true);
    setRecordingStartTime(null);
    // Set recording as finished to maintain the red ring and show controls
    setIsRecordingFinished(true);
    onCapture();
  };

  const handleUpload = () => {
    onUpload();
  };

  // SVG for the progress circle - increase stroke width from 4 to 6
  const radius = 40;
  const innerRadius = 37; // Decreased to account for thicker stroke
  const outerRadius = 43; // Increased to account for thicker stroke
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - recordingProgress / 100);

  // Generate paths for each recording session
  const createSessionPath = (session: RecordingSession) => {
    const startAngle =
      (session.startPercent / 100) * (2 * Math.PI) - Math.PI / 2;
    const endAngle = (session.endPercent / 100) * (2 * Math.PI) - Math.PI / 2;

    const startX = 40 + radius * Math.cos(startAngle);
    const startY = 40 + radius * Math.sin(startAngle);
    const endX = 40 + radius * Math.cos(endAngle);
    const endY = 40 + radius * Math.sin(endAngle);

    // Determine if arc should be drawn the long way around
    const largeArcFlag = endAngle - startAngle > Math.PI ? 1 : 0;

    // Create SVG arc path
    return `M ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`;
  };

  // Show additional controls when paused or when recording is finished
  const showAdditionalControls =
    (isRecording && isPaused) || isRecordingFinished;

  // Check if redo is available and should be enabled
  const canRedo = removedSessions.length > 0 && !isRecordingFinished;

  // Check if undo is available and should be enabled
  const canUndo = recordingSessions.length > 0 && !isRecordingFinished;

  return (
    <div className="absolute bottom-8 left-0 right-0">
      <div className="mx-auto max-w-md">
        <div className="flex justify-evenly items-center">
          {/* Upload button */}
          <div className=" -ml-2 flex justify-center items-center">
            <div
              className={`transition-opacity duration-200 ${
                isRecording || isRecordingFinished
                  ? "opacity-0 pointer-events-none"
                  : "opacity-100"
              }`}
            >
              <button
                onClick={handleUpload}
                className="flex flex-col items-center"
              >
                <Image size={54} weight="fill" className="text-white" />
                <span className="text-white text-xs mt-1">Upload</span>
              </button>
            </div>
          </div>

          {/* Undo button */}
          <div className="w-12 h-12 flex justify-center items-center">
            <button
              onClick={handleUndo}
              disabled={
                !canUndo || !showAdditionalControls || isRecordingFinished
              }
              className={`w-12 h-12 rounded-full flex justify-center items-center transition-opacity duration-200
                ${
                  showAdditionalControls
                    ? "opacity-100"
                    : "opacity-0 pointer-events-none"
                }
                ${
                  canUndo && !isRecordingFinished
                    ? "bg-gray-800/50"
                    : "bg-gray-800/20"
                }`}
            >
              <ArrowCounterClockwise
                size={20}
                weight="bold"
                className={`${
                  canUndo && !isRecordingFinished
                    ? "text-white"
                    : "text-gray-400"
                }`}
              />
            </button>
          </div>

          {/* Center record button with countdown timer */}
          <div className="flex-shrink-0">
            {/* Add countdown timer above the record button */}
            {isRecording && (
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                <span className="text-white text-lg font-medium tabular-nums">
                  {formatTime(remainingTime)}
                </span>
              </div>
            )}

            <button
              onClick={handleCapturePress}
              className="relative w-20 h-20 focus:outline-none"
              disabled={isRecordingFinished}
            >
              {/* Session markers and progress ring */}
              <div className="absolute inset-0 flex items-center justify-center">
                <svg
                  width="80"
                  height="80"
                  viewBox="0 0 80 80"
                  className="overflow-visible"
                >
                  {/* White session markers - increase stroke width from 4 to 6 */}
                  {recordingSessions.map((session, index) => (
                    <path
                      key={`session-${index}`}
                      d={createSessionPath(session)}
                      stroke="white"
                      strokeWidth="6"
                      fill="none"
                      className="opacity-70"
                    />
                  ))}

                  {/* Current red progress ring - increase stroke width from 4 to 6 */}
                  {(isRecording || isRecordingFinished) && (
                    <circle
                      cx="40"
                      cy="40"
                      r={radius}
                      stroke="#EF4444"
                      strokeWidth="6"
                      fill="none"
                      strokeDasharray={circumference}
                      strokeDashoffset={dashOffset}
                      className={`transition-all ${
                        isPaused || isRecordingFinished
                          ? ""
                          : "duration-100 ease-linear"
                      }`}
                      transform="rotate(-90 40 40)"
                    />
                  )}

                  {/* White segment dividers - increase stroke width from 2 to 3 */}
                  {recordingSessions.map((session, index) => {
                    const angle =
                      (session.endPercent / 100) * (2 * Math.PI) - Math.PI / 2;
                    const innerX = 40 + innerRadius * Math.cos(angle);
                    const innerY = 40 + innerRadius * Math.sin(angle);
                    const outerX = 40 + outerRadius * Math.cos(angle);
                    const outerY = 40 + outerRadius * Math.sin(angle);

                    return (
                      <line
                        key={`divider-${index}`}
                        x1={innerX}
                        y1={innerY}
                        x2={outerX}
                        y2={outerY}
                        stroke="white"
                        strokeWidth="3"
                        className="opacity-80"
                      />
                    );
                  })}
                </svg>
              </div>

              {/* Inner button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className={`w-[85%] h-[85%] bg-red-500 rounded-full flex items-center justify-center ${
                    isRecording || isRecordingFinished ? "scale-90" : ""
                  } transition-transform ${
                    isRecordingFinished ? "opacity-50" : "opacity-100"
                  }`}
                >
                  {(isRecording || isRecordingFinished) && (
                    <div>
                      {isPaused || isRecordingFinished ? (
                        <Play
                          size={24}
                          weight="fill"
                          className={`text-white ${
                            isRecordingFinished ? "opacity-0" : ""
                          }`}
                        />
                      ) : (
                        <Pause size={24} weight="fill" className="text-white" />
                      )}
                    </div>
                  )}
                </div>
              </div>
            </button>
          </div>

          {/* Redo button */}
          <div className="w-12 h-12 flex justify-center items-center">
            <button
              onClick={handleRedo}
              disabled={
                !canRedo || !showAdditionalControls || isRecordingFinished
              }
              className={`w-12 h-12 rounded-full flex justify-center items-center transition-opacity duration-200
                ${
                  showAdditionalControls
                    ? "opacity-100"
                    : "opacity-0 pointer-events-none"
                }
                ${
                  canRedo && !isRecordingFinished
                    ? "bg-gray-800/50"
                    : "bg-gray-800/20"
                }`}
            >
              <ArrowClockwise
                size={20}
                weight="bold"
                className={`${
                  canRedo && !isRecordingFinished
                    ? "text-white"
                    : "text-gray-400"
                }`}
              />
            </button>
          </div>

          {/* Next button - Only enabled button when recording is finished */}
          <div className=" flex justify-center items-center">
            <button
              onClick={handleNext}
              disabled={!showAdditionalControls}
              className={`w-12 h-12 bg-white rounded-full flex justify-center items-center transition-opacity duration-200
                ${
                  showAdditionalControls
                    ? "opacity-100"
                    : "opacity-0 pointer-events-none"
                } ${isRecordingFinished ? "animate-pulse" : ""}`}
            >
              <Check size={20} weight="bold" className="text-black" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomCameraControls;
