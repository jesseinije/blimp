import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import type {
  PrivateMessage,
  SuggestedAccount,
} from "../../types/notificationTypes";
import SuggestedAccounts from "./SuggestedAccounts";
import { mockUsers } from "../../data/mockData";
import YourStory from "./YourStory"; // Change this import

interface PrivateMessagesTabProps {
  messages: PrivateMessage[];
}

const PrivateMessagesTab = ({ messages }: PrivateMessagesTabProps) => {
  const navigate = useNavigate();

  // Example suggested accounts data - in a real app, this would come from props or API
  const suggestedAccounts: SuggestedAccount[] = [
    {
      id: "1",
      username: "tiffanyleechambers",
      name: "Tiffany Lee Chambers",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      followers: 15400,
    },
    {
      id: "2",
      username: "natestackondeckjenninhs",
      name: "Nate Jennings",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      followers: 8900,
    },
    {
      id: "3",
      username: "ruelettienne",
      name: "Ruel Ettienne",
      avatar: "https://randomuser.me/api/portraits/men/46.jpg",
      followers: 12300,
    },
    {
      id: "4",
      username: "dte1973",
      name: "Darcy Thompson-Edwards",
      avatar: "https://randomuser.me/api/portraits/women/28.jpg",
      followers: 5600,
    },
    {
      id: "5",
      username: "tdogforreal",
      name: "Terrence Marshall",
      avatar: "https://randomuser.me/api/portraits/men/52.jpg",
      followers: 9200,
    },
  ];

  const handleOpenChat = (message: PrivateMessage) => {
    navigate(`/chat/${message.sender.id}`);
  };

  // Function to get a specific user from mockData
  const getMockUser = (userId: string) => {
    const userIndex = parseInt(userId) % mockUsers.length;
    return mockUsers[userIndex];
  };

  return (
    <div id="private-panel" role="tabpanel" aria-labelledby="private-tab">
      {/* Replace Stories with YourStory */}
      <YourStory />

      {messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20 p-4">
          {/* Empty state content */}
          <div className="h-24 w-24 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
            <svg
              className="h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            No messages yet
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-2 max-w-xs">
            When you receive messages from other users, they'll show up here.
          </p>
        </div>
      ) : (
        <div className="mt-2">
          {" "}
          {/* Changed from mt-4 to mt-2 to reduce space after Stories */}
          {messages.map((message) => {
            // Get a user from mockUsers based on the message sender ID
            const mockUser = getMockUser(message.sender.id);

            return (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`px-3 py-4 ${
                  message.isUnread ? "bg-gray-50 dark:bg-gray-800/40" : ""
                }`}
                tabIndex={0}
                role="button"
                aria-label={`Message from ${message.sender.name}, ${
                  message.isUnread ? "unread" : "read"
                }`}
                onClick={() => handleOpenChat(message)}
              >
                <div className="flex items-center">
                  <div className="relative">
                    <div className="h-14 w-14 rounded-full overflow-hidden flex-shrink-0 mr-3 border border-gray-100 dark:border-gray-700">
                      <img
                        src={mockUser.avatar}
                        alt=""
                        aria-hidden="true"
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    {message.isOnline && (
                      <div
                        className="absolute bottom-0 right-3 h-4 w-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"
                        aria-label="Online"
                      ></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <p
                        className={`font-semibold text-sm text-gray-900 dark:text-white truncate pr-2`}
                      >
                        {mockUser.username}
                      </p>
                      <span className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0">
                        {message.timestamp}
                      </span>
                    </div>
                    <p
                      className={`text-sm truncate pr-4 mt-1 ${
                        message.isUnread
                          ? "font-medium text-gray-900 dark:text-white"
                          : "text-gray-500 dark:text-gray-400"
                      }`}
                    >
                      {message.lastMessage}
                    </p>
                  </div>
                  {message.isUnread && (
                    <div
                      className="h-2.5 w-2.5 bg-blue-500 rounded-full flex-shrink-0 ml-2"
                      aria-label="Unread message"
                    ></div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* SuggestedAccounts component */}
      <div className="mt-4 pt-2">
        <SuggestedAccounts accounts={suggestedAccounts} />
      </div>
    </div>
  );
};

export default PrivateMessagesTab;
