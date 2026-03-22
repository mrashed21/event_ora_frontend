import Footer from "@/components/common/footer/footer";
import Navbar from "@/components/common/nav-bar/navbar";

const FrontendLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <Navbar />
      {children}
      <Footer />
    </main>
  );
};

export default FrontendLayout;
