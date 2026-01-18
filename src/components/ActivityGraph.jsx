"use client";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { FiActivity } from "react-icons/fi";
import { useMemo } from "react";

const ActivityGraph = () => {
  const data = useMemo(
    () => [
      {
        name: "Total Projects",
        cv: 4000,
        pv: 2400,
        amt: 2400,
      },
      {
        name: "Total Blogs",
        cv: 3000,
        pv: 1398,
        amt: 2210,
      },
      {
        name: "Total Skills",
        cv: 2000,
        pv: 9800,
        amt: 2290,
      },
      {
        name: "Total Certificates",
        cv: 2780,
        pv: 3908,
        amt: 2000,
      },
      {
        name: "Total Educations",
        cv: 2280,
        pv: 4908,
        amt: 2000,
      },
      {
        name: "Total Experiences",
        cv: 1780,
        pv: 5908,
        amt: 2000,
      },
      {
        name: "Total Achievements",
        cv: 2780,
        pv: 3908,
        amt: 2000,
      },
    ],
    [],
  );

  return (
    <div className="col-span-12 md:col-span-8 bg-white rounded-xl border border-gray-200 shadow-sm">
      <div className="p-4 h-full flex flex-col">
        {/* Title */}
        <div className="flex items-center gap-2 font-semibold text-gray-800">
          <FiActivity size={22} />
          Activity
        </div>

        {/* Chart */}
        <div className="h-80 mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="pv"
                stroke="#6366f1"
                strokeWidth={2}
                dot
              />
              <Line
                type="monotone"
                dataKey="cv"
                stroke="#22c55e"
                strokeWidth={2}
                dot
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ActivityGraph);
