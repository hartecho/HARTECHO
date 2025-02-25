import Form from '~/server/models/Form.js';
import { connectDB } from '~/server/utils/dbConnect';
import { disconnectDB } from '~/server/utils/dbDisconnect';

export default defineEventHandler(async (event) => {
  await connectDB();
  try {
    const { id } = event.context.params;
    const form = await Form.findByIdAndDelete(id);
    if (!form) {
      throw createError({ statusCode: 404, message: 'Form not found' });
    }
    await disconnectDB();
    return { message: 'Form deleted successfully' };
  } catch (error) {
    console.error('Error in DELETE /api/forms/:id:', error);
    throw createError({ statusCode: 500, message: 'Server Error' });
  }
});