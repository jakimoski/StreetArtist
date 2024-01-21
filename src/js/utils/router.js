import { initArtistHomePage } from "../artistHomePage.js";
import { initLandingPage } from "../landingPage.js";
import { initVisitorListing } from "../visitorListing.js";
import { initVisitorHomePage } from "../visitorHomePage.js";
import { initArtistItemsPage } from "../artistItemsPage.js";
import {
  landingNavigation,
  artistNavigation,
  userNavigation,
} from "../navigation.js";
import { initAuctionPage } from "../auctionPage.js";
import { initEditNewitems } from "../editNewItems.js";
import { initArtistCaptureCamera } from "../captureImage.js";

// router
export const handleRouter = () => {
  // Get curent hash or if none set to landig page
  const hash = location.hash === "" ? "#landingPage" : location.hash;

  // Hide all pages
  const allPages = document.querySelectorAll(".page");
  allPages.forEach((page) => (page.style.display = "none"));
  // Show page with curent hash
  document.querySelector(hash).style.display = "block";
  // Always start at top of the page
  window.scrollTo(0, 0);

  switch (hash) {
    case "#landingPage":
      landingNavigation();
      initLandingPage();
      break;
    case "#visitor":
      userNavigation();
      initVisitorHomePage();
      break;
    case "#visitorListing":
      userNavigation();
      initVisitorListing();
      break;
    case "#artists":
      artistNavigation();
      initArtistHomePage();
      break;
    case "#artistsItems":
      artistNavigation();
      initArtistItemsPage();
      break;
    case "#edit-new-item":
      artistNavigation();
      initEditNewitems();
      break;
    case "#capture-image":
      artistNavigation();
      initArtistCaptureCamera();
      break;

    case "#auction":
      userNavigation();
      initAuctionPage();
      break;
    default:
      break;
  }
};
