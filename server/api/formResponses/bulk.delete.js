// ~/server/api/formResponses/bulkDelete.js

import FormResponse from '~/server/models/FormResponse.js';
import { isValidObjectId } from 'mongoose'; // Ensure Mongoose is installed and imported correctly

export default defineEventHandler(async (event) => {
  await connectDB(); // Ensure this function properly connects to your database
  try {
    // Read and parse the request body
    const body = await readBody(event);
    const { ids } = body;

    console.log("ids: " + ids);

    // Validate that 'ids' is provided and is an array
    if (!ids || !Array.isArray(ids)) {
      throw createError({
        statusCode: 400,
        message: 'Invalid request body. Expected an array of IDs under the key "ids".',
      });
    }

    // Filter out invalid MongoDB ObjectIDs
    const validIds = ids.filter((id) => isValidObjectId(id));

    if (validIds.length === 0) {
      throw createError({
        statusCode: 400,
        message: 'No valid IDs provided for deletion.',
      });
    }

    console.log("DELETEING");

    // Perform bulk deletion
    const deleteResult = await FormResponse.deleteMany({ _id: { $in: validIds } });

    await disconnectDB(); // Ensure this function properly disconnects from your database

    return {
        statusCode: 200,
      message: `Successfully deleted ${deleteResult.deletedCount} form response(s).`,
    };
  } catch (error) {
    console.error('Error in DELETE /api/formResponses/bulkDelete:', error);
    // If the error is already an HTTP error, rethrow it
    if (error.statusCode && error.message) {
      throw error;
    }
    // Otherwise, throw a generic server error
    throw createError({
      statusCode: 500,
      message: 'An unexpected error occurred while deleting form responses.',
    });
  }
});
