import { getCurrentArtist, getItemsList } from "./src/js/utils/localstorage.js";
import { getFilterUsers } from "./src/js/utils/requests.js";
import { handleRouter } from "./src/js/utils/router.js";
import { initEventListeners } from "./src/js/utils/eventListeners.js";

window.addEventListener("hashchange", handleRouter);
window.addEventListener("DOMContentLoaded", async () => {
  let isEdit = false;

  const currentArtist = getCurrentArtist();
  const allArtists = await getFilterUsers();

  getItemsList();
  handleRouter();
  initEventListeners(allArtists);
});
