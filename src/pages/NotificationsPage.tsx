import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/layout/PageHeader";
import { useElementHeight } from "../hooks/useElementHeight";
import PrivateMessagesTab from "../components/notifications/PrivateMessagesTab";
import GeneralNotificationsTab from "../components/notifications/GeneralNotificationsTab";
import {
  mockPrivateMessages,
  mockNotifications,
} from "../data/notificationsData";
import BottomSheet from "../components/ui/BottomSheet";
import { Chat, Bell, Users } from "../Icons";

type NotificationTabType = "private" | "general" | "accounts";

const NotificationsPage = () => {
  const [activeTab, setActiveTab] = useState<NotificationTabType>("private");
  const [showFilters, setShowFilters] = useState(false);
  const headerHeight = useElementHeight(".page-header");
  const navigate = useNavigate();

  const handleTabChange = (tab: NotificationTabType) => {
    if (tab === "accounts") {
      // Navigate to the SuggestedAccountPage
      navigate("/suggested-accounts");
    } else {
      setActiveTab(tab);
    }
  };

  const handleFilterButtonClick = () => {
    setShowFilters(true);
  };

  return (
    <div className="min-h-screen mb-20 bg-white">
      {/* Fixed PageHeader */}
      <div className="fixed top-0 left-0 right-0 z-10 bg-white">
        <PageHeader
          title="Activities"
          showBackButton={false}
          showBorder={false}
          rightIcon="none"
        />
      </div>

      {/* Content area with padding-top to account for fixed header */}
      <div style={{ paddingTop: headerHeight }}>
        {/* Tabs below the PageHeader */}
        <nav className="flex justify-around py-2" role="tablist">
          <button
            onClick={() => handleTabChange("private")}
            className={`flex flex-col items-center focus:outline-none text-base transition-colors ${
              activeTab === "private" ? "text-gray-900" : "text-gray-400"
            }`}
            role="tab"
            aria-selected={activeTab === "private"}
            aria-controls="private-panel"
            id="private-tab"
            aria-label="Private messages"
          >
            <Chat
              size={24}
              weight={activeTab === "private" ? "fill" : "regular"}
            />
            <span className="text-xs mt-1">Messages</span>
          </button>
          <button
            onClick={() => handleTabChange("general")}
            className={`flex flex-col items-center focus:outline-none text-base transition-colors ${
              activeTab === "general" ? "text-gray-900" : "text-gray-400"
            }`}
            role="tab"
            aria-selected={activeTab === "general"}
            aria-controls="general-panel"
            id="general-tab"
            aria-label="General notifications"
          >
            <Bell
              size={24}
              weight={activeTab === "general" ? "fill" : "regular"}
            />
            <span className="text-xs mt-1">Notifications</span>
          </button>
          <button
            onClick={() => handleTabChange("accounts")}
            className={`flex flex-col items-center focus:outline-none text-base transition-colors ${
              activeTab === "accounts" ? "text-gray-900" : "text-gray-400"
            }`}
            role="tab"
            aria-selected={activeTab === "accounts"}
            aria-controls="accounts-panel"
            id="accounts-tab"
            aria-label="Accounts"
          >
            <Users
              size={24}
              weight={activeTab === "accounts" ? "fill" : "regular"}
            />
            <span className="text-xs mt-1">Accounts</span>
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
            <h3 className="text-base font-medium text-gray-900 mb-3">
              Time Period
            </h3>
            <div className="space-y-3 text-sm">
              <div className="py-2 text-gray-900">All Time</div>
              <div className="py-2 text-gray-900">Today</div>
              <div className="py-2 text-gray-900">This Week</div>
              <div className="py-2 text-gray-900">This Month</div>
            </div>
          </div>

          {/* Divider between sections */}
          <div className="border-t border-gray-200"></div>

          {/* Read Status Filter */}
          <div>
            <h3 className="text-base font-medium text-gray-900 mb-3">
              Read Status
            </h3>
            <div className="space-y-3 text-sm">
              <div className="py-2 text-gray-900">All</div>
              <div className="py-2 text-gray-900">Read</div>
              <div className="py-2 text-gray-900">Unread</div>
            </div>
          </div>

          {/* Divider between sections */}
          <div className="border-t border-gray-200"></div>

          {/* Notification Type Filter */}
          <div>
            <h3 className="text-base font-medium text-gray-900 mb-3">Type</h3>
            <div className="space-y-3 text-sm">
              <div className="py-2 text-gray-900">All Types</div>
              <div className="py-2 text-gray-900">Follows</div>
              <div className="py-2 text-gray-900">Likes</div>
              <div className="py-2 text-gray-900">Comments</div>
              <div className="py-2 text-gray-900">Mentions</div>
              <div className="py-2 text-gray-900">System</div>
            </div>
          </div>
        </div>
      </BottomSheet>
    </div>
  );
};

export default NotificationsPage;
