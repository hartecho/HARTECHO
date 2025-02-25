import mongoose from 'mongoose'; // Import mongoose
import FormResponse from '~/server/models/FormResponse.js';
import Form from '~/server/models/Form.js'; // Ensure you have the Form model imported if it's not globally registered

export default defineEventHandler(async (event) => {
  await connectDB();
  try {
    const { id } = event.context.params;
    const body = await readBody(event);

    // Fetch the current form response to compare
    const existingResponse = await FormResponse.findById(id);
    if (!existingResponse) {
      throw createError({ statusCode: 404, message: 'Form response not found' });
    }

    // Fetch the related form
    const form = await Form.findById(existingResponse.formId);

    if (!form) {
      throw createError({ statusCode: 404, message: 'Form not found for the given response.' });
    }

    // Check if the response is complete
    const isCompleted = form.questions.every((question) =>
      body.responses.some((response) => response.questionId === question._id.toString())
    );

    body.responseType = isCompleted ? 'Completed' : 'Abandoned';

    // Overwrite the full document with the updated payload
    const response = await FormResponse.findByIdAndUpdate(id, body, { new: true });

    await disconnectDB();

    return response;
  } catch (error) {
    console.error('Error in PUT /api/formResponses/:id:', error);
    throw createError({ statusCode: 500, message: 'Server Error' });
  }
});
