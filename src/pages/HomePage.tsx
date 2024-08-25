import HeroSection from "@/components/self-made/HeroSection";
import RecentSearches from "@/components/self-made/RecentSearches";
import InterestedProperties from "@/components/self-made/InterestedProperties";
import OffersSection from "@/components/self-made/OffersSection";
import PropertyTypes from "@/components/self-made/PropertyTypes";
import SearchBar from "@/components/self-made/SearchBar";
import Header from "@/components/self-made/Header";
import Footer from "@/components/self-made/Footer";
import { HomePageCarousels } from "@/components/self-made/HomePageCarousels";

const HomePage = () => {
  return (
    <div>
      <Header />
      <HeroSection />
      <SearchBar />
      <div className="px-64 mt-10 space-y-10">
        <RecentSearches />
        <InterestedProperties />
        <OffersSection />
        <PropertyTypes />
        <HomePageCarousels />
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
