import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/Navbar";

const LeadDetails = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const { id } = useParams();

  const [lead, setLead] = useState(null);
  const [note, setNote] = useState("");

  const fetchLead = async () => {
    try {
      const res = await api.get("/leads");

      const foundLead = res.data.find((l) => l._id === id);

      setLead(foundLead);
    } catch (error) {
      console.error("Error fetching lead:", error);
    }
  };

  useEffect(() => {
    fetchLead();
  }, []);

  const addNote = async () => {
    if (!note.trim()) return;

    try {
      await api.post(`/leads/${id}/note`, {
        text: note,
      });

      setNote("");
      fetchLead();
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  if (!lead) {
    return <p className="p-6">Loading lead details...</p>;
  }

  return (
    <>
    <Navbar user={user}/>
      <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6">Lead Details</h1>

        <div className="bg-white shadow rounded-lg p-6 mb-6 space-y-2">
          <p>
            <strong>Name:</strong> {lead.name}
          </p>
          <p>
            <strong>Email:</strong> {lead.email}
          </p>
          <p>
            <strong>Source:</strong> {lead.source}
          </p>
          <p>
            <strong>Status:</strong> {lead.status}
          </p>

          <p>
            <strong>Created:</strong>{" "}
            {new Date(lead.createdAt).toLocaleDateString()}
          </p>
        </div>

        {/* Notes */}

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Notes</h2>

          <div className="space-y-3 mb-4">
            {!lead.notes || lead.notes.length === 0 ? (
              <p className="text-gray-500">No notes yet</p>
            ) : (
              lead.notes.map((n, index) => (
                <div key={index} className="border p-3 rounded bg-gray-50">
                  <p>{n.text}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(n.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))
            )}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Add note..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="flex-1 border px-3 py-2 rounded"
            />

            <button
              onClick={addNote}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeadDetails;
