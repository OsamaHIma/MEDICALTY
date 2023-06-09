"use client";

import { Bar, Doughnut, Line, Pie, PolarArea, Radar } from "react-chartjs-2";
import { Chart } from "chart.js";
import {
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  DoughnutController,
  BarController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  Legend,
  Tooltip,
} from "chart.js";

Chart.register(
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  DoughnutController,
  BarController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  Legend,
  Tooltip
);

// Chart data and options...

// Bar Chart Data
const barChartData = {
  labels: ["Leaved", "New", "Waiting", "In Process", "Authenticated", "Unauthenticated"],
  datasets: [
    {
      label: "Needs attintion",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

// Bar Chart Options
const barChartOptions = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

// Doughnut Chart Data
const doughnutChartData = {
  labels: ["Leaved", "New", "Waiting", "In Process", "Authenticated", "Unauthenticated"],

  datasets: [
    {
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.5)",
        "rgba(54, 162, 235, 0.5)",
        "rgba(255, 206, 86, 0.5)",
        "rgba(75, 192, 192, 0.5)",
        "rgba(153, 102, 255, 0.5)",
        "rgba(255, 159, 64, 0.5)",
      ],
    },
  ],
};

// Doughnut Chart Options
const doughnutChartOptions = {
  cutout: "80%",
};

// Line Chart Data
const lineChartData = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "Sales",
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: false,
      borderColor: "rgb(75, 192, 192)",
      tension: 0.1,
    },
  ],
};

// Line Chart Options
const lineChartOptions = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
    tooltip: {
      mode: "index",
      intersect: false,
    },
  },
  interaction: {
    mode: "nearest",
    axis: "x",
    intersect: false,
  },
  scales: {
    x: {
      display: true,
      title: {
        display: true,
        text: "Month",
      },
    },
    y: {
      display: true,
      title: {
        display: true,
        text: "Value",
      },
      beginAtZero: true,
    },
  },
};

// Pie Chart Data
const pieChartData = {
  labels: ["Leaved", "New", "Waiting", "In Process", "Authenticated", "Unauthenticated"],

  datasets: [
    {
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.5)",
        "rgba(54, 162, 235, 0.5)",
        "rgba(255, 206, 86, 0.5)",
        "rgba(75, 192, 192, 0.5)",
        "rgba(153, 102, 255, 0.5)",
        "rgba(255, 159, 64, 0.5)",
      ],
    },
  ],
};

// Pie Chart Options
const pieChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Sample Pie Chart",
    },
  },
};

// Polar Area Chart Data
const polarAreaChartData = {
  labels: ["Leaved", "New", "Waiting", "In Process", "Authenticated", "Unauthenticated"],
  
  datasets: [
    {
      label: "My Dataset",
      data: [11, 16, 7, 3, 14, 6],
      backgroundColor: [
        "rgba(255, 99, 132, 0.5)",
        "rgba(54, 162, 235, 0.5)",
        "rgba(255, 206, 86, 0.5)",
        "rgba(75, 192, 192, 0.5)",
        "rgba(153, 102, 255, 0.5)",
        "rgba(255, 159, 64, 0.5)",
      ],
    },
  ],
};

// Polar Area Chart Options
const polarAreaChartOptions = {
  scales: {
    r: {
      beginAtZero: true,
    },
  },
};

// Radar Chart Data
const radarChartData = {
  labels: [
    "Connaction",
    "Drinking",
    "Sleeping",
    "Designing",
    "Coding",
    "Cycling",
    "Running",
  ],
  datasets: [
    {
      label: "Admin",
      data: [65, 59, 90, 81, 56, 55, 40],
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      borderColor: "rgba(255, 99, 132, 1)",
      borderWidth: 1,
      pointStyle: "circle",
      pointBackgroundColor: "rgba(255, 99, 132, 1)",
    },
    {
      label: "User",
      data: [28, 48, 40, 19, 96, 27, 100],
      backgroundColor: "rgba(54, 162, 235, 0.2)",
      borderColor: "rgba(54, 162, 235, 1)",
      borderWidth: 1,
      pointStyle: "circle",
      pointBackgroundColor: "rgba(54, 162, 235, 1)",
    },
  ],
};

// Radar Chart Options
const radarChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Sample Radar Chart",
    },
  },
  scales: {
    r: {
      ticks: {
        beginAtZero: true,
      },
    },
  },
};

const Dashboard = () => {
  return (
    <section className={`bg-green-200 dark:bg-slate-900`}>
      <header
        className={`bg-green-500/10 p-4 text-gray-700 font-semibold dark:text-slate-50`}
      >
        <div className="flex justify-between items-center">
          <h1 className="text-xl">Welcome To Your Dashboard!</h1>
        </div>
      </header>

      <main className={`p-4`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 min-h-screen">
          {/* Bar Chart */}
          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg shadow-md p-4">
            <h2 className={`text-green-500 font-semibold mb-4`}>Bar Chart</h2>
            <Bar data={barChartData} options={barChartOptions} />
          </div>
          {/* Doughnut Chart */}
          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg shadow-md p-4">
            <h2 className={`text-green-500 font-semibold mb-4`}>
              Doughnut Chart
            </h2>
            <Doughnut data={doughnutChartData} options={doughnutChartOptions} />
          </div>
          {/* Line Chart */}
          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg shadow-md p-4">
            <h2 className={`text-green-500 font-semibold mb-4`}>Line Chart</h2>
            <Line data={lineChartData} options={lineChartOptions} />
          </div>
          {/* Pie Chart */}
          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg shadow-md p-4">
            <h2 className={`text-green-500 font-semibold mb-4`}>Pie Chart</h2>
            <Pie data={pieChartData} options={pieChartOptions} />
          </div>
          {/* Polar Area Chart */}
          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg shadow-md p-4">
            <h2 className={`text-green-500 font-semibold mb-4`}>
              Polar Area Chart
            </h2>
            <PolarArea
              data={polarAreaChartData}
              options={polarAreaChartOptions}
            />
          </div>
          {/* Radar Chart */}
          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg shadow-md p-4">
            <h2 className={`text-green-500 font-semibold mb-4`}>Radar Chart</h2>
            <Radar data={radarChartData} options={radarChartOptions} />
          </div>
        </div>
      </main>
    </section>
  );
};

export default Dashboard;
