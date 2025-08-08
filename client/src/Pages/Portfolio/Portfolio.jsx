import React, { useState } from "react";
import { useGetPortfolioDataQuery } from "../../redux/Slice/portfolioSlice";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const PortFolio = ({ visible, onClose }) => {
  const [tenure, setTenure] = useState("Daily");
  const dummyData = {
    Daily: [
      { date: "2025-08-01", value: 52000 },
      { date: "2025-08-02", value: 53500 },
      { date: "2025-08-03", value: 51000 },
      { date: "2025-08-04", value: 55000 },
      { date: "2025-08-05", value: 56500 },
    ],
    Weekly: [
      { date: "Week 1", value: 265000 },
      { date: "Week 2", value: 278000 },
      { date: "Week 3", value: 271000 },
      { date: "Week 4", value: 285000 },
    ],
    Monthly: [
      { date: "Jan", value: 1050000 },
      { date: "Feb", value: 1120000 },
      { date: "Mar", value: 1090000 },
      { date: "Apr", value: 1150000 },
    ],
    Quarterly: [
      { date: "Q1", value: 3100000 },
      { date: "Q2", value: 3350000 },
      { date: "Q3", value: 3200000 },
    ],
    Yearly: [
      { date: "2022", value: 9500000 },
      { date: "2023", value: 10300000 },
      { date: "2024", value: 11200000 },
    ],
  };

  const isLoading = false;
  const error = false;
  const data = { data: dummyData[tenure] };

  const chartData =
    data?.data?.map((item) => ({
      date: item.date,
      value: item.value,
    })) || [];

  if (!visible) return null;

  const tenureColors = {
    Daily: "#3b82f6", // Blue
    Weekly: "#10b981", // Green
    Monthly: "#f59e0b", // Amber
    Quarterly: "#8b5cf6", // Purple
    Yearly: "#ef4444", // Red
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-3xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl font-bold"
        >
          &times;
        </button>

        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Portfolio Chart
        </h2>

        <div className="mb-4 flex gap-2 flex-wrap">
  {["Daily", "Weekly", "Monthly", "Quarterly", "Yearly"].map((t) => (
    <button
      key={t}
      onClick={() => setTenure(t)}
      className={`px-3 py-1 rounded text-white text-sm transition-colors duration-200 ${
        t === tenure
          ? "" // Active style handled in `style` prop below
          : "bg-gray-400 hover:bg-gray-400 text-black"
      }`}
      style={{
        backgroundColor: t === tenure ? tenureColors[t] : "",
        color: t === tenure ? "#fff" : "",
      }}
    >
      {t}
    </button>
  ))}
</div>

        {isLoading && <p>Loading chart...</p>}
        {error && <p className="text-red-500">Failed to load data.</p>}

        {!isLoading && !error && chartData.length > 0 && (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip
                content={({ active, payload, label }) =>
                  active && payload?.length ? (
                    <div className="bg-white border p-2 rounded shadow">
                      <p>
                        <strong>Date:</strong> {label}
                      </p>
                      <p>
                        <strong>Value:</strong> {payload[0].value}
                      </p>
                    </div>
                  ) : null
                }
              />
              <Bar dataKey="value" fill={tenureColors[tenure]} />
            </BarChart>
          </ResponsiveContainer>
        )}

        {!isLoading && !error && chartData.length === 0 && (
          <p>No chart data available.</p>
        )}
      </div>
    </div>
  );
};

export default PortFolio;
