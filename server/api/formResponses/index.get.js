import FormResponse from '~/server/models/FormResponse.js';

export default defineEventHandler(async (event) => {
  await connectDB();
  try {
    const responses = await FormResponse.find({});
    await disconnectDB();
    return responses;
  } catch (error) {
    console.error('Error in GET /api/formResponses:', error);
    throw createError({ statusCode: 500, message: 'Server Error' });
  }
});