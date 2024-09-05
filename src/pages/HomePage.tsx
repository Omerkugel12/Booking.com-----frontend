import React from "react";
import HeroSection from "@/components/self-made/HeroSection";
import RecentSearches from "@/components/self-made/RecentSearches";
import InterestedProperties from "@/components/self-made/InterestedProperties";
import OffersSection from "@/components/self-made/OffersSection";
import SearchBar from "@/components/self-made/SearchBar";
import BrowseByPropertyTypeCarucel from "@/components/self-made/BrowseByPropertyTypeCarucel";
import { HomePageCarousels } from "@/components/self-made/HomePageCarousels";
import Banner from "@/components/self-made/HomePageBanner";
import { useAuth } from "@/context/AuthContext"; // Adjust the import path as needed
import Header from "@/components/self-made/Header";
import Footer from "@/components/self-made/Footer";

const HomePage = () => {
  const { loggedInUser } = useAuth();

  const recentSearches = JSON.parse(
    localStorage.getItem("recentSearches") || "[]"
  );

  return (
    <div>
      <Header type="deafult" />
      <HeroSection />
      <div className="max-w-[1050px] 2xl:max-w-[1050px] w-full mx-auto">
        <SearchBar type="default" />
      </div>
      <div className="mt-10 space-y-10 max-w-[1050px] 2xl:max-w-[1050px] w-full mx-auto">
        {/* {recentSearches.length > 0 && <RecentSearches />} */}

        <InterestedProperties />
        <OffersSection />

        {loggedInUser && <HomePageCarousels />}
        <BrowseByPropertyTypeCarucel />
        <Banner />
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
