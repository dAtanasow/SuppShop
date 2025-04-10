import { toast } from 'react-toastify';

import { useCallback, useEffect, useState } from "react";
import reviewsApi from "../аpi/reviews-api";
import { useAuthContext } from "../context/AuthContext";
import userApi from "../аpi/auth-api";

export function useAddReview(productId, refetchReviews) {
    const { userId } = useAuthContext();
    const [loading, setIsLoading] = useState(false);

    const addReview = async (rating, comment) => {
        if (!userId) {
            toast.info("You need to log in to vote.");
            return;
        }
        if (!rating) {
            toast.warn("Please select a rating");
            return;
        }
        setIsLoading(true);
        try {
            const reviews = await reviewsApi.getAll(productId);

            const existingReview = reviews.find(review => review.userId._id === userId);
            if (existingReview) {
                toast.error("You have already posted a review for this product.");
                setIsLoading(false);
                return;
            }
            const reviewData = { rating, comment: comment || "" };
            await reviewsApi.create(productId, reviewData);
            setIsLoading(false);
            toast.success("Thank you for your review!");
            await refetchReviews();
        } catch (error) {
            console.log("Error adding review:", error);
            setIsLoading(false);
            if (error.message === 'You have already posted a review for this product.') {
                toast.error("You have already posted a review for this product.");
            } else {
                toast.error('Error adding your review.');
            }
        }
    }

    return {
        addReview,
        loading,
    };
}


export function useGetAllReviews(productId) {
    const { userId } = useAuthContext();
    const [userVote, setUserVote] = useState({});
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const fetchReviews = useCallback(async () => {
        if (!productId) return;
        try {
            setLoading(true);
            const fetchedReviews = await reviewsApi.getAll(productId);
            const updatedReviews = await Promise.all(fetchedReviews.map(async (review) => {
                const userId = review.userId._id;
                const fetchedUser = await userApi.getUser(userId);
                return {
                    ...review,
                    likeCount: review.likeCount ?? review.likes?.length ?? 0,
                    dislikeCount: review.dislikeCount ?? review.dislikes?.length ?? 0,
                    user: {
                        username: fetchedUser.username,
                        avatar: fetchedUser.img,
                    },
                };
            }));

            setReviews(updatedReviews);
        } catch (err) {
            setError("Error fetching reviews.");
            console.error("Error fetching reviews:", err);
        } finally {
            setLoading(false);
        }
    }, [productId]);


    useEffect(() => {
        fetchReviews();
    }, [productId, userId, fetchReviews]);

    const handleLike = async (reviewId) => {
        try {
            const updatedReview = await reviewsApi.like(reviewId);
            setReviews((prevReviews) =>
                prevReviews.map((review) =>
                    review._id === reviewId
                        ? { ...review, likeCount: updatedReview.likeCount, dislikeCount: updatedReview.dislikeCount }
                        : review
                )
            );

            setUserVote((prevVotes) => ({
                ...prevVotes,
                [reviewId]: prevVotes[reviewId] === 'like' ? null : 'like',
            }));
        } catch (error) {
            console.error('Error liking the review:', error);
            alert('Error liking the review.');
        }
    };

    const handleDislike = async (reviewId) => {
        try {
            const updatedReview = await reviewsApi.dislike(reviewId);
            setReviews((prevReviews) =>
                prevReviews.map((review) =>
                    review._id === reviewId
                        ? { ...review, likeCount: updatedReview.likeCount, dislikeCount: updatedReview.dislikeCount }
                        : review
                )
            );

            setUserVote((prevVotes) => ({
                ...prevVotes,
                [reviewId]: prevVotes[reviewId] === 'dislike' ? null : 'dislike',
            }));
        } catch (error) {
            console.error('Error disliking the review:', error);
            alert('Error disliking the review.');
        }
    };

    return { reviews, loading, error, handleLike, handleDislike, refetchReviews: fetchReviews, userVote };
}