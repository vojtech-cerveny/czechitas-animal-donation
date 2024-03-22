"use client";
import React from "react";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
} from "chart.js";
import { Chart } from "react-chartjs-2";

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController
);

import dayjs from "dayjs";

export function Charts(transactionsData: {
  data: { createdAt: string; amount: number }[];
}) {
  // Assuming transactions is your data
  console.log(transactionsData);
  const transactions = transactionsData.data;

  // Get dates for the last 7 days
  const dates = Array.from({ length: 7 }, (_, i) =>
    dayjs().subtract(i, "day").format("YYYY-MM-DD")
  ).reverse();
  console.log(dates);
  console.log(transactions);
  // Filter transactions from the last 7 days
  const last7DaysTransactions = transactions.filter((transaction) =>
    dates.includes(dayjs(transaction.createdAt).format("YYYY-MM-DD"))
  );

  // Group transactions by date
  const groupedByDate = last7DaysTransactions.reduce(
    (acc: any, transaction) => {
      const date = dayjs(transaction.createdAt).format("YYYY-MM-DD");
      acc[date] = acc[date] || { amount: 0, count: 0 };
      acc[date].amount += transaction.amount;
      acc[date].count++;
      return acc;
    },
    {}
  );

  // Prepare data for Chart.js
  const labels = dates;
  const datasets = [
    {
      label: "Amount of transactions",
      data: dates.map((date) => groupedByDate[date]?.amount || 0),
    },
    {
      label: "Count of transactions",
      data: dates.map((date) => groupedByDate[date]?.count || 0),
    },
  ];

  const data = {
    labels,
    datasets: [
      {
        type: "bar" as const,
        label: "Amount",
        backgroundColor: "rgb(59, 130, 246)",
        borderColor: "rgb(118, 166, 245)",
        borderWidth: 2,
        fill: false,
        data: datasets[0].data,
      },
      {
        type: "bar" as const,
        label: "Count",
        backgroundColor: "rgb(75, 192, 192)",
        data: datasets[1].data,
        // borderColor: "white",
        borderWidth: 2,
      },
    ],
  };

  return <Chart type="bar" data={data} />;
}
