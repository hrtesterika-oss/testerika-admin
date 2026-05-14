import React from "react";
import Chart from "react-apexcharts"

const Donut = ({completed}) => {
  const series = [completed,100-completed];

  const options = {
    labels: ["correct","incorrect"],
    dataLabels: {
      enabled: true,
    },

    colors:["#50C793", "#F1595C"],
    legend: {
      position: "bottom",
      fontSize: "16px",
      fontFamily: "Inter",
      fontWeight: 400,
      labels: {
        colors:"#475569",
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: "65%",
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: "26px",
              fontWeight: "bold",
              fontFamily: "Inter",
              color:"#475569",
            },
            value: {
              show: true,
              fontFamily: "Inter",
              color: "#475569",
              // formatter(val) {
              //   return `${parseInt(completed)}%`;
              // },
            },
            total: {
              show: true,
              fontSize: "1.5rem",
              color: "#475569",
              label: "Total",
              // formatter() {
              //   return `${completed}%`;
              // },
            },
          },
        },
      },
    },

    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  return (
    <div>
      <Chart options={options} series={series} type="donut" height="450" />
    </div>
  );
};

export default Donut;
