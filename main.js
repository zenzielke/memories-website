/* Memories marketing site — launch switches live here */

const SITE_STATE = {
  isAppStoreLive: false,
  appStoreURL: "",
  isCloudSyncVerified: false,
  supportEmail: "zen@meadowresearch.com",
};

function applyStoreCtas() {
  document.querySelectorAll("[data-store-cta]").forEach((node) => {
    node.replaceChildren();
    if (SITE_STATE.isAppStoreLive && SITE_STATE.appStoreURL) {
      const link = document.createElement("a");
      link.href = SITE_STATE.appStoreURL;
      link.className = "store-badge";
      link.setAttribute("aria-label", "Download on the App Store");
      link.rel = "noopener noreferrer";
      const img = document.createElement("img");
      img.src = "./assets/app-store-badge.svg";
      img.alt = "Download on the App Store";
      img.width = 150;
      img.height = 50;
      link.appendChild(img);
      node.appendChild(link);
      return;
    }
    const pill = document.createElement("span");
    pill.className = "coming-soon";
    pill.textContent = "Coming soon to the App Store";
    node.appendChild(pill);
  });
}

function applySupportEmail() {
  document.querySelectorAll("[data-support-email]").forEach((node) => {
    if (SITE_STATE.supportEmail) {
      const a = document.createElement("a");
      a.href = `mailto:${SITE_STATE.supportEmail}`;
      a.textContent = SITE_STATE.supportEmail;
      node.replaceChildren(a);
      return;
    }
    node.textContent =
      "A support email will appear here once the Memories inbox is ready.";
  });
}

function applyCloudCopy() {
  document.querySelectorAll("[data-cloud-copy]").forEach((node) => {
    node.hidden = !SITE_STATE.isCloudSyncVerified;
  });
}

function buildYearMosaic() {
  const grid = document.getElementById("yearMosaic");
  if (!grid) return;
  const moods = [
    { key: "empty", color: "#E8E0D2" },
    { key: "rough", color: "#D4845C" },
    { key: "low", color: "#D4B85C" },
    { key: "ok", color: "#B5B1A8" },
    { key: "good", color: "#A8C67A" },
    { key: "great", color: "#5FAF6E" },
  ];
  const seed = 2026;
  const cells = [];
  for (let i = 0; i < 182; i += 1) {
    const n = (seed * 9301 + i * 49297) % 233280;
    const r = n / 233280;
    let moodIndex = 0;
    if (r > 0.18) moodIndex = 1;
    if (r > 0.28) moodIndex = 2;
    if (r > 0.42) moodIndex = 3;
    if (r > 0.62) moodIndex = 4;
    if (r > 0.82) moodIndex = 5;
    if (i > 150 && r < 0.55) moodIndex = 0;
    cells.push(moods[moodIndex]);
  }
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  grid.replaceChildren();
  cells.forEach((mood, i) => {
    const cell = document.createElement("span");
    cell.className = "mosaic-cell";
    cell.style.background = mood.color;
    cell.title = mood.key === "empty" ? "Empty day" : mood.key;
    if (!reduced) cell.style.setProperty("--delay", `${Math.floor(i / 14) * 45}ms`);
    else cell.classList.add("is-visible");
    grid.appendChild(cell);
  });
  if (reduced) return;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        grid.classList.add("is-revealed");
        observer.disconnect();
      });
    },
    { threshold: 0.25 }
  );
  observer.observe(grid);
}

function setYear() {
  document.querySelectorAll("[data-year]").forEach((node) => {
    node.textContent = String(new Date().getFullYear());
  });
}

document.addEventListener("DOMContentLoaded", () => {
  applyStoreCtas();
  applySupportEmail();
  applyCloudCopy();
  buildYearMosaic();
  setYear();
});
