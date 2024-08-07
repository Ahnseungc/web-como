"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Tooltip,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ChartData,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip
);

const data = [
  {
    id: 1,
    date: "2023-08-01",
    value: 59,
  },
  {
    id: 2,
    date: "2023-09-01",
    value: 72,
  },
  {
    id: 3,
    date: "2023-10-01",
    value: 79,
  },
  {
    id: 4,
    date: "2023-11-01",
    value: 64,
  },
  {
    id: 5,
    date: "2023-12-01",
    value: 73,
  },
  {
    id: 6,
    date: "2024-01-01",
    value: 81,
  },
  {
    id: 7,
    date: "2024-02-01",
    value: 75,
  },
  {
    id: 8,
    date: "2024-03-01",
    value: 64,
  },
  {
    id: 9,
    date: "2024-04-01",
    value: 78,
  },
  {
    id: 10,
    date: "2024-05-01",
    value: 61,
  },
  {
    id: 11,
    date: "2024-06-01",
    value: 74,
  },
  {
    id: 12,
    date: "2024-07-01",
    value: 80,
  },
];

export default function PurchaseStatsLineChart() {
  const chartData: ChartData<"line", number[], string> = {
    labels: data.map((e) => `${new Date(e.date).getMonth() + 1}월`),
    datasets: [
      {
        data: data.map((e) => e.value),
        borderWidth: 2,
        borderColor: "#FD7E2D",
        pointStyle: "circle",
        pointRadius: 3,
        pointHoverRadius: 8,
        pointHitRadius: 40,
        pointBorderWidth: 0,
        pointBackgroundColor: "#FD7E2D",
        pointHoverBorderWidth: 3,
        pointHoverBorderColor: "#FFFFFF",
        pointHoverBackgroundColor: "#FD7E2D",
      },
    ],
  };

  return (
    <div className="flex-1">
      <Line
        data={chartData}
        options={{
          responsive: true,
          backgroundColor: "#F6F6F6",
          interaction: { mode: "index", intersect: false, axis: "xy" },
          scales: {
            x: {
              ticks: {
                font: { size: 16 },
                color: "#6A6A6C",
              },
              grid: { color: "#F1F1F1" },
            },
            y: { min: 40, max: 90, grid: { color: "#DDDDDD" } },
          },
          plugins: {
            tooltip: {
              xAlign: "center",
              yAlign: "bottom",
              displayColors: false,
              caretSize: 0,
              caretPadding: 12,
              padding: 10,
              cornerRadius: 20,
              borderWidth: 1,
              borderColor: "#DDDDDD",
              backgroundColor: "#FFFFFF",
              bodyColor: "#1A1A1D",
              bodyFont: { size: 16 },
              titleColor: "#1A1A1D",
              titleFont: { size: 16 },
              callbacks: {
                label: (tooltipItem) => `${tooltipItem.formattedValue}건`,
              },
            },
          },
        }}
        className="cursor-pointer"
      />
    </div>
  );
}
