import { currentItemIndex, isEdit } from "./artistItemsPage.js";
import {
  getItemsList,
  getCurrentArtist,
  updateLocalStorage,
} from "./utils/localstorage.js";

const isEditTitle = document.getElementById("is-edit-title");
const isPublished = document.getElementById("is-published");
const editNewTitle = document.getElementById("edit-new-item-title");
const editNewDesc = document.getElementById("edit-new-item-desc");
const editNewType = document.getElementById("edit-new-item-type");
const editNewPrice = document.getElementById("edit-new-item-price");
const editNewImgUrl = document.getElementById("edit-new-item-img-url");
const addSaveBtn = document.querySelector(".add-save-btn");
const cancelItemBtn = document.querySelector(".cancel-btn");
const addImageWrapper = document.querySelector(
  ".add-image__displayed-img-wrapper"
);
const alertPopup = document.querySelector(".alert-popup");
const alertBtn = document.querySelector(".btn--alert");
const capturedImageImg = document.querySelector("#new-img-displayed");

export function initEditNewitems() {
  const itemsList = getItemsList();
  // Get curent artist
  const currentArtist = getCurrentArtist();

  // Alert popup set to display none
  alertPopup.style.display = "none";
  alertBtn.addEventListener("click", function () {
    alertPopup.style.display = "none";
  });
  //   Set input values from curent Item if edit mode
  if (isEdit) {
    isEditTitle.innerText = "Edit Item";
    addSaveBtn.innerText = "Save";
    editNewTitle.value = itemsList[currentItemIndex].title || "";
    isPublished.checked = itemsList[currentItemIndex].isPublished || "";
    editNewDesc.value = itemsList[currentItemIndex].description || "";
    editNewType.value = itemsList[currentItemIndex].type || "";
    editNewPrice.value = itemsList[currentItemIndex].price || "";
    editNewImgUrl.value = editNewImgUrl.value
      ? editNewImgUrl.value
      : itemsList[currentItemIndex].image;
    if (editNewImgUrl.value) {
      capturedImageImg.src = editNewImgUrl.value || "";
      addImageWrapper.style = "display:block";
    }
    addSaveBtn.removeEventListener("click", createNewItem);
    addSaveBtn.addEventListener("click", editCurentItem);
  } else {
    isEditTitle.innerText = "Add new Item";
    addSaveBtn.innerText = "Add new Item";
    addSaveBtn.removeEventListener("click", editCurentItem);
    addSaveBtn.addEventListener("click", createNewItem);
  }

  // Function to edit current Item from input values
  function editCurentItem(e) {
    e.stopImmediatePropagation();

    if (checkInputFieldsValue()) {
      itemsList[currentItemIndex].title = editNewTitle.value;
      itemsList[currentItemIndex].isPublished = isPublished.checked;
      itemsList[currentItemIndex].description = editNewDesc.value;
      itemsList[currentItemIndex].type = editNewType.value;
      itemsList[currentItemIndex].price = editNewPrice.value;
      itemsList[currentItemIndex].image = editNewImgUrl.value;
      updateLocalStorage("itemsList", itemsList);
      location.hash = "#artistsItems";
      clearInputFields();
    } else {
      alertPopup.style.display = "block";
    }
  }
  addImageWrapper.addEventListener("click", function () {
    location.hash = "#capture-image";
  });

  // Function to add new item

  function createNewItem(e) {
    e.stopImmediatePropagation();
    // New item id
    const newItemId = itemsList.slice(-1)[0].id + 1;
    // New item Obj
    const newItem = {
      id: newItemId,
      title: editNewTitle.value,
      description: editNewDesc.value,
      type: editNewType.value,
      image: editNewImgUrl.value,
      price: editNewPrice.value,
      artist: currentArtist,
      dateCreated: new Date().toISOString(),
      isPublished: isPublished.checked,
      isAuctioning: false,
      dateSold: "",
      priceSold: "",
    };
    if (checkInputFieldsValue()) {
      itemsList.push(newItem);
      updateLocalStorage("itemsList", itemsList);
      location.hash = "#artistsItems";
      clearInputFields();
    } else {
      alertPopup.style.display = "block";
    }
  }

  // Cancel btn event handler
  cancelItemBtn.addEventListener("click", function () {
    clearInputFields();
    location.hash = "#artistsItems";
  });
}

//Helper Function to clear all input fields
function clearInputFields() {
  addImageWrapper.style = "display:none";
  isPublished.checked = false;
  editNewDesc.value =
    editNewTitle.value =
    editNewType.value =
    editNewPrice.value =
    editNewImgUrl.value =
      "";
}
//Helper Function to check if all input fields have value
function checkInputFieldsValue() {
  let isValid = false;
  if (
    editNewTitle.value !== "" &&
    editNewDesc.value !== "" &&
    editNewType.value !== "" &&
    editNewPrice.value !== "" &&
    editNewImgUrl.value !== ""
  ) {
    isValid = true;
  }
  return isValid;
}
