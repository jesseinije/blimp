import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CaretLeft, MusicNote } from "@phosphor-icons/react";
import BottomSheet from "../ui/BottomSheet";

const TopBar = () => {
  const navigate = useNavigate();
  const [showDiscardModal, setShowDiscardModal] = useState(false);

  const handleBackClick = () => {
    setShowDiscardModal(true);
  };

  const handleAddMusic = () => {
    // Music selection functionality will go here in the future
    console.log("Add music clicked");
  };

  const handleDiscard = () => {
    setShowDiscardModal(false);
    navigate(-1);
  };

  const handleSaveAsDraft = () => {
    // TODO: Implement draft saving logic
    console.log("Saving as draft...");
    setShowDiscardModal(false);
    navigate(-1);
  };

  return (
    <>
      <div className="absolute top-0 left-0 right-0 p-3 z-10 ">
        <div className="flex justify-between items-center">
          <button onClick={handleBackClick} className="text-white">
            <CaretLeft size={24} />
          </button>

          <button
            onClick={handleAddMusic}
            className="bg-gray-800/50 text-white rounded-full px-4 py-2 flex items-center space-x-2"
          >
            <MusicNote size={20} />
            <span>Add music</span>
          </button>

          <div className="w-8">{/* Empty div for flex alignment */}</div>
        </div>
      </div>

      <BottomSheet
        isOpen={showDiscardModal}
        onClose={() => setShowDiscardModal(false)}
        title="Save or Discard?"
      >
        <div className="space-y-3 p-4">
          <p className="text-base text-gray-600 dark:text-gray-300 mb-6">
            Do you want to save this post as a draft or discard it?
          </p>

          <button
            onClick={handleDiscard}
            className="w-full py-3 px-4 rounded-lg bg-red-600 text-white font-medium text-center hover:bg-red-700 transition-colors"
          >
            Discard
          </button>

          <button
            onClick={handleSaveAsDraft}
            className="w-full py-3 px-4 rounded-lg bg-blue-600 text-white font-medium text-center hover:bg-blue-700 transition-colors"
          >
            Save as Draft
          </button>

          <button
            onClick={() => setShowDiscardModal(false)}
            className="w-full py-3 px-4 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-medium text-center border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Continue Editing
          </button>
        </div>
      </BottomSheet>
    </>
  );
};

export default TopBar;
