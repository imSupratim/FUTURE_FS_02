import React from "react";
import CreateLeadForm from "../components/createLeadForm";
import Navbar from "../components/Navbar";

const LeadForm = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return (
      <>
      <Navbar user={user} />
      <div className="size-screen flex justify-center items-center">
        
        Please Login first
      </div>
      </>
    );
  }
  return (
    <div>
      <Navbar user={user} />
      <div className="p-20">
        <CreateLeadForm />
      </div>
    </div>
  );
};

export default LeadForm;
