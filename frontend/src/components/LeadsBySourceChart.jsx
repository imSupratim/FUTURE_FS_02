import { useEffect, useState } from "react";
import api from "../api/axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

const LeadsBySourceChart = () => {

  const [data, setData] = useState([]);

  const fetchLeads = async () => {
    try {

      const res = await api.get("/leads");
      const leads = res.data;

      const sourceMap = {};

      leads.forEach((lead) => {
        sourceMap[lead.source] = (sourceMap[lead.source] || 0) + 1;
      });

      const chartData = Object.keys(sourceMap).map((key) => ({
        name: key,
        value: sourceMap[key]
      }));

      setData(chartData);

    } catch (error) {
      console.error("Chart error:", error);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  return (
    <div className="bg-white shadow rounded-lg p-6">

      <h2 className="text-lg font-semibold mb-4">
        Leads by Source
      </h2>

      <ResponsiveContainer width="100%" height={300}>

        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            label
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>

          <Tooltip />
          <Legend />

        </PieChart>

      </ResponsiveContainer>

    </div>
  );
};

export default LeadsBySourceChart;