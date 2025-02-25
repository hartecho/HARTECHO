import PortfolioItem from '~/server/models/PortfolioItem.js';
import { connectDB } from '~/server/utils/dbConnect';
import { disconnectDB } from '~/server/utils/dbDisconnect';

export default defineEventHandler(async (event) => {
    await connectDB(); // Ensure DB connection
  try {
    // const { params } = readBody(event);
    const portfolioItemId = event.context.params.id;

    const portfolioItem = await PortfolioItem.findByIdAndDelete(portfolioItemId);
    if (!portfolioItem) {
      throw createError({ statusCode: 404, message: 'PortfolioItem not found' });
    }

    // Returning the deleted portfolioItem could be informative; adjust based on your preference
    await disconnectDB();
    return { message: 'PortfolioItem successfully deleted', portfolioItem };
  } catch (error) {
    console.error('Error in DELETE /api/portfolioItems/:id:', error);
    throw createError({ statusCode: 500, message: 'Server Error' });
  }
});
