export const initArtistCaptureCamera = () => {
  const liveStreamVideo = document.querySelector("#video");
  const captureStreamCanvas = document.querySelector("#captureCanvas");
  const capturedImageImg = document.querySelector("#new-img-displayed");
  const captureImageBtn = document.querySelector("#captureImageBtn");
  const capturedImgWrapeer = document.querySelector(
    ".add-image__displayed-img-wrapper"
  );
  const editNewImgUrl = document.getElementById("edit-new-item-img-url");

  // navigor MDN
  navigator.mediaDevices
    .getUserMedia({
      video: {
        facingMode: {
          ideal: "environment",
        },
      },
    })
    .then((stream) => {
      liveStreamVideo.srcObject = stream;
    })
    .catch((err) => {
      console.log(err);
    });

  liveStreamVideo.addEventListener("canplay", function () {
    captureStreamCanvas.width = liveStreamVideo.videoWidth;
    captureStreamCanvas.height = liveStreamVideo.videoHeight;
  });

  captureImageBtn.addEventListener("click", function () {
    const ctx = captureStreamCanvas.getContext("2d");
    ctx.drawImage(liveStreamVideo, 0, 0);
    const imgUrl = captureStreamCanvas.toDataURL("image/png");

    capturedImageImg.src = imgUrl;
    capturedImgWrapeer.style = "display:block";
    location.hash = "#edit-new-item";
    editNewImgUrl.value = imgUrl;

    liveStreamVideo.srcObject.getTracks().forEach((track) => track.stop());
  });
};
