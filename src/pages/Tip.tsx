import { useParams, useNavigate } from "react-router-dom";
import { getUserByUsername } from "../data/mockData";
import { useState } from "react";
import PageHeader from "../components/layout/PageHeader";

const presetAmounts = [1, 5, 10];

export default function Tip() {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();
  const user = getUserByUsername(username || "");

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-white">
        <p>User not found.</p>
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    );
  }

  const [amount, setAmount] = useState<number>(presetAmounts[0]);
  const [customAmount, setCustomAmount] = useState<string>("");

  const handlePresetClick = (val: number) => {
    setAmount(val);
    setCustomAmount("");
  };

  const handleCustomAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value);
    setAmount(Number(e.target.value) || 0);
  };

  const handleSendTip = () => {
    alert(`Sent $${amount} to @${user.username} `);
    navigate(-1);
  };

  return (
    <>
      <PageHeader
        title={`Support @${user.username}`}
        showBackButton={true}
        rightIcon="none"
        onBackClick={() => navigate(-1)}
        className="bg-white"
        showBorder={false}
        enableScroll={true}
      />
      <div className="min-h-screen bg-white flex flex-col items-center relative mt-28">
        {/* Header */}
        <div className="w-full mx-auto flex flex-col items-center pt-4">
          <div className="w-28 h-28 rounded-full overflow-hidden mb-4">
            <img
              src={user.avatar}
              alt={user.displayName}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col items-center mb-2">
            <div className="text-xl font-bold text-gray-900">
              {user.displayName}
            </div>
            <div className="text-gray-400 text-base">@{user.username}</div>
          </div>
          <div className="mt-2 text-sm font-medium text-gray-700 mb-10">
            How much do you want to send me?
          </div>
        </div>

        {/* Amount selection - constrained width */}
        <div className="w-full px-6 max-w-[320px] mx-auto flex flex-col items-center mb-10">
          <div className="flex justify-center gap-3 mb-6 w-full">
            {presetAmounts.map((val) => (
              <button
                key={val}
                className={`flex-1 py-2 rounded-lg font-semibold transition ${
                  amount === val && !customAmount
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
                onClick={() => handlePresetClick(val)}
              >
                ${val}
              </button>
            ))}
          </div>

          {/* Input with only border-bottom */}
          <div className="w-full">
            <input
              type="number"
              min={1}
              placeholder="Custom amount"
              className="w-full py-2 border-b border-gray-300 text-center focus:outline-none focus:border-blue-500 text-lg"
              value={customAmount}
              onChange={handleCustomAmount}
            />
          </div>
        </div>

        {/* Explanatory note */}
        <div className="w-full px-3  mb-24">
          <div className="bg-gray-50 border border-gray-100 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                className="mr-2 text-blue-500"
                fill="currentColor"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
              </svg>
              About Tipping
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Tips are direct monetary contributions to creators you appreciate.
              Think of tip as a gift. 100% of your tip goes directly to{" "}
              <span className="font-medium text-gray-600">
                @{user.username}
              </span>
              . Tips help support their work and encourage them to create more
              content you enjoy. Tips are non-refundable and processed securely
              through our payment system.
            </p>
          </div>
        </div>

        {/* Fixed Send Tip button */}
        <div className="fixed bottom-0 left-0 right-0 w-full bg-white border-t border-gray-100 z-10 flex justify-center py-4 px-3">
          <div className="w-1/2 max-w-xs mx-auto">
            <button
              className="w-full bg-blue-500 text-white py-2.5 rounded-lg font-semibold text-lg"
              onClick={handleSendTip}
              disabled={amount < 1}
            >
              Send Tip
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
