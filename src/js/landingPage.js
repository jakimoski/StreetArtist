import { setCurrentArtist } from "../js/utils/localstorage.js";

const artistsSelect = document.querySelector("#artist-select");
const joinAsVisitorContainer = document.querySelector(".join--visitor");

export function initLandingPage() {
  // Select what artist is selected and redirect to artist home page
  artistsSelect.addEventListener("change", (e) => {
    setCurrentArtist(e.currentTarget.value);
    location.hash = "artists";
  });

  // Redirect users to visitor home page and reset value of the artist select
  joinAsVisitorContainer.addEventListener("click", function () {
    location.hash = "visitor";
    setCurrentArtist("Visitor");
    setTimeout(() => {
      // TODO add loading animations
    }, 500);
  });

  artistsSelect.value = "";
}
