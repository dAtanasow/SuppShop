import { useGetReview } from "../../../hooks/useReviews";

export default function ReviewCard({ reviewId }) {
  const { review, user, handleLike, handleDislike } = useGetReview(reviewId);

  if (!review || !user) return <div>Loading...</div>;
  return (
    <div className="flex items-start space-x-8 p-4 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-100 transition-all">
      <div>
        {user?.avatar ? (
          <img
            src={user.avatar}
            className="w-22 object-cover rounded-full border-4 border-blue-400 shadow-lg"
          />
        ) : (
          <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center text-white font-bold">
            {user?.username}
          </div>
        )}
      </div>
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-2">
          <p className="text-yellow-500 text-xl/1">
            {"★".repeat(review.rating)}
            {"☆".repeat(5 - review.rating)}
          </p>
          <p className="text-sm text-gray-500">
            {new Date(review.createdAt).toLocaleDateString()}
          </p>
        </div>
        <p className="text-lg/3 font-semibold text-gray-800">
          {user?.username}
        </p>

        <p className="text-gray-700 text-lg/10">{review.comment}</p>
      </div>

      <div className="flex items-center space-x-3 mt-2 ml-auto">
        <button
          onClick={handleLike}
          className="text-xl cursor-pointer text-blue-500"
        >
          👍 {review.likeCount}
        </button>
        <button
          onClick={handleDislike}
          className="text-xl cursor-pointer text-red-500"
        >
          👎 {review.dislikeCount}
        </button>
      </div>
    </div>
  );
}
