import { useEffect, useState } from "react";
import api from "../api/axios";

const DashboardStats = () => {

  const [stats, setStats] = useState({
    total: 0,
    newLeads: 0,
    contacted: 0,
    converted: 0
  });

  const fetchStats = async () => {
    try {

      const res = await api.get("/leads");

      const leads = res.data;

      const total = leads.length;

      const newLeads = leads.filter(l => l.status === "new").length;
      const contacted = leads.filter(l => l.status === "contacted").length;
      const converted = leads.filter(l => l.status === "converted").length;

      setStats({
        total,
        newLeads,
        contacted,
        converted
      });

    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const conversionRate =
    stats.total === 0
      ? 0
      : ((stats.converted / stats.total) * 100).toFixed(1);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">

      {/* Total Leads */}
      <div className="bg-white shadow rounded-lg p-6">
        <p className="text-gray-500">Total Leads</p>
        <h2 className="text-3xl font-bold">{stats.total}</h2>
      </div>

      {/* New Leads */}
      <div className="bg-blue-100 shadow rounded-lg p-6">
        <p className="text-gray-600">New Leads</p>
        <h2 className="text-3xl font-bold">{stats.newLeads}</h2>
      </div>

      {/* Contacted */}
      <div className="bg-yellow-100 shadow rounded-lg p-6">
        <p className="text-gray-600">Contacted</p>
        <h2 className="text-3xl font-bold">{stats.contacted}</h2>
      </div>

      {/* Converted */}
      <div className="bg-green-100 shadow rounded-lg p-6">
        <p className="text-gray-600">Converted</p>
        <h2 className="text-3xl font-bold">{stats.converted}</h2>
      </div>

      {/* Conversion Rate */}
      <div className="bg-purple-100 shadow rounded-lg p-6 md:col-span-4">
        <p className="text-gray-600">Conversion Rate</p>
        <h2 className="text-3xl font-bold">{conversionRate}%</h2>
      </div>

    </div>
  );
};

export default DashboardStats;