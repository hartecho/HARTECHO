import FormResponse from '~/server/models/FormResponse.js';

export default defineEventHandler(async (event) => {
  await connectDB();
  try {
    const body = await readBody(event);
    const response = new FormResponse(body);
    await response.save();
    await disconnectDB();
    return response;
  } catch (error) {
    console.error('Error in POST /api/formResponses:', error);
    throw createError({ statusCode: 500, message: 'Server Error' });
  }
});