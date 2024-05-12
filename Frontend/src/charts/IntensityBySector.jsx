// YourUpdatedBarChartComponent.js
import React, { useEffect, useState } from "react";
import { useData } from "../dataContext/DataContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { FaCircle } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";
import { styles } from "../styles";
const IntensityBySector = () => {
  const { data, fetchData } = useData();
  const [barChartData, setBarChartData] = useState([]);
  const [selectedSector, setSelectedSector] = useState("Energy");
  const [selectedCountry, setSelectedCountry] = useState("All");

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    const sectorData = data
      .filter(
        (entry) =>
          (entry.sector === selectedSector || selectedSector === "All") &&
          (entry.country === selectedCountry || selectedCountry === "All") &&
          entry.end_year &&
          entry.end_year.trim() !== ""
      )
      .reduce((result, entry) => {
        const endYear = entry.end_year.trim();

        const existingEntry = result.find((item) => item.end_year === endYear);

        if (existingEntry) {
          existingEntry.intensity += entry.intensity;
        } else {
          result.push({
            end_year: endYear,
            intensity: entry.intensity,
          });
        }

        return result;
      }, []);

    // Sort years in ascending order
    const sortedData = sectorData.sort(
      (a, b) => parseInt(a.end_year) - parseInt(b.end_year)
    );

    setBarChartData(sortedData);
  }, [data, selectedSector, selectedCountry]);

  const handleSectorChange = (e) => {
    setSelectedSector(e.target.value);
  };

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
  };

  return (
    <div>
      <h2 className={`${styles.chartHeading} px-11 pt-11 dark:text-[#b0b3c2]  `}>
        Bar Chart
      </h2>

      <h2 className={`${styles.chartSubHeading} px-11  dark:text-[#7b7f98] `}>
        Intensity by Sectors and country
      </h2>

      <h2 className="dark:text-[#7b7f98] px-11 text-[10px] sm:text-[15px] font-poppins flex flex-row  text-slate-500 mt-6 ">
        <FaCircle size={10} color="#7c3aed " className="mt-1 mx-2" />
        <span> {selectedSector} </span>
        <FaCircle size={10} color="#a78bfa" className="mt-1 ml-3 mr-2" />
        <span>{selectedCountry}</span>
      </h2>

      <div className="flex flex-row  sm:justify-end  my-5 mx-6 sm:mx-6 lg:mx-0">
        <div>
          <select
            id="sectorSelect"
            value={selectedSector}
            onChange={handleSectorChange}
            className={`${styles.filters}  dark:text-[#b0b3c2] h-8 text-slate-500 w-28  sm:w-40 lg:w-56 dark:bg-gray-800  `}
          >
            {Array.from(new Set(data.map((entry) => entry.sector)))
              .filter((sector) => sector.trim() !== "")
              .map((sector) => (
                <option
                  key={sector}
                  value={sector}
                  className="text-[10px] sm:[20px]"
                >
                  {sector}
                </option>
              ))}
            <option value="All">All Sectors</option>
          </select>
        </div>
      
        <div className="ml-4">
          <select
            id="countrySelect"
            value={selectedCountry}
            onChange={handleCountryChange}
            className={`${styles.filters} dark:text-[#b0b3c2] h-8 text-slate-500 w-40 lg:w-56 dark:bg-gray-800 `}
          >
            {Array.from(new Set(data.map((entry) => entry.country)))
              .filter((country) => country.trim() !== "")
              .map((country) => (
                <option
                  key={country}
                  value={country}
                  className="text-[10px] sm:[20px]"
                >
                  {country}
                </option>
              ))}
            <option value="All">All Countries</option>
          </select>
        </div>
      </div>
      <div className="mr-10">
        {barChartData.length > 0 ? (
          <ResponsiveContainer width="101%" height={400}>
            <BarChart data={barChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="end_year" />
              <YAxis type="number" />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="intensity"
                fill="#a78bfa"
                name={`Total Intensity for ${selectedSector}`}
              />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="p-28 sm:text-[34px] dark:text-white font-poppins">
            No data found for this selected Sector and Country.
          </p>
        )}
      </div>
    </div>
  );
};

export default IntensityBySector;
