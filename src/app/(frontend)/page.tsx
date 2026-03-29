import Category from "@/components/frontend/home/category/category";
import Hero from "@/components/frontend/home/hero/hero";
import UpComing from "@/components/frontend/home/up-coming/up-coming";

const HomePage = () => {
  return (
    <section className="">
      <Hero />
      <UpComing />
      <Category />
    </section>
  );
};

export default HomePage;
