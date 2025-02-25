import PortfolioItem from '~/server/models/PortfolioItem.js';
import { connectDB } from '~/server/utils/dbConnect';
import { disconnectDB } from '~/server/utils/dbDisconnect';

export default defineEventHandler(async (event) => {
  await connectDB(); // Ensure DB connection
  const body = getQuery(event);
  const _id = body._id;

  try {
      if (_id) {
          const portfolioItem = await PortfolioItem.findById(_id);
          await disconnectDB(); // Disconnect from DB for static file generation to close after build success
          return portfolioItem;
      } else {
          const allPortfolioItems = await PortfolioItem.find({});
          await disconnectDB();
          return allPortfolioItems;
      }
  } catch (error) {
      console.error(error);
      throw createError({ statusCode: 500, message: 'Server Error' });
  }
});

