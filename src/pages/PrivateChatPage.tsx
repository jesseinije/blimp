import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  CaretLeft, // Replace ArrowLeft with CaretLeft
  PaperPlaneRight,
  Microphone,
  Image,
  Smiley,
  CheckCircle,
  Gear,
} from "phosphor-react";
import { mockUsers } from "../data/mockData"; // Import mockUsers
import styles from "./ChatPage.module.css";

// Define the chat message interface
interface ChatMessage {
  id: string;
  content: string;
  timestamp: string;
  isFromMe: boolean;
  status?: "sent" | "delivered" | "read";
  media?: {
    type: "image" | "video";
    url: string;
  }[];
}

// Define the chat contact interface
interface ChatContact {
  id: string;
  name: string;
  username: string;
  avatar: string;
  isOnline: boolean;
  lastSeen?: string;
  followers: number;
  posts: number;
  isVerified?: boolean;
}

const PrivateChatPage = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [contact, setContact] = useState<ChatContact | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mock data for demonstration
  useEffect(() => {
    // Find the user from mockData based on userId or use the first user as fallback
    const mockUser = mockUsers.find((u) => u.id === userId) || mockUsers[0];

    // Use actual data from mockData
    setContact({
      id: mockUser.id,
      name: mockUser.displayName,
      username: mockUser.username,
      avatar: mockUser.avatar,
      isOnline: true,
      lastSeen: "Today at 2:10 pm",
      followers: mockUser.followers,
      posts: 1, // No post count in mockUser, keeping 1 as default
      isVerified: mockUser.isVerified,
    });

    setMessages([
      {
        id: "1",
        content: "STRUGGLING TO RAISE CAPITAL FOR YOUR BUSINESS?",
        timestamp: "8 May, 2:10 pm",
        isFromMe: false,
        status: "read",
      },
      {
        id: "2",
        content:
          "Banks say no. Investors aren't picking calls. Collateral? You don't have it.",
        timestamp: "8 May, 2:10 pm",
        isFromMe: false,
        status: "read",
      },
      {
        id: "3",
        content: `Hi ${mockUser.username}, thanks for reaching out. Can you tell me more about your funding options?`,
        timestamp: "8 May, 2:15 pm",
        isFromMe: true,
        status: "read",
      },
      {
        id: "4",
        content:
          "Absolutely! We offer flexible financing options tailored for small businesses.",
        timestamp: "8 May, 2:18 pm",
        isFromMe: false,
        status: "read",
      },
      {
        id: "5",
        content:
          "Would you be available for a quick call tomorrow to discuss your specific needs?",
        timestamp: "8 May, 2:20 pm",
        isFromMe: false,
        status: "read",
      },
      {
        id: "6",
        content: "That sounds great. How about 11am?",
        timestamp: "8 May, 2:25 pm",
        isFromMe: true,
        status: "delivered",
      },
    ]);
  }, [userId]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        content: message,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        isFromMe: true,
        status: "sent",
      };

      setMessages([...messages, newMessage]);
      setMessage("");
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const formatMessageDate = (timestamp: string) => {
    // In a real app, you'd use a proper date formatting library like date-fns
    return timestamp;
  };

  // Group messages by date
  const groupMessagesByDate = (messages: ChatMessage[]) => {
    const groups: { [key: string]: ChatMessage[] } = {};

    messages.forEach((message) => {
      // In a real app, extract just the date part
      const dateKey = message.timestamp.split(",")[0];
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(message);
    });

    return groups;
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1).replace(/\.0$/, "")}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1).replace(/\.0$/, "")}K`;
    }
    return num.toString();
  };

  const messageGroups = groupMessagesByDate(messages);

  if (!contact) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className={`flex flex-col bg-white relative ${styles.chatContainer}`}>
      {/* Header */}
      <header
        className="flex items-center px-3 py-2 bg-white sticky top-0 z-10"
        style={{
          boxShadow: "0 0.3px 0 0 rgba(229, 231, 235, 1)",
        }}
      >
        <button onClick={handleBack} aria-label="Back">
          <CaretLeft size={24} className="text-gray-900" />
        </button>

        {/* Center container for avatar and username */}
        <div className="flex-1 flex justify-center items-center">
          <div className="flex items-center">
            <div className="relative">
              <img
                src={contact.avatar}
                alt={contact.username}
                className="w-8 h-8 rounded-full object-cover border border-gray-200"
              />
              {contact.isOnline && (
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
              )}
            </div>

            <div className="ml-2 max-w-[120px]">
              <div className="flex items-center">
                <h2 className="font-semibold text-sm text-gray-900  truncate flex items-center whitespace-nowrap">
                  {contact.username}
                  {contact.isVerified && (
                    <CheckCircle
                      size={16}
                      weight="fill"
                      className="text-blue-500 ml-1 flex-shrink-0"
                    />
                  )}
                </h2>
              </div>
              <div className="text-xs text-gray-400 truncate">
                {contact.isOnline ? "Active now" : contact.lastSeen}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button aria-label="More options">
            <Gear size={24} className="text-gray-900" />
          </button>
        </div>
      </header>

      {/* Chat Area including User Profile Section */}
      <div className="flex-1 overflow-y-auto p-3 bg-white no-scrollbar">
        {/* User Profile Section integrated within Chat Area */}
        <div className="flex flex-col items-center mb-6 pt-2">
          {/* Large Avatar */}
          <div className="relative mb-3">
            <img
              src={contact.avatar}
              alt={contact.username}
              className="w-24 h-24 rounded-full object-cover border border-gray-200"
            />
            {contact.isOnline && (
              <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
            )}
          </div>

          {/* User Info */}
          <h1 className="text-xl font-bold text-gray-900 flex items-center">
            {contact.name}
            {contact.isVerified && (
              <CheckCircle
                size={24}
                weight="fill"
                className="text-blue-500 ml-1 flex-shrink-0"
              />
            )}
          </h1>
          <p className="text-gray-600 mb-2">{contact.username}</p>

          {/* Stats */}
          <div className="flex items-center space-x-4 text-sm text-gray-400 mb-4">
            <span>{formatNumber(contact.followers)} followers</span>
          </div>
        </div>

        {/* Message groups */}
        {Object.entries(messageGroups).map(([date, msgs]) => (
          <div key={date} className="mb-6">
            <div className="flex justify-center mb-4">
              <div className="px-3 py-1">
                <span className="text-xs font-medium text-gray-600">
                  {date}
                </span>
              </div>
            </div>

            {msgs.map((msg) => (
              <div
                key={msg.id}
                className={`flex mb-4 ${
                  msg.isFromMe ? "justify-end" : "justify-start"
                }`}
              >
                {!msg.isFromMe && (
                  <div className="flex-shrink-0 mr-2">
                    <img
                      src={contact.avatar}
                      alt={contact.username}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  </div>
                )}

                <div className="max-w-[70%]">
                  <div
                    className={`px-4 py-2 rounded-2xl ${
                      msg.isFromMe
                        ? "bg-blue-500 text-white rounded-tr-none"
                        : "bg-gray-100 text-gray-900  rounded-tl-none"
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                  </div>
                  <div
                    className={`mt-1 flex items-center text-xs text-gray-400 ${
                      msg.isFromMe ? "justify-end" : "justify-start"
                    }`}
                  >
                    <span>
                      {formatMessageDate(msg.timestamp.split(",")[1].trim())}
                    </span>

                    {msg.isFromMe && (
                      <span className="ml-1">
                        {msg.status === "read" && (
                          <svg
                            className="w-3.5 h-3.5 text-blue-500"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M9.55 18l-5.7-5.7 1.425-1.425L9.55 15.15l9.175-9.175L20.15 7.4z" />
                          </svg>
                        )}
                        {msg.status === "delivered" && (
                          <svg
                            className="w-3.5 h-3.5 text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M9.55 18l-5.7-5.7 1.425-1.425L9.55 15.15l9.175-9.175L20.15 7.4z" />
                          </svg>
                        )}
                        {msg.status === "sent" && (
                          <svg
                            className="w-3.5 h-3.5 text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
                          </svg>
                        )}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input Area */}
      <div className=" py-3 border-t border-gray-200 bg-white">
        <div className="flex items-center">
          <button className="p-2 text-gray-400 rounded-full hover:bg-gray-100 transition-colors">
            <Smiley size={24} />
          </button>

          <div className="flex-1 mx-2">
            <input
              type="text"
              placeholder="Message..."
              className="w-full p-1 border border-gray-300 rounded-full focus:outline-none"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSendMessage();
                }
              }}
            />
          </div>

          {!message.trim() ? (
            <>
              <button className="p-2 text-gray-400 rounded-full hover:bg-gray-100 transition-colors mr-1">
                <Image size={24} />
              </button>
              <button className="p-2 text-gray-400 rounded-full hover:bg-gray-100 transition-colors">
                <Microphone size={24} />
              </button>
            </>
          ) : (
            <button
              onClick={handleSendMessage}
              className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
            >
              <PaperPlaneRight size={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PrivateChatPage;
