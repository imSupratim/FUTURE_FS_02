import Lead from "../models/Lead.js";


export const createLead = async (req, res) => {
  try {
    const { name, email, source } = req.body;

    const lead = new Lead({
      name,
      email,
      source
    });

    await lead.save();

    res.status(201).json(lead);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const getLeads = async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });

    res.json(leads);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const updateLeadStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    lead.status = status;

    await lead.save();

    res.json(lead);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const addNote = async (req, res) => {
  try {
    const { text } = req.body;

    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    lead.notes.push({ text });

    await lead.save();

    res.json(lead);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSingleLead = async (req, res) => {
  try {

    const lead = await Lead.findById(req.params.id);

    res.json(lead);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};