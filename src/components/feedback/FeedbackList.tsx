import { useEffect, useState } from "react";
import FeedbackItem from "./FeedbackItem";
import { Spinner } from "../Spinner";
import ErrorMessage from "../ErrorMessage";

export default function FeedbackList() {
  const [feedbackItems, setFeedbackItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setIsLoading(true);

    const fetchFeedbackItems = async () => {
      try {
        const response = await fetch(
          "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks"
        );

        if (!response.ok) {
          setError("Failed to fetch feedback items");
          setIsLoading(false);
          return;
        }

        const data = await response.json();
        setFeedbackItems(data.feedbacks);
      } catch (error) {
        setError("Something went wrong. Please try again later.");
        setIsLoading(false);
        return;
      }
      setIsLoading(false);
    };

    fetchFeedbackItems();

    // fetch(
    //   "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks"
    // )
    //   .then((response) => {
    //     if (!response.ok) {
    //       throw new Error("Failed to fetch feedback items");
    //     }
    //     return response.json();
    //   })
    //   .then((data) => {
    //     setIsLoading(false);
    //     setFeedbackItems(data.feedbacks);
    //   })
    //   .catch(() => {
    //     setError("Something went wrong. Please try again later.");
    //     setIsLoading(false);
    //   });
  }, []);

  return (
    <ol className="feedback-list">
      {isLoading && <Spinner />}
      {error && <ErrorMessage message={error} />}
      {feedbackItems.map((item) => (
        <FeedbackItem key={item.id} feedbackItem={item} />
      ))}
    </ol>
  );
}
