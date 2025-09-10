import { useNavigate } from "react-router-dom";
import PageHeader from "../components/layout/PageHeader";
import SuggestedAccountsWithoutSeeAll from "../components/notifications/SuggestedAccountsWithoutSeeAll";
import { useElementHeight } from "../hooks/useElementHeight";

const SuggestedAccountPage = () => {
  const navigate = useNavigate();
  const headerHeight = useElementHeight(".page-header");

  const handleBackClick = () => {
    navigate("/messages");
  };

  const handleSearchClick = () => {
    navigate("/search");
  };

  return (
    <div className="min-h-screen mb-20 bg-white">
      <div className="fixed top-0 left-0 right-0 z-10 bg-white">
        <PageHeader
          title="Accounts"
          showBackButton={true}
          onBackClick={handleBackClick}
          showBorder={false}
          rightIcon="search"
          onRightIconClick={handleSearchClick}
        />
      </div>

      <div style={{ paddingTop: headerHeight > 0 ? headerHeight : "56px" }}>
        {/* Main content - Suggested Accounts without See All button */}
        <div className="mt-4">
          <SuggestedAccountsWithoutSeeAll showDismiss={true} />
        </div>
      </div>
    </div>
  );
};

export default SuggestedAccountPage;
