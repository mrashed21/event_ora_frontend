import ReceivedReview from "@/components/user/received-review/received-review";

export const metadata = {
  title: "My Reviews",
  description: "View and manage your reviews in the user dashboard.",
};

const ReceivedReviewsPage = () => {
  return (
    <section>
      <ReceivedReview />
    </section>
  );
};

export default ReceivedReviewsPage;
