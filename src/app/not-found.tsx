import NotFound from "@/components/custom/not-found";
export const metadata = {
  title: "Page Not Found",
  description: "The page you are looking for does not exist.",
};
const NotFoundPage = () => {
  return (
    <section>
      <NotFound />
    </section>
  );
};

export default NotFoundPage;
