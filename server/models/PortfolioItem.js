import mongoose from 'mongoose';

const portfolioItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  year: { 
    type: String, 
    required: true 
  },
  description: {
    type: String,
    required: true
  },
  thumbnail: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  picture: {
    type: String,
    required: true
  },
  tags: {
    type: [String],
    required: true
  },
  moreImages: {
    type: [String],
    required: false
  }
});

const PortfolioItem = mongoose.model('PortfolioItem', portfolioItemSchema);

export default PortfolioItem;
