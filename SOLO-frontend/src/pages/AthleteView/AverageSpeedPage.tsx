import React, { useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonButtons,
  IonBackButton,
  IonIcon,
} from "@ionic/react";
import { Line } from "react-chartjs-2";
import "chart.js/auto"; // Import this for Chart.js to work properly
import { arrowBackOutline } from "ionicons/icons";
import { useHistory } from 'react-router-dom';

const AverageSpeedPage: React.FC = () => {
  // Define the type for the range
  type Range = "W" | "M" | "6M" | "Y";

  const [selectedRange, setSelectedRange] = useState<Range>("W");

  type ChartData = {
    labels: string[];
    data: number[];
  };

  const data: Record<Range, { averageSpeed: string; dateRange: string; chartData: ChartData }> = {
    W: {
      averageSpeed: "9.34 m/s",
      dateRange: "Oct 21–27, 2024",
      chartData: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        data: [10, 9.6, 9.4, 10.6, 9.8, 9.5, 9.2],
      },
    },
    M: {
      averageSpeed: "9.10 m/s",
      dateRange: "Oct 1–Oct 31, 2024",
      chartData: {
        labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
        data: [9.2, 9.3, 9.4, 9.1],
      },
    },
    "6M": {
      averageSpeed: "8.85 m/s",
      dateRange: "May–Oct 2024",
      chartData: {
        labels: ["May", "Jun", "Jul", "Aug", "Sep", "Oct"],
        data: [9.0, 8.9, 8.7, 8.8, 9.1, 8.6],
      },
    },
    Y: {
      averageSpeed: "8.60 m/s",
      dateRange: "2024",
      chartData: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        data: [8.5, 8.6, 8.7, 8.6, 8.8, 8.7, 8.9, 8.6, 8.5, 8.4, 8.6, 8.7],
      },
    },
  };

  // Example chart data
  const chartData = {
    labels: data[selectedRange].chartData.labels,
    datasets: [
      {
        label: "Speed (m/s)",
        data: data[selectedRange].chartData.data,
        borderColor: "#3498db",
        backgroundColor: "rgba(52, 152, 219, 0.3)",
        fill: true,
        tension: 0.4, // Smooth curves
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Hide legend
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          color: "#e0e0e0",
        },
      },
    },
  };

  const history = useHistory();

  const goBack = () => {
    history.goBack(); // Navigate back to the previous page
  };

  return (
    <IonPage>
      <IonHeader>
        <div className="performance-header">
          <div className="back-button" onClick={goBack}>
              <IonIcon icon={arrowBackOutline} style={{ fontSize: '35px' }} />
          </div>
          <h1 className="header-title">Average Speed</h1>
        </div>
      </IonHeader>
      <IonContent>
      <div style={{ padding: "16px" }}>
          {/* Time Range Buttons */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "1rem",
            }}
          >
            {["W", "M", "6M", "Y"].map((range) => (
              <button
                key={range}
                onClick={() => setSelectedRange(range as Range)}
                style={{
                  padding: "8px 16px",
                  borderRadius: "4px",
                  backgroundColor: selectedRange === range ? "#4a90e2" : "#e0e0e0",
                  color: selectedRange === range ? "white" : "black",
                  fontWeight: "bold",
                  margin: "0 4px",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {range}
              </button>
            ))}
          </div>

          {/* Average Speed Info */}
          <div
            style={{
              textAlign: "left",
              marginBottom: "1rem",
              fontFamily: "Arial, sans-serif",
            }}
          >
            <h2 style={{ margin: "0", fontSize: "1rem", fontWeight: "bold" }}>
              AVERAGE
            </h2>
            <p
              style={{
                fontSize: "2rem",
                fontWeight: "bold",
                margin: "0",
                color: "#000000",
              }}
            >
              {data[selectedRange].averageSpeed}
            </p>
            <p style={{ fontSize: "1rem", margin: "0", color: "#000000", fontWeight: "bold" }}>
            {data[selectedRange].dateRange}
            </p>
          </div>

          {/* Chart */}
          <div
            className="average-speed-chart"
            style={{
              height: "250px",
              backgroundColor: "white",
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              padding: "16px",
            }}
          >
            <Line data={chartData} options={chartOptions} />
          </div>

          {/* Highlights and Challenges */}
          <div style={{ marginTop: "1rem" }}>
            <h3>Highlights</h3>
            <p>
              <strong>Thursday:</strong> Achieved the fastest average speed of
              10 m/s. This demonstrates significant improvement and peak performance for the week!
            </p>
            <h3>Challenges</h3>
            <p>
              <strong>Sunday:</strong> The slowest day with 8.93 m/s, likely
              caused by training fatigue.
            </p>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default AverageSpeedPage;
