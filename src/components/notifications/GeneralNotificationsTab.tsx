import React, { useState } from "react";
import { motion } from "framer-motion";
import type {
  Notification,
  NotificationType,
} from "../../types/notificationTypes";
import { mockUsers } from "../../data/mockData";
import {
  UserPlus,
  Heart,
  ChatDots,
  At,
  Info,
  CheckCircle,
} from "phosphor-react";

// Define filter options
type TimeFilter = "all" | "today" | "thisWeek" | "thisMonth";
type ReadFilter = "all" | "read" | "unread";
type TypeFilter = "all" | NotificationType;

interface NotificationFilters {
  time: TimeFilter;
  readStatus: ReadFilter;
  type: TypeFilter;
}

interface GeneralNotificationsTabProps {
  notifications: Notification[];
  onFilterButtonClick?: () => void;
  externalFiltersActive?: boolean;
}

const GeneralNotificationsTab = ({
  notifications,
  onFilterButtonClick,
  externalFiltersActive = false,
}: GeneralNotificationsTabProps) => {
  // Filter state
  const [filters, setFilters] = useState<NotificationFilters>({
    time: "all",
    readStatus: "all",
    type: "all",
  });

  // Helper function to format preview text with highlighted mentions
  const formatPreviewWithMentions = (text: string) => {
    // If no @ mentions, just return the text
    if (!text.includes("@")) return <>{text}</>;

    // Get a random username from mockUsers for the mention
    const randomUser =
      mockUsers[Math.floor(Math.random() * mockUsers.length)].username;

    // Replace @username with the actual username
    const processedText = text.replace(/@username/g, `@${randomUser} `);

    // Split the text by spaces to find mentions
    const words = processedText.split(" ");

    return (
      <>
        {words.map((word, index) => {
          if (word.startsWith("@")) {
            return (
              <React.Fragment key={index}>
                <span className="text-blue-500">{word}</span>
                {index < words.length - 1 ? " " : ""}
              </React.Fragment>
            );
          }
          return (
            <React.Fragment key={index}>
              {word}
              {index < words.length - 1 ? " " : ""}
            </React.Fragment>
          );
        })}
      </>
    );
  };

  // Helper function to get notification icon based on type
  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case "follow":
        return <UserPlus size={14} className="text-blue-500" />;
      case "like":
        return <Heart size={14} className="text-red-500" />;
      case "comment":
        return <ChatDots size={14} className="text-green-500 " />;
      case "mention":
        return <At size={14} className="text-purple-500 " />;
      case "system":
      default:
        return <Info size={14} className="text-blue-500 " />;
    }
  };

  // Helper to render notification content
  const renderNotificationContent = (notification: Notification) => {
    // Get a specific user from mockData instead of using notification.actor
    const randomUserIndex =
      (parseInt(notification.id.replace(/[^0-9]/g, "")) || 0) %
      mockUsers.length;
    const mockUser = mockUsers[randomUserIndex];

    const user = {
      name: mockUser.displayName,
      avatar: mockUser.avatar,
      username: mockUser.username,
      isVerified: mockUser.isVerified,
    };

    return (
      <div className="flex items-start">
        {/* Avatar section - always use mock user data */}
        <div className="relative h-12 w-12 rounded-full overflow-hidden flex-shrink-0 mr-3">
          <img
            src={user.avatar}
            alt={user.name}
            className="h-full w-full object-cover"
            loading="lazy"
          />
          {/* Small icon overlay for notification type - FIXED SIZE */}
          <div className="absolute bottom-0 right-0 h-5 w-5 rounded-full bg-white  flex items-center justify-center shadow-sm">
            {getNotificationIcon(notification.type)}
          </div>
        </div>

        <div className="flex-1 pt-0.5">
          <div className="flex flex-col">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                {/* Username - always use mock user data */}
                <span className="font-semibold text-sm text-gray-900  flex items-center">
                  {user.username}
                  {user.isVerified && (
                    <span className="ml-1">
                      <CheckCircle
                        size={16}
                        weight="fill"
                        className="text-blue-500"
                      />
                    </span>
                  )}
                  {notification.otherActors && notification.otherActors > 0 && (
                    <span className="font-normal text-xs text-gray-400 ml-1">
                      and {notification.otherActors} others{" "}
                    </span>
                  )}
                </span>
                {/* Notification content */}
                <span className="text-gray-900 text-sm">
                  {notification.content}
                </span>
              </div>
              <span className="text-xs text-gray-400 ml-2 whitespace-nowrap flex-shrink-0">
                {notification.timestamp}
              </span>
            </div>
            {/* Preview of the target content with highlighted username mentions */}
            {notification.targetPost && notification.targetPost.preview && (
              <div className="mt-1.5 text-sm text-gray-900  flex">
                <span className="mr-1">"</span>
                {formatPreviewWithMentions(notification.targetPost.preview)}
                <span className="ml-1">"</span>
              </div>
            )}
          </div>
        </div>
        {!notification.read && (
          <div className="h-2.5 w-2.5 bg-blue-500 rounded-full flex-shrink-0 ml-2 mt-1.5"></div>
        )}
      </div>
    );
  };

  // Apply filters to notifications
  const filterNotifications = (notifs: Notification[]) => {
    return notifs.filter((notification) => {
      // Filter by time
      if (
        filters.time === "today" &&
        !(
          notification.timestamp.includes("h ago") ||
          notification.timestamp === "Today"
        )
      ) {
        return false;
      }
      if (
        filters.time === "thisWeek" &&
        !(
          notification.timestamp.includes("d ago") ||
          (notification.timestamp.includes("w ago") &&
            notification.timestamp.startsWith("1")) ||
          notification.timestamp.includes("h ago") ||
          notification.timestamp === "Today"
        )
      ) {
        return false;
      }
      if (
        filters.time === "thisMonth" &&
        notification.timestamp.includes("mo ago")
      ) {
        return false;
      }

      // Filter by read status
      if (filters.readStatus === "read" && !notification.read) return false;
      if (filters.readStatus === "unread" && notification.read) return false;

      // Filter by type
      if (filters.type !== "all" && notification.type !== filters.type)
        return false;

      return true;
    });
  };

  const filteredNotifications = filterNotifications(notifications);

  // Filter notifications by time period
  const todayNotifications = filteredNotifications.filter(
    (notif) => notif.timestamp.includes("h ago") || notif.timestamp === "Today"
  );

  const thisWeekNotifications = filteredNotifications.filter(
    (notif) =>
      notif.timestamp.includes("d ago") ||
      (notif.timestamp.includes("w ago") && notif.timestamp.startsWith("1"))
  );

  const hasActiveFilters =
    filters.time !== "all" ||
    filters.readStatus !== "all" ||
    filters.type !== "all";

  return (
    <div id="general-panel" role="tabpanel" aria-labelledby="general-tab">
      {/* Filter Button */}
      <div className="bg-white px-3 py-4">
        <button
          onClick={onFilterButtonClick}
          className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm ${
            externalFiltersActive
              ? "bg-blue-50 text-blue-600"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>
          <span className="font-medium">
            {externalFiltersActive ? "Filters Active" : "Filter"}
          </span>
        </button>
      </div>

      {/* Main content */}
      {filteredNotifications.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20 p-4">
          <div className="h-24 w-24 rounded-full bg-gray-100 flex items-center justify-center mb-4">
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
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900">
            {hasActiveFilters
              ? "No matching notifications"
              : "No notifications yet"}
          </h3>
          <p className="text-sm text-gray-400 text-center mt-2 max-w-xs">
            {hasActiveFilters
              ? "Try changing your filter settings to see more notifications."
              : "When you get notifications, they'll show up here."}
          </p>
          {hasActiveFilters && (
            <button
              onClick={() =>
                setFilters({ time: "all", readStatus: "all", type: "all" })
              }
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              Reset Filters
            </button>
          )}
        </div>
      ) : (
        <div>
          {/* Today's Notifications Group */}
          {todayNotifications.length > 0 && (
            <>
              <div className="pt-3 px-3 pb-1">
                <h3 className="text-xs font-medium uppercase tracking-wider text-gray-400">
                  Today
                </h3>
              </div>
              {todayNotifications.map((notification) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`px-3 py-4 ${
                    !notification.read ? "bg-gray-50" : ""
                  }`}
                  tabIndex={0}
                  role="button"
                  aria-label={`${notification.type} notification from ${
                    notification.actor?.name || "system"
                  }, ${notification.read ? "read" : "unread"}`}
                >
                  {renderNotificationContent(notification)}
                </motion.div>
              ))}
            </>
          )}

          {/* This Week's Notifications Group */}
          {thisWeekNotifications.length > 0 && (
            <>
              <div className="pt-3 px-3 pb-1 border-t border-gray-100 mt-1">
                <h3 className="text-xs font-medium uppercase tracking-wider text-gray-400">
                  This Week
                </h3>
              </div>
              {thisWeekNotifications.map((notification) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`px-3 py-4 ${
                    !notification.read ? "bg-gray-50" : ""
                  }`}
                  tabIndex={0}
                  role="button"
                  aria-label={`${notification.type} notification from ${
                    notification.actor?.name || "system"
                  }, ${notification.read ? "read" : "unread"}`}
                >
                  {renderNotificationContent(notification)}
                </motion.div>
              ))}
            </>
          )}

          {/* Other Notifications */}
          {filteredNotifications.length >
            todayNotifications.length + thisWeekNotifications.length && (
            <>
              <div className="pt-3 px-3 pb-1 border-t border-gray-100 mt-1">
                <h3 className="text-xs font-medium uppercase tracking-wider text-gray-400">
                  Earlier
                </h3>
              </div>
              {filteredNotifications
                .filter(
                  (n) =>
                    !todayNotifications.includes(n) &&
                    !thisWeekNotifications.includes(n)
                )
                .map((notification) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`px-3 py-4 ${
                      !notification.read ? "bg-gray-50" : ""
                    }`}
                    tabIndex={0}
                    role="button"
                    aria-label={`${notification.type} notification from ${
                      notification.actor?.name || "system"
                    }, ${notification.read ? "read" : "unread"}`}
                  >
                    {renderNotificationContent(notification)}
                  </motion.div>
                ))}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default GeneralNotificationsTab;
