import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';

const CompanyPage = () => {
  const { slug } = useParams();
  const [company, setCompany] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const { data: companyData } = await api.get(`/companies/${slug}`);
        setCompany(companyData);
        
        if (companyData) {
          const { data: reviewsData } = await api.get(`/reviews/company/${companyData._id}`);
          setReviews(reviewsData);
        }
      } catch (error) {
        console.error('Failed to fetch data', error);
      }
    };
    fetchCompanyData();
  }, [slug]);

  if (!company) return <div className="p-8 text-center text-gray-600">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{company.name}</h1>
        <a href={company.website} className="text-blue-600 hover:underline mb-4 block">{company.website}</a>
        <p className="text-gray-700">{company.description}</p>
        
        <div className="mt-6">
          <Link 
            to={`/company/${company._id}/review`}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            Write a Review
          </Link>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6">Reviews ({reviews.length})</h2>
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review._id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center mb-2">
                <div className="text-yellow-400 font-bold mr-2">⭐ {review.rating}/5</div>
                <h3 className="text-lg font-semibold text-gray-900">{review.title}</h3>
              </div>
              <p className="text-gray-700">{review.reviewText}</p>
              <div className="mt-4 text-sm text-gray-500">
                By {review.userId?.name || 'Anonymous'}
              </div>
            </div>
          ))}
          {reviews.length === 0 && (
            <p className="text-gray-500 italic">No reviews yet. Be the first to review this company.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyPage;
