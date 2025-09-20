import { useNavigate } from "react-router-dom";
import {
  BookmarkSimple,
  ChartLine,
  Bell,
  Timer,
  ShieldCheck,
  Lock,
  Key,
  SignOut,
  CaretLeft,
  Archive,
  Activity,
  CurrencyCircleDollar,
  MegaphoneSimple,
  UserCircleGear,
} from "phosphor-react";
import { Verification } from "../Icons";

type SettingsItem = {
  icon: React.ReactNode;
  label: string;
  to?: string;
  subtitle?: string;
};

const settingsSections: {
  title: string;
  items: SettingsItem[];
}[] = [
  {
    title: "Account",
    items: [
      {
        icon: <UserCircleGear size={24} />,
        label: "Account",
        subtitle: undefined,
      },
      { icon: <Lock size={24} />, label: "Privacy", subtitle: undefined },
      {
        icon: <ShieldCheck size={24} />,
        label: "Security",
        subtitle: undefined,
      },
      { icon: <Key size={24} />, label: "Permission", subtitle: undefined },
    ],
  },
  {
    title: "Creator Tools",
    items: [
      { icon: <ChartLine size={24} />, label: "Analytics", to: "/insights" },
      {
        icon: <CurrencyCircleDollar size={24} />,
        label: "Rewards/Earnings",
        to: "/dashboard",
      },
      {
        icon: <Verification size={24} />,
        label: "Verification",
        to: "/scheduled-content",
        subtitle: "Not verified",
      },
      {
        icon: <MegaphoneSimple size={24} />,
        label: "Promotions/Ads",
        to: "/creator-tools",
      },
    ],
  },
  {
    title: "How you use Blimp",
    items: [
      { icon: <BookmarkSimple size={24} />, label: "Saved", to: "/saved" },
      {
        icon: <Archive size={24} />,
        label: "Archive",
        to: "/archive",
      },
      {
        icon: <Activity size={24} />,
        label: "Your activity",
        to: "/activity",
      },
      {
        icon: <Bell size={24} />,
        label: "Notifications",
        to: "/notifications",
      },
      {
        icon: <Timer size={24} />,
        label: "Time management",
        to: "/time-management",
      },
    ],
  },
  {
    title: "Login/Logout",
    items: [
      { icon: <SignOut size={24} />, label: "Log out", subtitle: undefined },
    ],
  },
];

const Settings = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col h-screen bg-white relative">
      {/* Header - copied from Comment page */}
      <div className="sticky top-0 z-10 bg-white">
        <div className="flex items-center h-12 px-3">
          <button
            onClick={handleBack}
            className="mr-6 text-gray-900"
            aria-label="Back"
          >
            <CaretLeft size={24} weight="bold" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">Settings</h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto pb-8">
        <div className="max-w-lg mx-auto mt-4">
          {settingsSections.map((section) => (
            <div key={section.title} className="mb-8">
              <h2 className="text-gray-400 text-sm font-semibold mb-2 px-4">
                {section.title}
              </h2>
              <div className="bg-white">
                {section.items.map((item) => (
                  <button
                    key={item.label}
                    className="w-full flex items-center justify-between px-4 py-4"
                    onClick={() =>
                      item.label === "Rewards/Earnings" && item.to
                        ? navigate(item.to)
                        : undefined
                    }
                    aria-label={item.label}
                  >
                    <div className="flex items-center gap-4">
                      {item.icon}
                      <span className="text-gray-900 font-medium">
                        {item.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {item.subtitle && (
                        <span className="text-gray-400 text-sm">
                          {item.subtitle}
                        </span>
                      )}
                      <svg
                        width="20"
                        height="20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-gray-300"
                      >
                        <path d="M7 5l5 5-5 5" />
                      </svg>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Settings;
