import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { useGetOneProduct } from "../../hooks/useProducts";
import { useGetAllReviews } from "../../hooks/useReviews";
import { useAddToCart } from "../../hooks/useCart";
import { useAddReview } from "../../hooks/useReviews";
import { useDeleteProduct } from "../../hooks/useProducts";
import ToggleSection from "./ToggleSection.jsx";
import ReviewCard from "../product-details/ReviewCard.jsx";

export default function ProductDetails() {
  const { productId } = useParams();
  const { userId } = useAuthContext();

  const {
    product,
    loading: productLoading,
    error: productError,
  } = useGetOneProduct(productId);
  const {
    reviews: fetchedReviews,
    loading: reviewsLoading,
    error: reviewsError,
    handleLike,
    handleDislike,
    userVote,
    refetchReviews,
  } = useGetAllReviews(productId);

  const { addReview, loading: newReviewLoading } = useAddReview(
    productId,
    refetchReviews
  );
  const {
    deleteProduct,
    loading: deleteLoading,
    error: deleteError,
  } = useDeleteProduct();
  const { addToCartHandler } = useAddToCart(productId);

  const [reviews, setReviews] = useState(fetchedReviews || []);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isDescriptionOpen, setDescriptionOpen] = useState(false);
  const [isIngredientsOpen, setIngredientsOpen] = useState(false);
  const [isWarningsOpen, setWarningsOpen] = useState(false);
  const [isDirectionsOpen, setDirectionsOpen] = useState(false);

  const toggleDescription = () => setDescriptionOpen(!isDescriptionOpen);
  const toggleIngredients = () => setIngredientsOpen(!isIngredientsOpen);
  const toggleWarnings = () => setWarningsOpen(!isWarningsOpen);
  const toggleDirections = () => setDirectionsOpen(!isDirectionsOpen);

  const isLoading =
    productLoading || reviewsLoading || newReviewLoading || deleteLoading;
  const error = productError || reviewsError || deleteError;

  const isAuthor = userId === product?.authorId?._id;

  useEffect(() => {
    if (fetchedReviews && fetchedReviews.length > 0) {
      setReviews(fetchedReviews);
    }
  }, [fetchedReviews]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const scrollPosition = window.scrollY;
    await addReview(rating, comment);
    setRating(0);
    setComment("");
    window.scrollTo(0, scrollPosition);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <div className="max-w-screen-xl mx-auto p-4 md:flex">
        <div className="w-full md:w-1/2 p-4">
          {product.imgURL ? (
            <img
              src={product.imgURL}
              alt={product.title}
              className="w-auto h-155 object-cover rounded-sm shadow-lg"
            />
          ) : (
            <div className="w-full h-64 bg-gray-300 flex items-center justify-center text-gray-500">
              No Image Available
            </div>
          )}
        </div>

        <div className="w-full md:w-1/2 p-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {product.title}
          </h1>

          <div className="text-xl font-semibold text-gray-800 mb-4">
            <span>${product.price}</span>
          </div>

          <div className="mb-6">
            <ul className="list-disc pl-5 space-y-2 text-gray-600 text-lg">
              {product.category && (
                <li>
                  <strong>Category:</strong> {product.category}
                </li>
              )}
              {product.brand && (
                <li>
                  <strong>Brand:</strong> {product.brand}
                </li>
              )}
              {product.flavour && (
                <li>
                  <strong>Flavour:</strong> {product.flavour}
                </li>
              )}
              {product.weight && (
                <li>
                  <strong>Weight:</strong> {product.weight}g
                </li>
              )}
              {product.servings && (
                <li>
                  <strong>Servings:</strong> {product.servings}
                </li>
              )}
            </ul>
          </div>

          <ToggleSection
            title="Description"
            content={product.description}
            isOpen={isDescriptionOpen}
            toggle={toggleDescription}
          />
          <ToggleSection
            title="Ingredients"
            content={product.ingredients}
            isOpen={isIngredientsOpen}
            toggle={toggleIngredients}
          />
          <ToggleSection
            title="Directions"
            content={product.directions}
            isOpen={isDirectionsOpen}
            toggle={toggleDirections}
          />
          <ToggleSection
            title="Warnings"
            content={product.warnings}
            isOpen={isWarningsOpen}
            toggle={toggleWarnings}
          />

          {isAuthor ? (
            <>
              <Link to={`/${productId}/edit`}>
                <button className="w-full mt-4 py-3 bg-yellow-500 text-white font-semibold text-lg rounded-lg hover:bg-yellow-600 focus:outline-none">
                  Edit
                </button>
              </Link>

              <button
                className="w-full mt-4 py-3 bg-red-500 text-white font-semibold text-lg rounded-lg hover:bg-red-600 focus:outline-none"
                onClick={() => deleteProduct(productId)}
              >
                Delete
              </button>
            </>
          ) : (
            <button
              className="w-full mt-4 py-3 bg-blue-500 text-white font-semibold text-lg rounded-lg hover:bg-blue-600 focus:outline-none"
              onClick={addToCartHandler}
            >
              Add to cart
            </button>
          )}
        </div>
      </div>

      <div className="max-w-screen-lg m-auto mt-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4" />

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Leave a Rating:
          </h3>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((value) => (
              <span
                key={value}
                onClick={() => setRating(value)}
                className={`cursor-pointer text-3xl ${
                  rating >= value ? "text-yellow-500" : "text-gray-300"
                }`}
              >
                ★
              </span>
            ))}
          </div>
          <form onSubmit={submitHandler}>
            <textarea
              className="w-full mt-2 p-2 border border-gray-300 rounded-md"
              placeholder="Write a comment (optional)"
              name="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              type="submit"
              className="w-full mt-4 py-3 bg-blue-500 text-white font-semibold text-lg rounded-lg hover:bg-blue-600"
            >
              Submit Vote
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-screen mx-auto p-4 mt-12">
        <h2 className="text-3xl text-center font-semibold text-gray-800 mb-6">
          Customer Reviews
        </h2>
        <div className="m-auto rounded-lg max-w-screen-lg">
          <div className="space-y-6">
            {reviews?.map((review, index) => (
              <ReviewCard
                key={review._id || index}
                review={review}
                user={review.user}
                handleLike={() => handleLike(review._id)}
                handleDislike={() => handleDislike(review._id)}
                userVote={userVote[review._id]}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
