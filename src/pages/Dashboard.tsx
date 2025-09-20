import { useState } from "react";
import { Chart, registerables } from "chart.js";
import { Line, Doughnut } from "react-chartjs-2";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { useNavigate } from "react-router-dom";
import { CaretLeft } from "phosphor-react";

// Register Chart.js components
Chart.register(...registerables);

// Define interfaces for our data
interface RevenueSource {
  name: string;
  amount: number;
  goal: number;
  color: string;
}

const Dashboard: React.FC = () => {
  const [dateRange, setDateRange] = useState<string>("This Month");
  const navigate = useNavigate();

  // Charts data
  const earningsData = {
    labels: ["Sep 1", "Sep 5", "Sep 10", "Sep 15"],
    datasets: [
      {
        label: "Earnings ($)",
        data: [150, 300, 800, 1250],
        borderColor: "#6366f1",
        backgroundColor: "rgba(99, 102, 241, 0.1)",
        fill: true,
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 4,
        pointBackgroundColor: "#6366f1",
      },
    ],
  };

  const earningsOptions = {
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  // Updated labels with consistent spacing
  const revenueSourcesData = {
    labels: [
      "Tips & Gifts    ",
      "Ad Revenue",
      "Subscriptions    ",
      "Brand Deals",
    ],
    datasets: [
      {
        data: [450, 300, 200, 300],
        backgroundColor: ["#6366f1", "#10b981", "#ec4899", "#f59e0b"],
        borderWidth: 0,
      },
    ],
  };

  const revenueSourcesOptions = {
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          padding: 20, // Add padding between legend items
          boxWidth: 12, // Make color boxes consistent size
          font: {
            size: 12, // Consistent font size
          },
        },
      },
    },
    cutout: "70%",
    responsive: true,
    maintainAspectRatio: false,
  };

  // Revenue breakdown data
  const revenueBreakdown: RevenueSource[] = [
    { name: "Tips & Gifts", amount: 450, goal: 600, color: "bg-indigo-500" },
    { name: "Ad Revenue", amount: 300, goal: 500, color: "bg-green-500" },
    { name: "Subscriptions", amount: 200, goal: 400, color: "bg-pink-500" },
    { name: "Brand Deals", amount: 300, goal: 700, color: "bg-yellow-500" },
  ];

  // Handle date picker change
  const handleDateChange = (_: unknown, dateStr: string) => {
    if (dateStr) {
      setDateRange(dateStr);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="bg-white min-h-screen font-sans mb-8">
      {/* Header - Copied from Comment page */}
      <div className="sticky top-0 z-10 bg-white">
        <div className="flex items-center h-12 px-3">
          <button
            onClick={handleBack}
            className="mr-6 text-gray-900"
            aria-label="Back"
          >
            <CaretLeft size={24} weight="bold" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">
            Rewards Overview
          </h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-3 space-y-6">
        <div>
          <Flatpickr
            render={({ defaultValue, value, ...props }, ref) => (
              <button
                ref={ref}
                className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-gray-900 text-white text-xs font-medium"
                {...props}
              >
                <span>{dateRange}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            )}
            options={{
              mode: "range",
              dateFormat: "M d, Y",
            }}
            onChange={handleDateChange}
          />
        </div>

        {/* Top Earnings Card */}
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div>
            <p className="text-sm text-gray-500">Total Earnings</p>
            <h2 className="text-2xl font-bold mt-1">$1,250.75</h2>
            <p className="text-green-600 text-sm mt-1">+12% vs last month</p>
          </div>
        </div>

        {/* Milestone Card - Changed to white background with border */}
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <h3 className="text-base font-semibold">Milestone</h3>
          <p className="mt-2 text-sm text-gray-600">
            You're 80% towards unlocking early payout 🎉
          </p>
          <div className="w-full bg-gray-100 rounded-full h-2 mt-3">
            <div
              className="bg-blue-500 h-2 rounded-full"
              style={{ width: "80%" }}
            ></div>
          </div>
          <p className="text-xs mt-2 text-gray-500">
            Current: $1,600 / Goal: $2,000
          </p>
        </div>

        {/* Charts Section */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Earnings Trend */}
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="text-base font-semibold mb-4">Earnings Trend</h3>
            <div className="h-56">
              <Line data={earningsData} options={earningsOptions} />
            </div>
          </div>

          {/* Revenue Share Donut */}
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="text-base font-semibold mb-4">Revenue Sources</h3>
            <div className="h-56">
              <Doughnut
                data={revenueSourcesData}
                options={revenueSourcesOptions}
              />
            </div>
          </div>
        </div>

        {/* Revenue Breakdown */}
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <h3 className="text-base font-semibold mb-4">Revenue Breakdown</h3>

          {revenueBreakdown.map((item, index) => (
            <div
              className={index < revenueBreakdown.length - 1 ? "mb-4" : ""}
              key={item.name}
            >
              <div className="flex justify-between mb-1 text-sm">
                <span>{item.name}</span>
                <span>
                  ${item.amount} / ${item.goal} goal
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`${item.color} h-2 rounded-full`}
                  style={{ width: `${(item.amount / item.goal) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
