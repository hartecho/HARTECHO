import mongoose from 'mongoose';

// Define the schema for individual responses to questions
const responseSchema = new mongoose.Schema({
  questionId: String,
  questionType: String,
  response: mongoose.Schema.Types.Mixed, // The user's answer
});

const formResponseSchema = new mongoose.Schema({
  formId: { type: mongoose.Schema.Types.ObjectId, ref: "Form", required: true },
  responses: [responseSchema], // Array of responses
  submittedAt: { type: Date, default: Date.now },
  responseType: {
    type: String,
    enum: ["Completed", "Abandoned"],
    default: "Abandoned", // Default to "Abandoned" if not set
  },
});

const FormResponse = mongoose.model("FormResponse", formResponseSchema);
export default FormResponse;
