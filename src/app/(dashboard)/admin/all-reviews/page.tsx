import AllReview from "@/components/admin/all-review/all-review";

export const metadata = {
  title: "All Reviews ",
  description: "Manage and view all reviews in the admin dashboard.",
};

const AllReviewPage = () => {
  return (
    <section>
      <AllReview />
    </section>
  );
};

export default AllReviewPage;
