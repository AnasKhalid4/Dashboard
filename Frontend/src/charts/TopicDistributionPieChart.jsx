// TopicDistributionPieChart.js
import React, { useEffect, useState } from "react";
import { useData } from "../dataContext/DataContext";
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { styles } from "../styles";
const TopicDistributionPieChart = () => {
  const { data, fetchData } = useData();
  const [selectedFilter, setSelectedFilter] = useState("Government");
  const [pieChartData, setPieChartData] = useState([]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    const filteredData = data.filter(
      (entry) =>
        !selectedFilter ||
        entry.sector === selectedFilter ||
        entry.region === selectedFilter
    );

    const topicDistribution = filteredData.reduce((acc, entry) => {
      acc[entry.topic] = (acc[entry.topic] || 0) + 1;
      return acc;
    }, {});

    // Convert to an array for pie chart data
    const pieData = Object.entries(topicDistribution).map(
      ([topic, count], index) => ({
        name: topic,
        value: count,
        fill: [
          "#a78bfa",
          "#c084fc",
          "#8b5cf6",
          "#a855f7",
          "#7c3aed",
          "#9333ea",
          "#6d28d9",
          "#7e22ce",
          "#5b21b6",
          "#6b21a8",
          "#4c1d95",
          "#581c87",
          "#2e1065",
          "#3b0764",
        ][index % 14],
      })
    );

    setPieChartData(pieData);
  }, [data, selectedFilter]);

  const handleFilterChange = (e) => {
    setSelectedFilter(e.target.value);
  };

  return (
    <div>
      <div className="flex flex-row">
        <div>
          <h2 className={` ${styles.chartHeading} px-11 pt-11 dark:text-[#b0b3c2]  `}>
       
            Pie Chart
          </h2>
          <h2 className={` ${styles.chartSubHeading} dark:text-[#7b7f98] px-11 `}>
            Topic Distribution
          </h2>
        </div>
        <div className="flex justify-end items-end  ">
          <select
            value={selectedFilter}
            onChange={handleFilterChange}
            className={`${styles.filters} dark:text-[#b0b3c2] h-8 text-slate-500 w-28  sm:w-40 lg:w-50 my-2 mx-6 dark:bg-gray-800  `}
          >
            {[
              ...new Set(data.map((entry) => entry.sector)),
              ...new Set(data.map((entry) => entry.region)),
            ]
              .filter((filter) => filter.trim() !== "")
              .map((filter) => (
                <option
                  key={filter}
                  value={filter}
                  className="text-[10px] sm:[20px]"
                >
                  {filter}
                </option>
              ))}
          </select>
        </div>
      </div>
      <div>
        {pieChartData.length > 0 ? (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                dataKey="value"
                data={pieChartData}
                cx="50%"
                cy="50%"
                outerRadius={110}
                paddingAngle={2}
              />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <p className="p-28 sm:text-[34px] dark:text-white font-poppins">
            No data available for the pie chart.
          </p>
        )}
      </div>
    </div>
  );
};

export default TopicDistributionPieChart;
