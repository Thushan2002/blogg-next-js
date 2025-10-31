import BlogItem from "@/components/BlogItem";
import { BlogList } from "@/components/BlogList";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function Home() {
  return (
    <>
      <div className="p-5 md:px-12 lg:px-24">
        <Header />
        <BlogList />
      </div>
      <Footer />
    </>
  );
}
