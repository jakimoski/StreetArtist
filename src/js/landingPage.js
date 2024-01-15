import { setCurrentArtist, allArtists } from "./globals.js";

export let currentArtist = "";

const artistsSelect = document.querySelector("#artist-select");
const joinAsVisitorContainer = document.querySelector(".join--visitor");

export function initLandingPage() {
  // Display all artist in select
  allArtists.forEach((user) => {
    if (!(artistsSelect.children.length > allArtists.length))
      artistsSelect.innerHTML += `<option value="${user}">${user}</option>`;
  });
  // Select what artist is selected and redirect to artist home page
  artistsSelect.addEventListener("change", (e) => {
    setCurrentArtist(e.currentTarget.value);

    location.hash = "artists";
  });

  // Redirect users to visitor home page and reset value of the artist select
  joinAsVisitorContainer.addEventListener("click", function () {
    setTimeout(() => {
      location.hash = "visitor";
    }, 500);
  });

  artistsSelect.value = "";
}
