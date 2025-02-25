import PortfolioItem from '~/server/models/PortfolioItem.js';
import { connectDB } from '~/server/utils/dbConnect';
import { disconnectDB } from '~/server/utils/dbDisconnect';

export default defineEventHandler(async (event) => {
    await connectDB(); // Ensure DB connection
  try {
    const body = await readBody(event);
    body._id = null;
    const portfolioItem = new PortfolioItem(body);
    await portfolioItem.save();
    await disconnectDB();
    return portfolioItem;
  } catch (error) {
    console.error('Error in POST /api/portfolioItems:', error);
    throw createError({ statusCode: 500, message: 'Server Error' });
  }
});
