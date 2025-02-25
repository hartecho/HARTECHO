import Form from '~/server/models/Form.js';
import { connectDB } from '~/server/utils/dbConnect';
import { disconnectDB } from '~/server/utils/dbDisconnect';

export default defineEventHandler(async (event) => {
    await connectDB();
    try {
      const forms = await Form.find({});
      await disconnectDB();
      return forms;
    } catch (error) {
      console.error('Error in GET /api/forms:', error);
      throw createError({ statusCode: 500, message: 'Server Error' });
    }
  });