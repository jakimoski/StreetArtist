const renderArtistSelect = (user, element) => {
  element.innerHTML += `<option value="${user}">${user}</option>`;
};

export async function getFilterUsers() {
  try {
    const artistSelect = document.querySelector("#artist-select");
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    const users = await res.json();

    const userList = (users ?? []).map((user) => user.name);
    localStorage.setItem("users", JSON.stringify(userList));

    // Display all artist in select
    artistSelect.innerHTML += `<option value="" selected>Select</option>`;
    userList.forEach((user) => renderArtistSelect(user, artistSelect));
    return userList;
  } catch (error) {
    console.log(error);
  }

  return null;
}
