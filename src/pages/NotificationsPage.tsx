import { useState } from "react";
import PageHeader from "../components/layout/PageHeader";
import { useElementHeight } from "../hooks/useElementHeight";
import PrivateMessagesTab from "../components/notifications/PrivateMessagesTab";
import GeneralNotificationsTab from "../components/notifications/GeneralNotificationsTab";
import {
  mockPrivateMessages,
  mockNotifications,
} from "../data/notificationsData";
import BottomSheet from "../components/ui/BottomSheet";

type NotificationTabType = "private" | "general";

const NotificationsPage = () => {
  const [activeTab, setActiveTab] = useState<NotificationTabType>("private");
  const [showFilters, setShowFilters] = useState(false);
  const headerHeight = useElementHeight(".page-header");

  const handleTabChange = (tab: NotificationTabType) => {
    setActiveTab(tab);
  };

  // Add this function to handle filter button clicks from the GeneralNotificationsTab
  const handleFilterButtonClick = () => {
    setShowFilters(true);
  };

  return (
    <div className="min-h-screen pb-16 bg-white">
      {/* Fixed PageHeader */}
      <div className="fixed top-0 left-0 right-0 z-10 bg-white">
        <PageHeader
          title="Activities"
          showBackButton={false}
          rightIcon="more"
          showBorder={false}
        />
      </div>

      {/* Content area with padding-top to account for fixed header */}
      <div style={{ paddingTop: headerHeight }}>
        {/* Tabs below the PageHeader */}
        <nav className="flex border-b border-gray-200" role="tablist">
          <button
            onClick={() => handleTabChange("private")}
            className={`w-1/2 py-3 text-center focus:outline-none text-sm font-medium transition-colors ${
              activeTab === "private"
                ? "text-gray-900 dark:text-white border-b-2 border-black bg-gray-50"
                : "text-gray-500 dark:text-gray-400"
            }`}
            role="tab"
            aria-selected={activeTab === "private"}
            aria-controls="private-panel"
            id="private-tab"
            aria-label="Private messages"
          >
            <div className="inline-flex items-center">
              <span>Messages</span>
              <span className="ml-1.5 bg-red-500 text-white text-xs rounded-full h-5 min-w-[20px] inline-flex items-center justify-center px-1">
                3
              </span>
            </div>
          </button>
          <button
            onClick={() => handleTabChange("general")}
            className={`w-1/2 py-3 text-center focus:outline-none text-sm font-medium transition-colors ${
              activeTab === "general"
                ? "text-gray-900 dark:text-white border-b-2 border-black bg-gray-50"
                : "text-gray-500 dark:text-gray-400"
            }`}
            role="tab"
            aria-selected={activeTab === "general"}
            aria-controls="general-panel"
            id="general-tab"
            aria-label="General notifications"
          >
            <div className="inline-flex items-center">
              <span>Notifications</span>
              <span className="ml-1.5 bg-red-500 text-white text-xs rounded-full h-5 min-w-[20px] inline-flex items-center justify-center px-1">
                5
              </span>
            </div>
          </button>
        </nav>

        {/* Tab content */}
        <div aria-live="polite">
          {/* Private Messages Tab */}
          <div className={activeTab === "private" ? "block" : "hidden"}>
            <PrivateMessagesTab messages={mockPrivateMessages} />
          </div>

          {/* General Notifications Tab */}
          <div className={activeTab === "general" ? "block" : "hidden"}>
            <GeneralNotificationsTab
              notifications={mockNotifications}
              onFilterButtonClick={handleFilterButtonClick}
              externalFiltersActive={showFilters}
            />
          </div>
        </div>
      </div>

      {/* Filter Bottom Sheet */}
      <BottomSheet
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        title="Filter Notifications"
        height="80vh"
        showHandle={true}
      >
        <div className="px-0 space-y-6">
          {/* Time Filter */}
          <div>
            <h3 className="text-base font-medium text-gray-900 dark:text-white mb-3">
              Time Period
            </h3>
            <div className="space-y-3 text-sm">
              <div className="py-2 text-gray-900 dark:text-white">All Time</div>
              <div className="py-2 text-gray-900 dark:text-white">Today</div>
              <div className="py-2 text-gray-900 dark:text-white">
                This Week
              </div>
              <div className="py-2 text-gray-900 dark:text-white">
                This Month
              </div>
            </div>
          </div>

          {/* Divider between sections */}
          <div className="border-t border-gray-200 dark:border-gray-700"></div>

          {/* Read Status Filter */}
          <div>
            <h3 className="text-base font-medium text-gray-900 dark:text-white mb-3">
              Read Status
            </h3>
            <div className="space-y-3 text-sm">
              <div className="py-2 text-gray-900 dark:text-white">All</div>
              <div className="py-2 text-gray-900 dark:text-white">Read</div>
              <div className="py-2 text-gray-900 dark:text-white">Unread</div>
            </div>
          </div>

          {/* Divider between sections */}
          <div className="border-t border-gray-200 dark:border-gray-700"></div>

          {/* Notification Type Filter */}
          <div>
            <h3 className="text-base font-medium text-gray-900 dark:text-white mb-3">
              Type
            </h3>
            <div className="space-y-3 text-sm">
              <div className="py-2 text-gray-900 dark:text-white">
                All Types
              </div>
              <div className="py-2 text-gray-900 dark:text-white">Follows</div>
              <div className="py-2 text-gray-900 dark:text-white">Likes</div>
              <div className="py-2 text-gray-900 dark:text-white">Comments</div>
              <div className="py-2 text-gray-900 dark:text-white">Mentions</div>
              <div className="py-2 text-gray-900 dark:text-white">System</div>
            </div>
          </div>
        </div>
      </BottomSheet>
    </div>
  );
};

export default NotificationsPage;
