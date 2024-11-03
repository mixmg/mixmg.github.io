import { updateBlog } from "../editor/updateBlog.js";

function handleImageUpload(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const img = new Image();
      img.onload = function () {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = 1280;
        canvas.height = 720;

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        const scaledImageUrl = canvas.toDataURL("image/jpeg");
        insertImageToBlog(scaledImageUrl);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}

function insertImageToBlog(imageUrl) {
  const imgElement = document.createElement("img");
  imgElement.src = imageUrl;
  imgElement.style.width = "100%"; // Ustaw szerokość na 100% dla responsywności
  imgElement.alt = "Dodany obraz"; // Dodaj opis alternatywny
  document.getElementById("postContent").appendChild(imgElement);
}

// Pogrubienie
document.getElementById("bold").addEventListener("click", function () {
  document.execCommand("bold");
});

// Kursywa
document.getElementById("italic").addEventListener("click", function () {
  document.execCommand("italic");
});

// Link
document.getElementById("link").addEventListener("click", function () {
  const url = prompt("Podaj URL linku:");
  if (url) {
    document.execCommand("createLink", false, url);
  }
});

// Dodaj obraz
document.getElementById("addImage").addEventListener("click", function () {
  const imageUrl = document.getElementById("imageUrl").value;
  if (imageUrl) {
    insertImageToBlog(imageUrl);
    document.getElementById("imageUrl").value = ""; // Czyść pole po dodaniu
  } else {
    alert("Proszę podać URL obrazu.");
  }
});

// Zapisz post
document
  .getElementById("postForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Zatrzymaj domyślne zachowanie formularza

    const title = document.getElementById("postTitle").value;
    const content = document.getElementById("postContent").innerHTML; // Używaj innerHTML do pobierania treści

    // Wywołaj funkcję updateBlog, aby zaktualizować bloga
    updateBlog(title, content);
    document.getElementById("message").innerText = "Post zapisany pomyślnie!";
  });
