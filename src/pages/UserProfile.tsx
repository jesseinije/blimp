import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import ProfilePage from "./ProfilePage";
import { CaretLeft } from "phosphor-react";

const UserProfile = () => {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();

  useEffect(() => {}, [username]);

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col h-screen bg-white relative">
      {/* Header copied from Comment page */}
      <div className="sticky top-0 z-10 bg-white">
        <div className="flex items-center h-12 px-3">
          <button
            onClick={handleBack}
            className="mr-6 text-gray-900"
            aria-label="Back"
          >
            <CaretLeft size={24} weight="bold" />
          </button>
        </div>
      </div>

      {/* Profile Content */}
      <ProfilePage
        username={username}
        hideSettings={true}
        showHeader={false}
        showActions={true}
      />
    </div>
  );
};

export default UserProfile;
