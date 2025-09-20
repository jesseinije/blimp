import React from "react";
import BottomSheet from "./BottomSheet";
import { userData } from "../../data/userData";
import { CheckCircle } from "phosphor-react";

interface AccountSwitchSheetProps {
  isOpen: boolean;
  onClose: () => void;
  currentUserId: string;
  onSwitch: (userId: string) => void;
  onAddAccount: () => void;
}

const AccountSwitchSheet: React.FC<AccountSwitchSheetProps> = ({
  isOpen,
  onClose,
  currentUserId,
  onSwitch,
  onAddAccount,
}) => {
  const currentUser = userData.find((user) => user.id === currentUserId);

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      title="Switch account"
      height="auto"
      showHandle
    >
      <div className="flex flex-col gap-2 pb-4">
        {currentUser && (
          <button
            className="flex items-center py-3 rounded-lg w-full text-left font-semibold"
            onClick={() => onSwitch(currentUserId)}
            disabled
          >
            <img
              src={currentUser.avatar}
              alt={currentUser.displayName}
              className="w-10 h-10 rounded-full object-cover mr-3"
            />
            <span className="flex-1">{currentUser.username}</span>
            <CheckCircle size={22} weight="fill" className="text-blue-500" />
          </button>
        )}
        <button
          className="flex items-center py-3 rounded-lg w-full text-left"
          onClick={onAddAccount}
        >
          <span className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-3 text-2xl text-gray-400">
            +
          </span>
          <span className="flex-1 text-gray-400">Add account</span>
        </button>
      </div>
    </BottomSheet>
  );
};

export default AccountSwitchSheet;
