import { useEffect, useState } from "react";
import api from "../api/axios";
import LeadCard from "./LeadCard";

const LeadTable = () => {

  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const fetchLeads = async () => {
    try {

      const res = await api.get("/leads");
      setLeads(res.data);

    } catch (error) {
      console.error("Error fetching leads:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const updateStatus = async (id, status) => {
    try {

      await api.put(`/leads/${id}/status`, { status });
      fetchLeads();

    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  /* ---------------- FILTER LOGIC ---------------- */

  const filteredLeads = leads.filter((lead) => {

    const matchesSearch =
      lead.name.toLowerCase().includes(search.toLowerCase()) ||
      lead.email.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || lead.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  /* ---------------------------------------------- */

  if (loading) {
    return <p className="p-6">Loading leads...</p>;
  }

  return (
    <div className="p-6">

      <h2 className="text-xl font-semibold mb-4">
        Leads
      </h2>

      {/* Search + Filter */}

      <div className="flex flex-col md:flex-row gap-4 mb-4">

        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 rounded w-full md:w-1/2"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border px-3 py-2 rounded w-full md:w-48"
        >
          <option value="all">All Status</option>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="converted">Converted</option>
        </select>

      </div>

      {/* Table */}

      <div className="overflow-x-auto">

        <table className="w-full border border-gray-200">

          <thead className="bg-gray-100">

            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Source</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Created</th>
              <th className="p-3 text-left">Action</th>
            </tr>

          </thead>

          <tbody>

            {filteredLeads.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center p-4">
                  No leads found
                </td>
              </tr>
            ) : (
              filteredLeads.map((lead) => (
                <LeadCard
                  key={lead._id}
                  lead={lead}
                  updateStatus={updateStatus}
                />
              ))
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default LeadTable;