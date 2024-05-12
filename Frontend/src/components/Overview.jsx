import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import {
  InsightsByPestle,
  IntensityBySector,
  RegionScatter,
  TopicDistributionPieChart,
} from "../charts";
import { styles } from "../styles";
const Overview = () => {
  return (
    <div>
      <Sidebar />
      <Navbar />

      <div class="p-4 sm:ml-64 mt-16 overflow-hidden dark:bg-[#2F3349] ">
        <div class="p-4 dark:border-gray-700">
          <div
            class={`${styles.flexCenter} lg:pr-6 mb-20 ${styles.border} dark:bg-[#2F3349]`}
          >
            <IntensityBySector />
          </div>

          <div class="grid lg:grid-cols-2 gap-4 mb-4">
            <div
              class={`${styles.flexCenter} bg-white ${styles.border}  dark:bg-[#2F3349]`}
            >
              <InsightsByPestle />
            </div>

            <div
              class={`${styles.flexCenter} ${styles.border} dark:bg-[#2F3349] `}
            >
              <TopicDistributionPieChart />
            </div>
          </div>

          <div
            class={`${styles.flexCenter}  mb-4 lg:pr-6 mt-20 ${styles.border} dark:bg-[#2F3349] `}
          >
            <RegionScatter />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
