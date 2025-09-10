import PageHeader from "../components/layout/PageHeader";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import type {
  PrivateMessage,
  SuggestedAccount,
} from "../types/notificationTypes";
import SuggestedAccounts from "../components/notifications/SuggestedAccounts";
import { mockUsers } from "../data/mockData";
import YourStory from "../components/notifications/YourStory";
import { mockPrivateMessages } from "../data/notificationsData"; // Import mock messages

const DirectMessages = () => {
  const navigate = useNavigate();
  const messages = mockPrivateMessages; // Use mock messages

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

  // Handler for when the pencil icon is clicked
  const handleEditClick = () => {
    // Handle edit action - you can navigate to a compose message page or open a modal
    console.log("Edit button clicked");
    // Example: navigate("/compose-message");
  };

  return (
    <div className="min-h-screen mb-20 bg-white">
      {/* Fixed PageHeader */}
      <div className="fixed top-0 left-0 right-0 z-10 bg-white">
        <PageHeader
          title="Messages"
          showBackButton={false}
          showBorder={false}
          rightIcon="pencil"
          onRightIconClick={handleEditClick}
        />
      </div>

      {/* Content area with padding-top to account for fixed header */}
      <div className="mt-[5rem]">
        {/* Replace Stories with YourStory */}
        <YourStory />

        <div className="mt-2">
          {messages.map((message) => {
            // Get a user from mockUsers based on the message sender ID
            const mockUser = getMockUser(message.sender.id);

            return (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`px-3 py-4 ${message.isUnread ? "" : ""}`}
                tabIndex={0}
                role="button"
                aria-label={`Message from ${message.sender.name}, ${
                  message.isUnread ? "unread" : "read"
                }`}
                onClick={() => handleOpenChat(message)}
              >
                <div className="flex items-center">
                  <div className="relative">
                    <div className="h-14 w-14 rounded-full overflow-hidden flex-shrink-0 mr-3 border border-gray-100">
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
                        className="absolute bottom-0 right-3 h-4 w-4 bg-green-500 rounded-full border-2 border-white"
                        aria-label="Online"
                      ></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <p
                        className={`font-semibold text-sm text-gray-900 truncate pr-2`}
                      >
                        {mockUser.username}
                      </p>
                      <span className="text-sm text-gray-400 flex-shrink-0">
                        {message.timestamp}
                      </span>
                    </div>
                    <p
                      className={`text-sm truncate pr-4 mt-1 ${
                        message.isUnread
                          ? "font-medium text-gray-900"
                          : "text-gray-400"
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

        {/* SuggestedAccounts component */}
        <div className="mt-4 pt-2">
          <SuggestedAccounts accounts={suggestedAccounts} />
        </div>
      </div>
    </div>
  );
};

export default DirectMessages;
