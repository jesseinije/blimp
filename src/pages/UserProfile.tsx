import { useParams } from "react-router-dom";
import { useEffect } from "react";
import ProfilePage from "./ProfilePage";

const UserProfile = () => {
  const { username } = useParams<{ username: string }>();

  useEffect(() => {}, [username]);

  // Pass showBackButton={true} and hideSettings={true} to ProfilePage when viewing someone else's profile
  return (
    <ProfilePage
      showBackButton={true}
      username={username}
      hideSettings={true}
    />
  );
};

export default UserProfile;
