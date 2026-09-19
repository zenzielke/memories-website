/* Memories marketing site — launch switches live here */

const SITE_STATE = {
  isAppStoreLive: true,
  appStoreURL: "https://apps.apple.com/app/memories-one-minute-journal/id6805282064",
  isCloudSyncVerified: true,
  supportEmail: "zen@meadowresearch.com",
};

const MOSAIC_NOTES = {
  18: "Dinner with Mom",
  41: "Got the job",
  57: "Nothing happened. Nice.",
  73: "Missed the train",
  96: "Long walk home",
  112: "Called Dad",
  134: "Finally unpacked",
  151: "First warm night",
};

function applyStoreCtas() {
  document.querySelectorAll("[data-store-cta]").forEach((node) => {
    node.replaceChildren();
    if (SITE_STATE.isAppStoreLive && SITE_STATE.appStoreURL) {
      const link = document.createElement("a");
      link.href = SITE_STATE.appStoreURL;
      link.className = "store-badge";
      link.setAttribute("aria-label", "Download on the App Store");
      link.target = "_blank";
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
    pill.textContent = "Coming to the App Store";
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

function setYear() {
  document.querySelectorAll("[data-year]").forEach((node) => {
    node.textContent = String(new Date().getFullYear());
  });
}

function initMobileNav() {
  const toggle = document.querySelector("[data-nav-toggle]");
  const panel = document.getElementById("mobileNav");
  if (!toggle || !panel) return;

  const close = () => {
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
    panel.classList.remove("is-open");
  };

  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") === "true";
    if (open) {
      close();
      return;
    }
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Close menu");
    panel.classList.add("is-open");
  });

  panel.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", close);
  });

  window.addEventListener("resize", () => {
    if (window.matchMedia("(min-width: 900px)").matches) close();
  });
}

function initReveals() {
  const nodes = document.querySelectorAll(".reveal");
  if (!nodes.length) return;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) {
    nodes.forEach((node) => node.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
  );
  nodes.forEach((node) => observer.observe(node));
}

function mosaicDateLabel(index) {
  const start = new Date(Date.UTC(2026, 0, 1));
  start.setUTCDate(start.getUTCDate() + index);
  return start.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

function buildYearMosaic() {
  const grid = document.getElementById("yearMosaic");
  const tip = document.getElementById("mosaicTip");
  if (!grid) return;

  const moods = [
    { key: "empty", label: "Empty", color: "#E8E0D2" },
    { key: "rough", label: "Rough", color: "#D4845C" },
    { key: "off", label: "Off", color: "#D4B85C" },
    { key: "ok", label: "Ok", color: "#B5B1A8" },
    { key: "good", label: "Good", color: "#A8C67A" },
    { key: "great", label: "Great", color: "#5FAF6E" },
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
    cells.push({ ...moods[moodIndex], index: i });
  }

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  grid.replaceChildren();

  const hideTip = () => {
    if (!tip) return;
    tip.hidden = true;
  };

  const showTip = (cell, mood) => {
    if (!tip || mood.key === "empty") {
      hideTip();
      return;
    }
    const date = mosaicDateLabel(mood.index);
    const note = MOSAIC_NOTES[mood.index];
    tip.replaceChildren();
    const strong = document.createElement("strong");
    strong.textContent = `${date} · ${mood.label}`;
    tip.appendChild(strong);
    if (note) {
      const span = document.createElement("span");
      span.textContent = note;
      tip.appendChild(span);
    }
    const panel = grid.closest(".mosaic-panel");
    const cellRect = cell.getBoundingClientRect();
    const panelRect = panel.getBoundingClientRect();
    tip.hidden = false;
    tip.style.left = `${cellRect.left - panelRect.left + cellRect.width / 2}px`;
    tip.style.top = `${cellRect.top - panelRect.top}px`;
  };

  cells.forEach((mood, i) => {
    const interactive = mood.key !== "empty";
    const cell = document.createElement(interactive ? "button" : "span");
    cell.className = "mosaic-cell";
    cell.style.background = mood.color;
    cell.setAttribute("role", "listitem");
    if (interactive) {
      cell.type = "button";
      cell.classList.add("is-interactive");
      cell.setAttribute(
        "aria-label",
        `${mosaicDateLabel(mood.index)}, ${mood.label}${
          MOSAIC_NOTES[mood.index] ? `, ${MOSAIC_NOTES[mood.index]}` : ""
        }`
      );
      cell.addEventListener("mouseenter", () => showTip(cell, mood));
      cell.addEventListener("focus", () => showTip(cell, mood));
      cell.addEventListener("mouseleave", hideTip);
      cell.addEventListener("blur", hideTip);
      cell.addEventListener("click", () => showTip(cell, mood));
    } else {
      cell.setAttribute("aria-hidden", "true");
    }
    if (!reduced) cell.style.setProperty("--delay", `${Math.floor(i / 14) * 35}ms`);
    grid.appendChild(cell);
  });

  grid.addEventListener("mouseleave", hideTip);

  if (reduced) {
    grid.classList.add("is-revealed");
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        grid.classList.add("is-revealed");
        // Clear entrance animation so hover scale can take over smoothly.
        window.setTimeout(() => {
          grid.querySelectorAll(".mosaic-cell").forEach((cell) => {
            cell.classList.add("is-settled");
          });
        }, 900);
        observer.disconnect();
      });
    },
    { threshold: 0.2 }
  );
  observer.observe(grid);
}

document.addEventListener("DOMContentLoaded", () => {
  applyStoreCtas();
  applySupportEmail();
  applyCloudCopy();
  setYear();
  initMobileNav();
  initReveals();
  buildYearMosaic();
});
