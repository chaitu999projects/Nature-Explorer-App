let formELe = document.getElementById("formOfTheNature");
let userEle = document.getElementById("userInput");
let searchRes = document.getElementById("searchResult");
let showMoreImages = document.getElementById("moreImgs");

let accesKey = "sj4s3hlLSU2lW_nzzwls_2B5rDHVdQRaEqqoIHCH_Y0";
let page = 1;
let keyWord = "";

async function searchImages() {
  keyWord = userEle.value;
  if (!keyWord.trim()) return;

  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyWord}&client_id=${accesKey}&per_page=12`;

  try {
    let response = await fetch(url);
    let data = await response.json();
    let results = data.results;

    if (page === 1) {
      searchRes.innerHTML = "";
    }

    if (results.length === 0) {
      searchRes.innerHTML =
        "<p style='text-align:center; grid-column:1/-1; color:#e74c3c;'>No images found. Try a different search term.</p>";
      showMoreImages.style.display = "none";
      return;
    }

    results.map((res) => {
      let ancherTag = document.createElement("a");
      ancherTag.href = res.links.html;
      ancherTag.target = "_blank";
      ancherTag.title = res.alt_description || "Nature image";

      let imgEle = document.createElement("img");
      imgEle.src = res.urls.regular;
      imgEle.alt = res.alt_description || "Nature image";

      ancherTag.appendChild(imgEle);
      searchRes.appendChild(ancherTag);
    });

    showMoreImages.style.display = "block";

    // Smooth scroll to results
    searchRes.scrollIntoView({ behavior: "smooth" });
  } catch (error) {
    console.error("Error fetching images:", error);
    searchRes.innerHTML =
      "<p style='text-align:center; grid-column:1/-1; color:#e74c3c;'>Failed to load images. Please try again later.</p>";
    showMoreImages.style.display = "none";
  }
}

formELe.addEventListener("submit", (e) => {
  e.preventDefault();
  page = 1;
  searchImages();
});

showMoreImages.addEventListener("click", () => {
  page++;
  searchImages();
});
