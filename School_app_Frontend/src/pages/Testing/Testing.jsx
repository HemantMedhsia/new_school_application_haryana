import React, { useState, useEffect } from "react";
import TrafficChart from "../../common/Charts/TrafficChart";
import BarChart from "../../common/Charts/BarChart";
import DataTable from "../../common/Datatables/Datatable";
import PyramidLoader from "../../common/Loader/PyramidLoader";
import RadialBarChart from "../../common/Charts/RadialBarChart";
import SmalldataBlock from "../../common/DataBlock/SmalldataBlock";
import DisplayingStudentHomework from "../../common/DataBlock/DisplayingStudentHomework";

const Testing = () => {
  const trafficChartData = {
    series: [200, 250],
    colors: ["#65FA9E", "#286C56"],
    labels: ["Male", "Female"],
    title: "Total Students",
    height: 320,
    width: "100%",
    containerId: "custom-donut-chart",
    innerLable: "Total Students",
  };

  const barChartData = [
    {
      name: "Visitors",
      data: [30, 40, 35, 50, 49, 60, 70],
    },
    {
      name: "Visitors",
      data: [12, 40, 16, 50, 49, 60, 70],
    },
  ];

  const barChartColors = ["#FF4560", "#00E396"];

  const trafficData = [
    {
      referral: "Facebook",
      visitors: "1,480",
      percentage: 60,
      color: "#ff5b2e",
    },
    {
      referral: "Facebook",
      visitors: "5,480",
      percentage: 50,
      color: "#a855f7",
    },
    { referral: "Google", visitors: "4,807", percentage: 60, color: "#ec4899" },
    {
      referral: "Instagram",
      visitors: "3,678",
      percentage: 85,
      color: "#3b82f6",
    },
    {
      referral: "Twitter",
      visitors: "2,645",
      percentage: 60,
      color: "#f97316",
    },
  ];

  return (
    <div className="app-container flex flex-col">
      <div className="flex">
        <TrafficChart {...trafficChartData} />

        <div className=" ml-4 h-[100%] w-full bg-[#283046] rounded-lg shadow p-4 md:p-6">
          <div className="flex justify-between mb-3"></div>
          <BarChart
            series={barChartData}
            colors={barChartColors}
            height={350}
          />
        </div>
      </div>

      <div className="bg-[#1a202c] min-h-screen p-4">
        <DataTable data={trafficData} />
      </div>
      {/* <PyramidLoader/> */}

      <RadialBarChart />
      <div className="flex gap-4">
        <SmalldataBlock
          title="Total Students"
          description="Number of students enrolled"
          iconUrl="https://img.icons8.com/ios/50/000000/graduation-cap--v1.png"
          bgColor="bg-[#FF4560]"
          value={200}
        />
        <SmalldataBlock
          title="Total Teachers"
          description="Number of teachers"
          iconUrl="https://img.icons8.com/ios/50/000000/teacher.png"
          bgColor="bg-[#00E396]"
          value={50}
        />
        <SmalldataBlock
          title="Classes Today"
          description="Number of classes scheduled"
          iconUrl="https://img.icons8.com/ios/50/000000/classroom.png"
          bgColor="bg-[#008FFB]"
          value={30}
        />
        {/* Add more blocks as needed */}
      </div>
      <DisplayingStudentHomework/>
    </div>
  );
};

export default Testing;
