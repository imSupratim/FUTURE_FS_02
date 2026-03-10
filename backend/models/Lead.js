import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const leadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true
    },

    source: {
      type: String,
      default: "website"
    },

    status: {
      type: String,
      enum: ["new", "contacted", "converted"],
      default: "new"
    },

    notes: [noteSchema]
  },
  { timestamps: true }
);

const Lead = mongoose.model("Lead", leadSchema);

export default Lead;


// {
//   "_id": "664abc123",
//   "name": "Rahul Sharma",
//   "email": "rahul@gmail.com",
//   "source": "website",
//   "status": "new",
//   "notes": [
//     {
//       "text": "Client asked for pricing",
//       "createdAt": "2026-03-10"
//     }
//   ],
//   "createdAt": "2026-03-10",
//   "updatedAt": "2026-03-10"
// }