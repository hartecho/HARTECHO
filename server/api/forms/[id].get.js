import Form from '~/server/models/Form.js';
import { connectDB } from '~/server/utils/dbConnect';
import { disconnectDB } from '~/server/utils/dbDisconnect';

export default defineEventHandler(async (event) => {
    await connectDB();
    try {
      const { id } = event.context.params;
      const form = await Form.findById(id);
      if (!form) {
        throw createError({ statusCode: 404, message: 'Form not found' });
      }
      await disconnectDB();
      return form;
    } catch (error) {
      console.error('Error in GET /api/forms/:id:', error);
      throw createError({ statusCode: 500, message: 'Server Error' });
    }
  });