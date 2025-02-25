import Form from '~/server/models/Form.js';
import { connectDB } from '~/server/utils/dbConnect';
import { disconnectDB } from '~/server/utils/dbDisconnect';


export default defineEventHandler(async (event) => {
    await connectDB();
    try {
      const { id } = event.context.params;
      const body = await readBody(event);
      const form = await Form.findByIdAndUpdate(id, body, { new: true });
      if (!form) {
        throw createError({ statusCode: 404, message: 'Form not found' });
      }
      await disconnectDB();
      return form;
    } catch (error) {
      console.error('Error in PUT /api/forms/:id:', error);
      throw createError({ statusCode: 500, message: 'Server Error' });
    }
  });