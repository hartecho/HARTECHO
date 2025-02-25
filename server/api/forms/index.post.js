import Form from '~/server/models/Form.js';
import { connectDB } from '~/server/utils/dbConnect';
import { disconnectDB } from '~/server/utils/dbDisconnect';

export default defineEventHandler(async (event) => {
  await connectDB();
  try {
    const body = await readBody(event);
    const form = new Form(body);
    await form.save();
    await disconnectDB();
    return form;
  } catch (error) {
    console.error('Error in POST /api/forms:', error);
    throw createError({ statusCode: 500, message: 'Server Error' });
  }
});