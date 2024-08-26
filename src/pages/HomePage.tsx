import HeroSection from "@/components/self-made/HeroSection";
import RecentSearches from "@/components/self-made/RecentSearches";
import InterestedProperties from "@/components/self-made/InterestedProperties";
import OffersSection from "@/components/self-made/OffersSection";
import PropertyTypes from "@/components/self-made/PropertyTypes";
import SearchBar from "@/components/self-made/SearchBar";
import BrowseByPropertyTypeCarucel from "@/components/self-made/BrowseByPropertyTypeCarucel";
import { HomePageCarousels } from "@/components/self-made/HomePageCarousels";
import Banner from "@/components/self-made/HomePageBanner";

const HomePage = () => {
  return (
    <div>
      {/* <Header /> */}
      <HeroSection />
      <SearchBar />
      <div className="mt-10 space-y-10">
        <RecentSearches />
        <InterestedProperties />
        <OffersSection />
        <PropertyTypes />
        <HomePageCarousels />
        <BrowseByPropertyTypeCarucel />
        <Banner />
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default HomePage;
