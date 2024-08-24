import HeroSection from "@/components/self-made/HeroSection";
import RecentSearches from "@/components/self-made/RecentSearches";
import InterestedProperties from "@/components/self-made/InterestedProperties";
import OffersSection from "@/components/self-made/OffersSection";
import PropertyTypes from "@/components/self-made/PropertyTypes";
import SearchBar from "@/components/self-made/SearchBar";

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <SearchBar />
      <div className="px-64 mt-10 space-y-10">
        <RecentSearches />
        <InterestedProperties />
        <OffersSection />
        <PropertyTypes />
      </div>
    </div>
  );
};

export default HomePage;
