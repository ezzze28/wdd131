const chartsData = [
  {
    name: "Top 50 - Global",
    spotifyId: "37i9dQZEVXbMDoHDwVN2tF",
    category: "Countries",
  },
  {
    name: "Top 50 - Uruguay",
    spotifyId: "37i9dQZEVXbMJJi3wgRbAy",
    category: "Countries",
  },
  {
    name: "Top 50 - Argentina",
    spotifyId: "37i9dQZEVXbMMy2roB9myp",
    category: "Countries",
  },
  {
    name: "Top 50 - Spain",
    spotifyId: "37i9dQZEVXbNFJfN1Vw8d9",
    category: "Countries",
  },
  {
    name: "Top 50 - United States",
    spotifyId: "37i9dQZEVXbLRQDuF5jeBp",
    category: "Countries",
  },
  {
    name: "Top 50 - Brazil",
    spotifyId: "37i9dQZEVXbMXbN3EUUhlg",
    category: "Countries",
  },
  {
    name: "Top 50 - United Kingdom",
    spotifyId: "37i9dQZEVXbO3qyFxbkOE1",
    category: "Countries",
  },
  {
    name: "Top 50 - Mexico",
    spotifyId: "37i9dQZEVXbO393J3wgL31",
    category: "Countries",
  },
  {
    name: "Top 50 - Chile",
    spotifyId: "37i9dQZEVXbL0GavIqMTeb",
    category: "Countries",
  },
  {
    name: "Top 50 - Colombia",
    spotifyId: "37i9dQZEVXbOa2lmxNORXQ",
    category: "Countries",
  },
  {
    name: "Top 50 - Peru",
    spotifyId: "37i9dQZEVXbJfdy5b0KP7W",
    category: "Countries",
  },
  {
    name: "Top 50 - Germany",
    spotifyId: "37i9dQZEVXbJiZcmkrIHGU",
    category: "Countries",
  },
  {
    name: "Top 50 - France",
    spotifyId: "37i9dQZEVXbIPWwFssbupI",
    category: "Countries",
  },
  {
    name: "Top 50 - Italy",
    spotifyId: "37i9dQZEVXbIQnj7RRhdSX",
    category: "Countries",
  },
  {
    name: "Top 50 - Japan",
    spotifyId: "37i9dQZEVXbKXQ4mDTEBXq",
    category: "Countries",
  },
  {
    name: "Top 50 - Canada",
    spotifyId: "37i9dQZEVXbKj23U1GF4IR",
    category: "Countries",
  },
  {
    name: "Top 50 - Australia",
    spotifyId: "37i9dQZEVXbJPcfkRz0wJ0",
    category: "Countries",
  },
  {
    name: "Top 50 - Netherlands",
    spotifyId: "37i9dQZEVXbKCF6dqVpDkS",
    category: "Countries",
  },
  {
    name: "Top 50 - Sweden",
    spotifyId: "37i9dQZEVXbLoATJ81JYXz",
    category: "Countries",
  },
  {
    name: "Top 50 - Portugal",
    spotifyId: "37i9dQZEVXbKyJS56d1pgi",
    category: "Countries",
  },

  {
    name: "Rock Classics",
    spotifyId: "37i9dQZF1DWXRqgorJj26U",
    category: "Genres",
  },
  {
    name: "Indie & Alternative",
    spotifyId: "37i9dQZF1EIdDnHQZhcBHB",
    category: "Genres",
  },
  { name: "Pop Hits", spotifyId: "37i9dQZF1DXcBWIGoYBM5M", category: "Genres" },
  {
    name: "Urban & Reggaeton",
    spotifyId: "37i9dQZF1DWXbMxJaAyCq1",
    category: "Genres",
  },
  {
    name: "Electronic & Dance",
    spotifyId: "37i9dQZF1DX3Kdv0IChEm9",
    category: "Genres",
  },
  {
    name: "Hip-Hop & Rap",
    spotifyId: "37i9dQZF1DX0XUsuxWHRQd",
    category: "Genres",
  },
  {
    name: "Jazz Essentials",
    spotifyId: "37i9dQZF1DX2iVTU1bf67i",
    category: "Genres",
  },
  {
    name: "Classical Essentials",
    spotifyId: "37i9dQZEVXbMDoHDwVN2tF",
    category: "Genres",
  },
  {
    name: "Metal Heavyweights",
    spotifyId: "37i9dQZF1DX9qNs32fujYe",
    category: "Genres",
  },
  { name: "R&B Hits", spotifyId: "37i9dQZF1DWXjo7kaCGuCU", category: "Genres" },
  {
    name: "Punk Rock",
    spotifyId: "37i9dQZF1EQqlvxWrOgFZm",
    category: "Genres",
  },
  {
    name: "K-Pop Top",
    spotifyId: "37i9dQZF1EQpesGsmIyqcW",
    category: "Genres",
  },
];

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("chart-search");
  const optionsList = document.getElementById("chart-options-list");
  const itemsContainer = document.getElementById("options-items-container");
  const spotifyPlayer = document.getElementById("spotify-player");
  const filterButtons = document.querySelectorAll(".filter-btn");

  let activeCategoryFilter = "";

  function renderOptions(filterText = "") {
    itemsContainer.innerHTML = "";

    const filteredData = chartsData.filter((item) => {
      const matchesText = item.name
        .toLowerCase()
        .includes(filterText.toLowerCase());
      const matchesCategory =
        activeCategoryFilter === "" || item.category === activeCategoryFilter;
      return matchesText && matchesCategory;
    });

    if (filteredData.length === 0) {
      const noResult = document.createElement("div");
      noResult.className = "select-option no-result";
      noResult.textContent = "No chart found";
      itemsContainer.appendChild(noResult);
      return;
    }

    filteredData.forEach((item) => {
      const option = document.createElement("div");
      option.className = "select-option";

      const title = document.createElement("span");
      title.className = "option-title";
      title.textContent = item.name;

      const categoryTag = document.createElement("span");
      categoryTag.className = "option-category";
      categoryTag.textContent = item.category;

      option.appendChild(title);
      option.appendChild(categoryTag);

      option.addEventListener("click", () => {
        searchInput.value = "";
        optionsList.classList.add("hidden");
        updatePlayer(item.spotifyId);
        renderOptions("");
      });

      itemsContainer.appendChild(option);
    });
  }

  function updatePlayer(spotifyId) {
    if (spotifyPlayer) {
      spotifyPlayer.src = `https://open.spotify.com/embed/playlist/${spotifyId}?utm_source=generator&theme=0`;
    }
  }

  searchInput.addEventListener("focus", () => {
    renderOptions(searchInput.value);
    optionsList.classList.remove("hidden");
  });

  searchInput.addEventListener("input", (e) => {
    renderOptions(e.target.value);
    optionsList.classList.remove("hidden");
  });

  filterButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.stopPropagation();
      const category = button.getAttribute("data-filter");

      if (activeCategoryFilter === category) {
        activeCategoryFilter = "";
        button.classList.remove("active");
      } else {
        filterButtons.forEach((btn) => btn.classList.remove("active"));
        activeCategoryFilter = category;
        button.classList.add("active");
      }

      searchInput.value = "";
      renderOptions("");
    });
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".compact-search-container")) {
      optionsList.classList.add("hidden");
    }
  });

  renderOptions("");
});
