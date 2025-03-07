import mongoose from 'mongoose';

// Define the schema for choices in multiple-choice questions
const choiceSchema = new mongoose.Schema({
  label: String, // No need for a custom id
});

// Define the schema for questions, leveraging MongoDB's `_id`
const questionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  type: {
    type: String,
    enum: [
      'multiple_choice',
      'short_text',
      'long_text',
      'email',
      'phone_number',
      'first_name',  // Added for first name
      'last_name'    // Added for last name
    ],
    required: true,
  },
  allow_multiple_selection: { type: Boolean, default: false },
  choices: [choiceSchema],
  validations: {
    required: { type: Boolean, default: false },
  },
  placeholder: String, // For short text inputs
});

// Define the schema for forms
const formSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  questions: [questionSchema],
  redirectUrl: { type: String },
  views: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

// Models
const Form = mongoose.model('Form', formSchema);

export default Form;
