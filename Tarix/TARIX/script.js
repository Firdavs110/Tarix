const searchInput = document.getElementById("searchInput");
const peopleGrid = document.getElementById("peopleGrid");
const cards = [...document.querySelectorAll(".person-card")];
const filterButtons = [...document.querySelectorAll(".filter-chip")];
const resultCount = document.getElementById("resultCount");
const emptyState = document.getElementById("emptyState");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.querySelector(".nav-links");

let activeFilter = "barchasi";

function filterPeople() {
  const query = (searchInput?.value || "").trim().toLocaleLowerCase("uz");
  let visible = 0;

  cards.forEach((card) => {
    const text = (card.dataset.search + " " + card.textContent).toLocaleLowerCase("uz");
    const categories = card.dataset.category.split(" ");
    const matchesSearch = text.includes(query);
    const matchesFilter = activeFilter === "barchasi" || categories.includes(activeFilter);
    const show = matchesSearch && matchesFilter;

    card.hidden = !show;
    if (show) visible++;
  });

  if (resultCount) resultCount.textContent = String(visible).padStart(2, "0");
  if (emptyState) emptyState.hidden = visible !== 0;
  if (peopleGrid) peopleGrid.classList.toggle("is-empty", visible === 0);
}

searchInput?.addEventListener("input", filterPeople);

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    filterButtons.forEach((item) => {
      const selected = item === button;
      item.classList.toggle("active", selected);
      item.setAttribute("aria-pressed", String(selected));
    });
    filterPeople();
  });
});

menuToggle?.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Menyuni yopish" : "Menyuni ochish");
});

navLinks?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

filterPeople();


// TARIX video kartalari: faqat foydalanuvchi bosganda iframe yuklanadi.
document.querySelectorAll(".video-play-button").forEach((button) => {
  button.addEventListener("click", () => {
    const videoId = button.dataset.videoId;
    if (!videoId) return;
    const frame = document.createElement("iframe");
    frame.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}?autoplay=1&rel=0`;
    frame.title = "TARIX — tarixiy video";
    frame.loading = "lazy";
    frame.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    frame.referrerPolicy = "strict-origin-when-cross-origin";
    frame.allowFullscreen = true;
    const wrap = document.createElement("div");
    wrap.className = "video-frame video-frame-inline";
    wrap.appendChild(frame);
    button.replaceWith(wrap);
  });
});
