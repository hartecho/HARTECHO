import FormResponse from '~/server/models/FormResponse.js';

export default defineEventHandler(async (event) => {
  await connectDB();
  try {
    const { id } = event.context.params;
    const response = await FormResponse.findByIdAndDelete(id);
    if (!response) {
      throw createError({ statusCode: 404, message: 'Form response not found' });
    }
    await disconnectDB();
    return { message: 'Form response deleted successfully' };
  } catch (error) {
    console.error('Error in DELETE /api/formResponses/:id:', error);
    throw createError({ statusCode: 500, message: 'Server Error' });
  }
});