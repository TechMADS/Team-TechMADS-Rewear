"use client";

import { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar, Doughnut } from "react-chartjs-2";

import { FiSettings, FiPlus } from "react-icons/fi";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

export default function RewearDashboard() {
  const [active, setActive] = useState("orders");

  const summaryCards = [
    { label: "Orders Placed", value: 124, key: "orders" },
    { label: "Listed Products", value: 38, key: "products" },
    { label: "Earnings", value: "$2,458", key: "earnings" },
    { label: "Orders Completed", value: 87, key: "completed" },
  ];

  const barData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Orders",
        data: [12, 19, 10, 15, 22, 30],
        backgroundColor: "#64b5f6",
      },
    ],
  };

  const doughnutData = {
    labels: ["Men", "Women", "Kids", "Accessories"],
    datasets: [
      {
        data: [30, 40, 15, 15],
        backgroundColor: ["#42a5f5", "#66bb6a", "#ffca28", "#ab47bc"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f2f7ff] to-[#e4f0ff] p-6 flex flex-col gap-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {summaryCards.map((card) => (
          <div
            key={card.key}
            onClick={() => setActive(card.key)}
            className={`p-6 rounded-2xl shadow-lg cursor-pointer transition-transform transform hover:scale-105 
              ${
                active === card.key
                  ? "bg-gradient-to-br from-blue-500 to-blue-400 text-white"
                  : "bg-white text-gray-800"
              }`}
          >
            <h3 className="text-lg font-semibold mb-2">{card.label}</h3>
            <p className="text-2xl font-bold">{card.value}</p>
          </div>
        ))}

        {/* Create New Listing Card */}
        <div
          onClick={() => alert("Create new listing")}
          className="p-6 flex items-center justify-center rounded-2xl border-2 border-dashed border-blue-300 text-blue-500 hover:bg-blue-50 cursor-pointer"
        >
          <FiPlus className="text-3xl" />
        </div>
      </div>

      {/* Analytics Section */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="col-span-2 bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-lg font-semibold mb-4">Order Analytics</h2>
          <Bar data={barData} />
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-lg font-semibold mb-4">
            Product Category Distribution
          </h2>
          <Doughnut data={doughnutData} />
        </div>
      </div>

      {/* Floating Settings */}
      <button className="fixed bottom-6 left-6 bg-white shadow-xl p-4 rounded-full hover:bg-blue-100 transition-all">
        <FiSettings className="text-2xl text-gray-700" />
      </button>
    </div>
  );
}
