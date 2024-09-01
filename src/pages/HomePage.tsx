import HeroSection from "@/components/self-made/HeroSection";
import RecentSearches from "@/components/self-made/RecentSearches";
import InterestedProperties from "@/components/self-made/InterestedProperties";
import OffersSection from "@/components/self-made/OffersSection";
import SearchBar from "@/components/self-made/SearchBar";
import BrowseByPropertyTypeCarucel from "@/components/self-made/BrowseByPropertyTypeCarucel";
import { HomePageCarousels } from "@/components/self-made/HomePageCarousels";
import Banner from "@/components/self-made/HomePageBanner";

const HomePage = () => {
  const recentSearches = JSON.parse(
    localStorage.getItem("recentSearches") || "[]"
  );

  return (
    <div>
      {/* <Header /> */}
      <HeroSection />
      <SearchBar />
      <div className="mt-10 space-y-10">
        {recentSearches.length > 0 && <RecentSearches />}

        <InterestedProperties />
        <OffersSection />

        <HomePageCarousels />
        <BrowseByPropertyTypeCarucel />
        <Banner />
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default HomePage;
