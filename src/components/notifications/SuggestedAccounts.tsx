import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { CheckCircle, X } from "phosphor-react";
import type { SuggestedAccount } from "../../types/notificationTypes";
import { mockUsers } from "../../data/mockData";

interface SuggestedAccountsProps {
  accounts: SuggestedAccount[];
  showDismiss?: boolean;
  showHeader?: boolean; // Add this prop
}

const SuggestedAccounts = ({
  showDismiss = true,
  showHeader = true, // Default to true to maintain existing behavior
}: SuggestedAccountsProps) => {
  const [accounts, setAccounts] = useState<SuggestedAccount[]>([]);

  // Use mockData to populate the suggested accounts
  useEffect(() => {
    // Map the mockUsers to SuggestedAccount format
    const mockSuggestedAccounts = mockUsers.slice(0, 5).map((user) => ({
      id: user.id,
      username: user.username,
      avatar: user.avatar,
      followers: Math.floor(Math.random() * 10000) + 1000, // Use a random number for followers
      isVerified: user.isVerified,
    }));

    setAccounts(mockSuggestedAccounts);
  }, []);

  const handleDismiss = (id: string) => {
    setAccounts(accounts.filter((account) => account.id !== id));
  };

  const handleSeeAllClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // Do nothing
  };

  if (accounts.length === 0) return null;

  return (
    <div className="mb-4">
      {showHeader && (
        <div className="flex items-center justify-between px-3 py-3">
          <h2 className="text-sm font-semibold text-gray-900 ">
            Accounts to follow
          </h2>
          <a
            href="#"
            className="text-blue-500 text-sm font-medium"
            onClick={handleSeeAllClick}
          >
            See all
          </a>
        </div>
      )}

      <div className="px-3">
        {accounts.map((account) => (
          <motion.div
            key={account.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center gap-3 py-3"
          >
            <div className="h-12 w-12 rounded-full overflow-hidden flex-shrink-0">
              <img
                src={account.avatar}
                alt={account.username}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>

            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900  text-sm truncate flex items-center">
                {account.username}
                {account.isVerified && (
                  <span className="ml-1">
                    <CheckCircle
                      size={18}
                      weight="fill"
                      className="text-blue-500"
                    />
                  </span>
                )}
              </p>
              <p className="text-sm text-gray-400 truncate">
                {formatCount(account.followers)} followers
              </p>
            </div>

            <div className="flex items-center flex-shrink-0 gap-2">
              <button
                className="px-5 py-1.5 bg-blue-500 text-white rounded-md text-sm font-medium"
                aria-label={`Follow ${account.username}`}
              >
                Follow
              </button>
              {showDismiss && (
                <button
                  className="p-1.5 text-gray-400"
                  onClick={() => handleDismiss(account.id)}
                  aria-label={`Dismiss ${account.username}`}
                >
                  <X size={20} />
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

function formatCount(count: number): string {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1).replace(/\.0$/, "")}M`;
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1).replace(/\.0$/, "")}K`;
  }
  return count.toString();
}

export default SuggestedAccounts;
