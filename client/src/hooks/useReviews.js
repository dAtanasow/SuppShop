import { useEffect, useState } from "react";
import reviewsApi from "../аpi/reviews-api";
import { useAuthContext } from "../context/AuthContext";
import { useGetOneProduct } from "./useProducts";
import userApi from "../аpi/auth-api";

export function useGetReview(reviewId) {
    const { userId } = useAuthContext();
    const [review, setReview] = useState({
        likes: 0,
        dislikes: 0,
        text: "",
        createdAt: "",
    });
    const [user, setUser] = useState(null);
    const [userVote, setUserVote] = useState(null);
    useEffect(() => {
        const fetchReview = async () => {
            if (!reviewId) return;

            try {
                const fetchedReview = await reviewsApi.getOne(reviewId);
                const fetchedUser = await userApi.getUser(fetchedReview.userId);

                setReview({
                    ...fetchedReview,
                    likeCount: fetchedReview.likeCount ?? fetchedReview.likes?.length ?? 0,
                    dislikeCount: fetchedReview.dislikeCount ?? fetchedReview.dislikes?.length ?? 0,
                });

                setUser({
                    username: fetchedUser.username,
                    avatar: fetchedUser.img,
                });

                setUserVote(
                    fetchedReview.likes.includes(userId)
                        ? "like"
                        : fetchedReview.dislikes.includes(userId)
                            ? "dislike"
                            : null
                );

            } catch (error) {
                console.error("Error fetching review:", error);
                alert("Error fetching the review.");
            }
        }
        fetchReview();
    }, [reviewId, userId]);



    const handleLike = async () => {
        try {
            const updatedReview = await reviewsApi.like(reviewId);
            setReview((prevReview) => ({
                ...prevReview,
                ...updatedReview,
                likeCount: updatedReview.likeCount ?? updatedReview.likes?.length ?? prevReview.likeCount,
                dislikeCount: updatedReview.dislikeCount ?? updatedReview.dislikes?.length ?? prevReview.dislikeCount,
            }));


            setUserVote((prevVote) => (prevVote === "like" ? null : "like"));
        } catch (error) {
            console.error(error);
            alert("Error liking the review.");
        }
    };

    const handleDislike = async () => {
        try {
            const updatedReview = await reviewsApi.dislike(reviewId);
            setReview((prevReview) => ({
                ...prevReview,
                ...updatedReview,
                likeCount: updatedReview.likeCount ?? updatedReview.likes?.length ?? prevReview.likeCount,
                dislikeCount: updatedReview.dislikeCount ?? updatedReview.dislikes?.length ?? prevReview.dislikeCount,
            }));

            setUserVote((prevVote) => (prevVote === "dislike" ? null : "dislike"));
        } catch (error) {
            console.error(error);
            alert("Error disliking the review.");
        }
    };

    return { review, user, userVote, handleLike, handleDislike };
}


export function useAddReview(productId) {
    const { userId } = useAuthContext();
    const [error, setError] = useState(null);
    const [product, setProduct] = useGetOneProduct(productId);

    const hasVoted = product?.reviews?.some(
        (review) => review?.authorId === userId
    );

    const addReview = async (rating, comment) => {
        if (!userId) {
            setError("You need to log in to vote.");
            return;
        }
        if (hasVoted) {
            setError("You have already voted for this product.");
            return;
        }
        if (!rating) {
            setError("Please select a rating");
            return;
        }

        try {
            const reviewData = {
                rating,
                comment: comment ? comment : ""
            };
            const updatedProduct = await reviewsApi.create(productId, reviewData);
            setProduct(updatedProduct);
            alert("Thank you for your review!");
        } catch (error) {
            setError(error.message);
        }
    }

    return {
        addReview,
        error,
        product
    };
}