import MyReview from "@/components/user/my-review/my-review";

export const metadata = {
  title: "My Reviews ",
  description: "View and manage your reviews in the user dashboard.",
};

const MyReviewsPage = () => {
  return (
    <section>
      <MyReview />
    </section>
  );
};

export default MyReviewsPage;
