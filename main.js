import { initArtistHomePage } from "./src/js/artistHomePage.js";
import { initLandingPage } from "./src/js/landingPage.js";
import { initVisitorListing } from "./src/js/visitorListing.js";
import { initVisitorHomePage } from "./src/js/visitorHomePage.js";
import { initArtistItemsPage } from "./src/js/artistItemsPage.js";
import {
  landingNavigation,
  artistNavigation,
  userNavigation,
} from "./src/js/navigation.js";
import { initAuctionPage } from "./src/js/auctionPage.js";
// router
function handleRouter() {
  const hash = location.hash === "" ? "#landingPage" : location.hash; // #landingPage
  // Hide all pages
  const allPages = document.querySelectorAll(".page");
  allPages.forEach((page) => (page.style.display = "none"));
  // Show curent has page
  document.querySelector(hash).style.display = "block";

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
    case "#artistsCaptureCamera":
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
}

["hashchange", "load"].forEach((ev) =>
  window.addEventListener(ev, handleRouter)
);
