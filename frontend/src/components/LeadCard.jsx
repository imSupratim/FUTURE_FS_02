import { useNavigate } from "react-router-dom";

const LeadCard = ({ lead, updateStatus }) => {

  const navigate = useNavigate();

  return (
    <tr >

      <td className="p-3">{lead.name}</td>
      <td className="p-3">{lead.email}</td>
      <td className="p-3">{lead.source}</td>

      <td className="p-3">
        <select
          value={lead.status}
          onChange={(e) =>
            updateStatus(lead._id, e.target.value)
          }
          className="border px-2 py-1 rounded"
        >
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="converted">Converted</option>
        </select>
      </td>

      <td className="p-3">
        {new Date(lead.createdAt).toLocaleDateString()}
      </td>

      <td className="p-3">
        <button
          onClick={() => navigate(`/leads/${lead._id}`)}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          View
        </button>
      </td>

    </tr>
  );
};

export default LeadCard;