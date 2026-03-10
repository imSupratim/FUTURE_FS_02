import { useState } from "react";
import api from "../api/axios";
import { User, Mail, Globe, Tag, PlusCircle, Loader2 } from "lucide-react";

const CreateLeadForm = ({ refreshLeads }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    source: "",
    status: "new"
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await api.post("/leads", formData);

      setFormData({
        name: "",
        email: "",
        source: "",
        status: "new"
      });

      if (refreshLeads) {
        refreshLeads();
      }
    } catch (error) {
      console.error("Error creating lead:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-800">
          Lead Details
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Please provide the contact information and origin of this lead.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        
        {/* Input Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          
          {/* Name Field */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700 block">Full Name</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-4 w-4 text-slate-400" />
              </div>
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors"
              />
            </div>
          </div>

          {/* Email Field */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700 block">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-4 w-4 text-slate-400" />
              </div>
              <input
                type="email"
                name="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors"
              />
            </div>
          </div>

          {/* Source Field */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700 block">Lead Source</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Globe className="h-4 w-4 text-slate-400" />
              </div>
              <input
                type="text"
                name="source"
                placeholder="Website, LinkedIn, Referral..."
                value={formData.source}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors"
              />
            </div>
          </div>

          {/* Status Field */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700 block">Initial Status</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Tag className="h-4 w-4 text-slate-400" />
              </div>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors appearance-none"
              >
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="converted">Converted</option>
              </select>
            </div>
          </div>
          
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors disabled:bg-emerald-400 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Creating...</span>
              </>
            ) : (
              <>
                <PlusCircle className="h-4 w-4" />
                <span>Create Lead</span>
              </>
            )}
          </button>
        </div>

      </form>
    </div>
  );
};

export default CreateLeadForm;