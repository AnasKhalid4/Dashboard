// YourUpdatedInsightsComponent.js
import React, { useState, useEffect } from "react";
import { useData } from "../dataContext/DataContext";
import { styles } from "../styles";
const InsightsByPestle = () => {
  const { data, fetchData } = useData();
  const [filteredData, setFilteredData] = useState([]);
  const [selectedPestle, setSelectedPestle] = useState("Technological");

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    const insights = data.filter((entry) =>
      selectedPestle === "All" ? true : entry.pestle === selectedPestle
    );
    setFilteredData(insights);
  }, [data, selectedPestle]);

  const handlePestleChange = (e) => {
    setSelectedPestle(e.target.value);
  };

  return (
    <div>
      <h2 className={` ${styles.chartHeading} dark:text-[#b0b3c2] px-11 pt-11`}>
        Insights
      </h2>
      <h2 className={` ${styles.chartSubHeading} dark:text-[#7b7f98] px-11 `}>
        By PESTLE factor
      </h2>
      <div className="flex flex-row sm:justify-end my-5 lg:mx-0">
        <div>
          <select
            id="pestleSelect"
            value={selectedPestle}
            onChange={handlePestleChange}
            className={`${styles.filters} dark:text-[#b0b3c2] h-8  mx-6 w-40 lg:w-56 dark:bg-gray-800  `}
          >
            {Array.from(new Set(data.map((entry) => entry.pestle)))
              .filter((pestle) => pestle.trim() !== "")
              .map((pestle) => (
                <option
                  key={pestle}
                  value={pestle}
                  className="text-[10px] sm:[20px]"
                >
                  {pestle}
                </option>
              ))}
          </select>
        </div>
      </div>
      <div className="mr-0 max-h-96 overflow-y-auto ml-0  scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-violet-200">
        {filteredData.length > 0 ? (
          <table className="table-auto   ">
            <tbody>
              {filteredData.map((entry, index) => (
                <tr key={index}>
                  <td className="border p-2">
                    <span className="text-slate-500 text-justify">
                      {entry.title}{" "}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="p-28 sm:text-[34px] dark:text-white font-poppins">
            No insights found for the selected PESTLE factor.
          </p>
        )}
      </div>
    </div>
  );
};

export default InsightsByPestle;
