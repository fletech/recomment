import FeedbackItem from "./FeedbackItem";
import { Spinner } from "../Spinner";
import ErrorMessage from "../ErrorMessage";
import { TFeedbackItem } from "../../lib/types";

type TFeedbackListProps = {
  isLoading: boolean;
  feedbackItems: TFeedbackItem[];
  error: string;
};

export default function FeedbackList({
  isLoading,
  error,
  feedbackItems,
}: TFeedbackListProps) {
  // const [feedbackItems, setFeedbackItems] = useState<TFeedbackItem[]>([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState("");

  // const handleAddToList = (text:string) => {
  //   const companyName = text
  //     .split(" ")
  //     .find((word: string) => word.includes("#"))!
  //     .substring(1);
  //   const newItem: TFeedbackItem = {
  //     id: useId(),
  //     upvoteCount: 0,
  //     badgeLetter: companyName.substring(0, 1).toUpperCase(),
  //     company: companyName,
  //     text: text,
  //     daysAgo: 0,
  //   };

  //   setFeedbackItems([newItem, ...feedbackItems]);
  // };

  // useEffect(() => {
  //   setIsLoading(true);

  //   const fetchFeedbackItems = async () => {
  //     try {
  //       const response = await fetch(
  //         "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks"
  //       );

  //       if (!response.ok) {
  //         setError("Failed to fetch feedback items");
  //         setIsLoading(false);
  //         return;
  //       }

  //       const data = await response.json();
  //       setFeedbackItems(data.feedbacks);
  //     } catch (error) {
  //       setError("Something went wrong. Please try again later.");
  //       setIsLoading(false);
  //       return;
  //     }
  //     setIsLoading(false);
  //   };

  //   fetchFeedbackItems();

  //   // fetch(
  //   //   "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks"
  //   // )
  //   //   .then((response) => {
  //   //     if (!response.ok) {
  //   //       throw new Error("Failed to fetch feedback items");
  //   //     }
  //   //     return response.json();
  //   //   })
  //   //   .then((data) => {
  //   //     setIsLoading(false);
  //   //     setFeedbackItems(data.feedbacks);
  //   //   })
  //   //   .catch(() => {
  //   //     setError("Something went wrong. Please try again later.");
  //   //     setIsLoading(false);
  //   //   });
  // }, []);

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
