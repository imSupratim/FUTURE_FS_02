import { useEffect, useState } from "react";
import api from "../api/axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const LeadStatusChart = () => {

  const [data, setData] = useState([]);

  const fetchLeads = async () => {
    try {

      const res = await api.get("/leads");
      const leads = res.data;

      const statusCount = {
        new: 0,
        contacted: 0,
        converted: 0
      };

      leads.forEach((lead) => {
        if (statusCount[lead.status] !== undefined) {
          statusCount[lead.status]++;
        }
      });

      const chartData = [
        { name: "New", value: statusCount.new },
        { name: "Contacted", value: statusCount.contacted },
        { name: "Converted", value: statusCount.converted }
      ];

      setData(chartData);

    } catch (error) {
      console.error("Status chart error:", error);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  return (
    <div className="bg-white shadow rounded-lg p-6">

      <h2 className="text-lg font-semibold mb-4">
        Lead Status Distribution
      </h2>

      <ResponsiveContainer width="100%" height={300}>

        <BarChart data={data}>

          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />

          <Bar dataKey="value" fill="#3b82f6" />

        </BarChart>

      </ResponsiveContainer>

    </div>
  );
};

export default LeadStatusChart;