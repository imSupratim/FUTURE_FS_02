import DashboardStats from "../components/DashboardStats";
import LeadsBySourceChart from "../components/LeadsBySourceChart";
import LeadStatusChart from "../components/LeadStatusChart";
import LeadTable from "../components/LeadTable";
import Navbar from "../components/Navbar";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Navbar user={user} />
        <div className="flex-grow flex justify-center items-center p-6">
          <div className="bg-white px-8 py-10 rounded-xl shadow-sm border border-slate-200 text-center max-w-sm w-full">
            <h2 className="text-xl font-semibold text-slate-800 mb-2">Access Restricted</h2>
            <p className="text-slate-500">Please login to view your dashboard.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <Navbar user={user} />

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8 space-y-8">
        
        {/* Header Section */}
        <header>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-800">
            Welcome to CRM Dashboard
          </h2>
          <p className="text-slate-500 mt-1 text-sm">
            Here is an overview of your lead generation and statuses.
          </p>
        </header>

        {/* Stats Section */}
        <section>
          <DashboardStats />
        </section>

        {/* Charts Section */}
        <section className="grid lg:grid-cols-2 gap-6">
          {/* Added visual wrappers for the charts if they don't have their own backgrounds */}
          <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-slate-100">
            <LeadsBySourceChart />
          </div>
          <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-slate-100">
            <LeadStatusChart />
          </div>
        </section>  

        {/* Table Section */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <LeadTable />
        </section>
        
      </div>
    </div>
  );
}

export default Dashboard;