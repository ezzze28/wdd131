let reviewCount = Number(localStorage.getItem("reviewCount")) || 0;
reviewCount = reviewCount + 1;
localStorage.setItem("reviewCount", reviewCount);

document.getElementById("review-count").textContent = reviewCount;

const currentYear = new Date().getFullYear();

const currentYearSpan = document.getElementById("currentyear");
if (currentYearSpan) {
  currentYearSpan.textContent = new Date().getFullYear();
}

const lastModifiedParagraph = document.getElementById("lastModified");
if (lastModifiedParagraph) {
  lastModifiedParagraph.textContent = `Last Modification: ${document.lastModified}`;
}
