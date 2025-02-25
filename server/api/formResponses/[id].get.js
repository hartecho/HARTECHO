import FormResponse from '~/server/models/FormResponse.js';

export default defineEventHandler(async (event) => {
  await connectDB();
  try {
    const { id } = event.context.params;

    // Fetch all FormResponse documents with the given formId
    const responses = await FormResponse.find({ formId: id });

    if (!responses || responses.length === 0) {
      throw createError({ statusCode: 404, message: 'No responses found for this form' });
    }

    await disconnectDB();
    return responses;
  } catch (error) {
    console.error('Error in GET /api/formResponses/:id:', error);
    throw createError({ statusCode: 500, message: 'Server Error' });
  }
});
