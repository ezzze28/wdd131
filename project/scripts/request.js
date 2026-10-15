const songsDatabase = [
  { id: 1, title: "BbY WOW", artist: "KAROL G, Judeline, rusowsky" },
  { id: 2, title: "Nicole Kidman", artist: "ADÉLA" },
  { id: 3, title: "Ain't In LA", artist: "ADÉLA" },
  { id: 4, title: "the cure", artist: "Olivia Rodrigo" },
  { id: 5, title: "Earrings", artist: "Malcolm Todd" },
  { id: 6, title: "Stop The Wedding!", artist: "Ashe" },
  { id: 7, title: "stupid song", artist: "Olivia Rodrigo" },
  { id: 8, title: "Beauty And A Beat", artist: "Justin Bieber, Nicki Minaj" },
  { id: 9, title: "Die With A Smile", artist: "Lady Gaga, Bruno Mars" },
  { id: 10, title: "The One That Got Away", artist: "Katy Perry" },
  { id: 11, title: "Patient Zero", artist: "Taylor Swift" },
  { id: 12, title: "back to friends", artist: "sombr" },
  { id: 13, title: "Sweater Weather", artist: "The Neighbourhood" },
  { id: 14, title: "Love Me Not", artist: "Ravyn Lenae" },
  { id: 15, title: "Great Expectation", artist: "SIENNA SPIRO" },
  { id: 16, title: "Iris", artist: "The Goo Goo Dolls" },
  { id: 17, title: "Man I Need", artist: "Olivia Dean" },
  { id: 18, title: "Self Aware", artist: "Temper City" },
  { id: 19, title: "Babydoll", artist: "Dominic Fike" },
  { id: 20, title: "Loser", artist: "Tame Impala" },
  { id: 21, title: "SWIM", artist: "BTS" },
  { id: 22, title: "Treat You Better", artist: "Shawn Mendes" },
  {
    id: 23,
    title: "Just Give Me a Reason (feat. Nate Ruess)",
    artist: "P!nk, Nate Ruess",
  },
  {
    id: 24,
    title: "Cinderella (feat. Ty Dolla $ign)",
    artist: "Mac Miller, Ty Dolla $ign",
  },
  { id: 25, title: "Sailor Song", artist: "Gigi Perez" },
  { id: 26, title: "Training Season", artist: "Dua Lipa" },
  { id: 27, title: "hate that i made you love me", artist: "Ariana Grande" },
  {
    id: 28,
    title: "One Of The Girls (with JENNIE, Lily Rose Depp)",
    artist: "The Weeknd, JENNIE, Lily-Rose Depp",
  },
  { id: 29, title: "End of Beginning", artist: "Djo" },
  { id: 30, title: "Billie Jean", artist: "Michael Jackson" },
  { id: 31, title: "BIRDS OF A FEATHER", artist: "Billie Eilish" },
  { id: 32, title: "Choosin' Texas", artist: "Ella Langley" },
  { id: 33, title: "Ordinary", artist: "Alex Warren" },
  { id: 34, title: "Wonderwall - Remastered", artist: "Oasis" },
  { id: 35, title: "Mr. Brightside", artist: "The Killers" },
  { id: 36, title: "drop dead", artist: "Olivia Rodrigo" },
  { id: 37, title: "The Fate of Ophelia", artist: "Taylor Swift" },
  { id: 38, title: "Dai Dai", artist: "Shakira, Burna Boy" },
  { id: 39, title: "Sign of the Times", artist: "Harry Styles" },
  { id: 40, title: "I Wanna Be Yours", artist: "Arctic Monkeys" },
  { id: 41, title: "Creep", artist: "Radiohead" },
  { id: 42, title: "Risk It All", artist: "Bruno Mars" },
  { id: 43, title: "Starboy", artist: "The Weeknd, Daft Punk" },
  { id: 44, title: "Every Breath You Take", artist: "The Police" },
  { id: 45, title: "Yellow", artist: "Coldplay" },
  { id: 46, title: "So Easy (To Fall In Love)", artist: "Olivia Dean" },
  { id: 47, title: "WILDFLOWER", artist: "Billie Eilish" },
  { id: 48, title: "Die On This Hill", artist: "SIENNA SPIRO" },
  { id: 49, title: "The Night We Met", artist: "Lord Huron" },
  {
    id: 50,
    title: "Cuando No Era Cantante RMX - Remix",
    artist: "El Bogueto, Anuel AA, Fuerza Regida, Yung Beef",
  },
];

const songSearchInput = document.getElementById("songSearch");
const songListContainer =
  document.getElementById("songListContainer") || createSongListContainer();
const requestForm = document.getElementById("requestForm");
const requestsList = document.getElementById("requestsList");

const modalOverlay = document.getElementById("modalOverlay");
const modalMessage = document.getElementById("modalMessage");
const closeModalBtn = document.getElementById("closeModalBtn");

let selectedSongValue = "";

function createSongListContainer() {
  const searchGroup = songSearchInput.closest(".form-group");
  const container = document.createElement("div");
  container.id = "songListContainer";
  container.className = "selectable-songs-list";
  searchGroup.parentNode.insertBefore(container, searchGroup.nextSibling);
  return container;
}

function renderSongList(songsToDisplay) {
  songListContainer.innerHTML = "";

  songsToDisplay.forEach((song) => {
    const songString = `${song.title} - ${song.artist}`;
    const item = document.createElement("div");
    item.className = "song-option-item";
    if (selectedSongValue === songString) {
      item.classList.add("selected");
    }

    item.innerHTML = `<strong>${song.title}</strong> <span>${song.artist}</span>`;

    item.addEventListener("click", () => {
      document
        .querySelectorAll(".song-option-item")
        .forEach((el) => el.classList.remove("selected"));
      item.classList.add("selected");
      selectedSongValue = songString;
    });

    songListContainer.appendChild(item);
  });
}

function filterSongs() {
  const query = songSearchInput.value.toLowerCase();
  const filtered = songsDatabase.filter(
    (song) =>
      song.title.toLowerCase().includes(query) ||
      song.artist.toLowerCase().includes(query),
  );
  renderSongList(filtered);
}

function getStoredRequests() {
  return JSON.parse(localStorage.getItem("voltPantherRequests")) || [];
}

function saveRequest(newReq) {
  const requests = getStoredRequests();
  requests.unshift(newReq);
  localStorage.setItem("voltPantherRequests", JSON.stringify(requests));
}

function displayRecentRequests() {
  const requests = getStoredRequests();
  requestsList.innerHTML = "";

  if (requests.length === 0) {
    requestsList.innerHTML = "<p>No requests yet. Be the first one!</p>";
    return;
  }

  requests.slice(0, 5).forEach((req) => {
    const card = document.createElement("div");
    card.className = "request-card";
    card.innerHTML = `
            <h4>${req.song}</h4>
            <p>Requested by: <strong>${req.name}</strong></p>
            ${req.shoutout ? `<p class="shoutout">"${req.shoutout}"</p>` : ""}
        `;
    requestsList.appendChild(card);
  });
}

if (songSearchInput) {
  songSearchInput.addEventListener("input", filterSongs);
}

if (requestForm) {
  requestForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const listenerName = document.getElementById("listenerName").value.trim();
    const shoutoutText = document.getElementById("shoutout").value.trim();

    if (!selectedSongValue) {
      alert("Please select a song from the list by clicking on it.");
      return;
    }

    const requestData = {
      name: listenerName,
      song: selectedSongValue,
      shoutout: shoutoutText,
      date: new Date().toLocaleTimeString(),
    };

    saveRequest(requestData);
    displayRecentRequests();

    modalMessage.textContent = `Your request for "${selectedSongValue}" has been submitted successfully, ${listenerName}!`;
    modalOverlay.classList.remove("hidden");

    requestForm.reset();
    selectedSongValue = "";
    renderSongList(songsDatabase);
  });
}

if (closeModalBtn) {
  closeModalBtn.addEventListener("click", () => {
    modalOverlay.classList.add("hidden");
  });
}

if (modalOverlay) {
  modalOverlay.addEventListener("click", (event) => {
    if (event.target === modalOverlay) {
      modalOverlay.classList.add("hidden");
    }
  });
}

const lastModifiedSpan = document.getElementById("lastModified");
if (lastModifiedSpan) {
  lastModifiedSpan.textContent = document.lastModified;
}

renderSongList(songsDatabase);
if (requestsList) {
  displayRecentRequests();
}
