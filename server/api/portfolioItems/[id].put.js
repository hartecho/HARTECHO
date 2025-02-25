import PortfolioItem from '~/server/models/PortfolioItem.js'; 
import { connectDB } from '~/server/utils/dbConnect';
import { disconnectDB } from '~/server/utils/dbDisconnect';

export default defineEventHandler(async (event) => {
    await connectDB(); // Ensure DB connection
    try {
        const body = await readBody(event);
        const portfolioItemId = event.context.params.id;

        const portfolioItem = await PortfolioItem.findById(portfolioItemId);
        if (!portfolioItem) {
            throw createError({ statusCode: 404, message: 'PortfolioItem not found' });
        }

        Object.assign(portfolioItem, body);
        await portfolioItem.save();
        await disconnectDB();
        return portfolioItem;
    } catch (error) {
        console.error('Error in PUT /api/portfolioItems/:id:', error);
        throw createError({ statusCode: 500, message: 'Server Error' });
    }
});
