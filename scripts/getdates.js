const currentYearSpan = document.getElementById("currentyear");
const today = new Date();
currentYearSpan.textContent = today.getFullYear();

const lastModifiedParagraph = document.getElementById("lastModified");
lastModifiedParagraph.textContent = `Last Modification: ${document.lastModified}`;
