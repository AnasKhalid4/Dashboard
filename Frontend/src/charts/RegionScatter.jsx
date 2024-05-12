// LikelihoodRelevanceScatterPlot.js
import React, { useEffect, useState } from "react";
import { useData } from "../dataContext/DataContext";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { FaCircle } from "react-icons/fa";
import { styles } from "../styles";

const RegionScatter = () => {
  const { data, fetchData } = useData();
  const [scatterData, setScatterData] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("Northern America");

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    const filteredData = data
      .filter(
        (entry) =>
          entry.region === selectedRegion && entry.likelihood && entry.relevance
      )
      .map((entry) => ({
        relevance: entry.relevance,
        likelihood: entry.likelihood,
      }));

    setScatterData(filteredData);
  }, [data, selectedRegion]);

  const handleRegionChange = (e) => {
    setSelectedRegion(e.target.value);
  };

  return (
    <div>
      <h2 className={`${styles.chartHeading} px-11 pt-11 dark:text-[#b0b3c2] `}>
        Scatter Plot
      </h2>
      <h2 className={`${styles.chartSubHeading}dark:text-[#7b7f98] px-11 `}>
        Likelihood vs. Relevance
      </h2>
      <h2 className="dark:text-[#7b7f98] px-11 text-[10px] sm:text-[15px] font-poppins flex flex-row  text-slate-500 mt-6 ">
        <FaCircle size={10} color="#7c3aed " className="mt-1 mx-2" />
        <span> {selectedRegion} </span>
        <FaCircle size={10} color="#a78bfa" className="mt-1 ml-3 mr-2" />
        <span>Insights</span>
      </h2>
      <div className="flex flex-row  sm:justify-end my-5 mx-6  sm:mx-6 lg:mx-0">
        <div>
          <select
            id="regionSelect"
            value={selectedRegion}
            onChange={handleRegionChange}
            className={`${styles.filters} dark:text-[#b0b3c2] h-8 text-slate-500 w-40 lg:w-56 dark:bg-gray-800 `} 
          >
            {Array.from(new Set(data.map((entry) => entry.region)))
              .filter((region) => region.trim() !== "")
              .map((region) => (
                <option
                  key={region}
                  value={region}
                  className="text-[10px] sm:[20px]"
                >
                  {region}
                </option>
              ))}
          </select>
        </div>
      </div>
      <div className="mr-10">
        {scatterData.length > 0 ? (
          <ResponsiveContainer width="101%" height={400}>
            <ScatterChart>
              <CartesianGrid strokeDasharray=" " />
              <XAxis
                type="number"
                dataKey="relevance"
                name="Relevance"
                fill="a78bfa"
              />
              <YAxis
                type="number"
                dataKey="likelihood"
                name="Likelihood"
                fill="b0b3c2"
              />

              <Tooltip />
              <Legend />
              <Scatter
                name={`Insights for ${selectedRegion}`}
                data={scatterData}
                fill="#a78bfa"
              />
            </ScatterChart>
          </ResponsiveContainer>
        ) : (
          <p className="p-28 sm:text-[34px] dark:text-white font-poppins">
            No data found for the selected region.
          </p>
        )}
      </div>
    </div>
  );
};

export default RegionScatter;
