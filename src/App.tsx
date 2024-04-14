import Footer from "./components/layout/Footer";
import Container from "./components/layout/Container";
import HashtagList from "./components/HashtagList";
import { useEffect, useId, useState } from "react";
import { TFeedbackItem } from "./lib/types";

function App() {
  const [feedbackItems, setFeedbackItems] = useState<TFeedbackItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const newId = useId();

  const handleAddToList = async (text: string) => {
    const companyName = text
      .split(" ")
      .find((word: string) => word.includes("#"))!
      .substring(1);
    const newItem: TFeedbackItem = {
      id: newId,
      upvoteCount: 0,
      badgeLetter: companyName.substring(0, 1).toUpperCase(),
      company: companyName,
      text: text,
      daysAgo: 0,
    };

    setFeedbackItems([newItem, ...feedbackItems]);

    await fetch(
      "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      }
    );
  };

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
    <div className="app">
      <Footer />
      <Container
        feedbackItems={feedbackItems}
        isLoading={isLoading}
        error={error}
        handleAddToList={handleAddToList}
      />
      <HashtagList />
    </div>
  );
}

export default App;
