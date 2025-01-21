"use client"
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Header from "../components/Header";

// Registering ChartJS components for using the Line chart
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const AnalyticsDashboard = () => {
  // Static data for KPIs
  const sales = 1500;
  const userTraffic = 8000;
  const popularProducts = [
    { product: "Product A", sales: 350 },
    { product: "Product B", sales: 280 },
    { product: "Product C", sales: 170 },
  ];

  const salesData = [20, 40, 60, 80, 100, 120, 140]; // Example sales over time

  // Static data for chart
  const chartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], // Weekdays for X-axis
    datasets: [
      {
        label: "Sales Over Time",
        data: salesData, // Sales data points
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
    ],
  };

  return (
    <>
    <Header/>
    <div className="min-h-scree text-white p-6">
      <h1 className="text-4xl font-bold mb-6 text-center">Analytics Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Sales KPI */}
        <div className="bg-gray-700 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold">Total Sales</h2>
          <p className="text-xl mt-4">{sales}</p>
        </div>
        {/* User Traffic KPI */}
        <div className="bg-gray-700 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold">User Traffic</h2>
          <p className="text-xl mt-4">{userTraffic} Visitors</p>
        </div>
        {/* Popular Products KPI */}
        <div className="bg-gray-700 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold">Popular Products</h2>
          <ul className="mt-4">
            {popularProducts.map((product, index) => (
              <li key={index} className="text-lg">{product.product}: {product.sales} sales</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Sales Line Chart */}
      <div className="mt-8 bg-gray-700 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Sales Over Time</h2>
        <Line data={chartData} />
      </div>
    </div>
    </>
  );
};

export default AnalyticsDashboard;
