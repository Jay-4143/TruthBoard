const Review = require('../models/Review');
const Company = require('../models/Company');

/**
 * Recalculates and updates a company's rating statistics.
 * @param {string} companyId - The ID of the company to update.
 */
const updateCompanyStats = async (companyId) => {
  try {
    const reviews = await Review.find({ companyId });
    const totalReviews = reviews.length;

    if (totalReviews === 0) {
      await Company.findByIdAndUpdate(companyId, {
        averageRating: 0,
        totalReviews: 0,
        trustScore: 0,
        ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
      });
      return;
    }

    const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    let totalRating = 0;

    reviews.forEach(review => {
      totalRating += review.rating;
      if (distribution[review.rating] !== undefined) {
        distribution[review.rating]++;
      }
    });

    const averageRating = (totalRating / totalReviews).toFixed(1);
    
    // Improved trust score formula: 
    // Adjusts average rating based on volume (Bayesian-like approach)
    // Favors higher volume for confidence
    const minReviews = 5;
    const globalAverage = 3.0; // Assume 3.0 as a baseline if low volume
    const trustScore = ((totalReviews * parseFloat(averageRating)) + (minReviews * globalAverage)) / (totalReviews + minReviews);

    await Company.findByIdAndUpdate(companyId, {
      averageRating: parseFloat(averageRating),
      totalReviews,
      ratingDistribution: distribution,
      trustScore: parseFloat(trustScore.toFixed(1))
    });

    console.log(`Updated stats for company ${companyId}: ${averageRating} stars, ${totalReviews} reviews`);
  } catch (error) {
    console.error(`Error updating company stats: ${error.message}`);
  }
};

module.exports = { updateCompanyStats };
