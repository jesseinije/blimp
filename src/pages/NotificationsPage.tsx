import { useElementHeight } from "../hooks/useElementHeight";
import PageHeader from "../components/layout/PageHeader";
import EmptyState from "../components/ui/EmptyState";

const NotificationsPage = () => {
  const headerHeight = useElementHeight(".page-header");

  return (
    <div className="h-screen bg-white overflow-hidden">
      {/* Fixed PageHeader */}
      <div className="fixed top-0 left-0 right-0 z-10 bg-white">
        <PageHeader
          title="Notifications"
          showBackButton={true}
          showBorder={false}
          rightIcon="none"
        />
      </div>

      {/* Content area with padding-top to account for fixed header */}
      <div
        style={{
          paddingTop: headerHeight,
          height: `calc(100vh - ${headerHeight}px)`,
        }}
        className="flex items-center justify-center"
      >
        <EmptyState
          title="No notifications yet"
          description="When you have new activity notifications, they'll appear here"
        />
      </div>
    </div>
  );
};

export default NotificationsPage;
