(() => {
  "use strict";

  // Tweakable props (matches the design's exposed props: noButtonMode, hearts)
  const NO_BUTTON_DODGES = true; // false => "No" is a real choice, jumps straight to recap
  const HEARTS_ENABLED = true;

  const TOTAL_STEPS = 6;

  const SETS = {
    fri: { ramen: "Ramen", tacos: "Tacos", sushi: "Sushi", hotpot: "Hotpot", poke: "Poke", surprise: "A surprise" },
    sat: { park: "The park", market: "The market", drive: "A drive out", museum: "A museum", library: "The library", marathon: "A movie marathon" },
    sun: { movie: "A movie", coffee: "Coffee out", home: "Nowhere at all", books: "The bookstore", walk: "A long walk", brunch: "Brunch" }
  };

  const CARD_META = {
    ramen: { title: "Ramen", sub: "The tiny place" },
    tacos: { title: "Tacos", sub: "Cheap and perfect" },
    sushi: { title: "Sushi", sub: "Fancy mood" },
    hotpot: { title: "Hotpot", sub: "Sweat together" },
    poke: { title: "Poke", sub: "Pretend it's healthy" },
    surprise: { title: "Surprise me", sub: "Bold of you" },
    park: { title: "The park", sub: "Blanket, no plan" },
    market: { title: "Market", sub: "One weird vegetable" },
    drive: { title: "Drive out", sub: "Windows down" },
    museum: { title: "Museum", sub: "Invent the wall text" },
    library: { title: "Library", sub: "Bookstore counts" },
    marathon: { title: "Marathon", sub: "Movies. All of them" },
    movie: { title: "A movie", sub: "You pick, I'll be quiet" },
    coffee: { title: "Coffee out", sub: "Pastry included" },
    home: { title: "Nowhere", sub: "Couch, you, me" },
    books: { title: "Bookstore", sub: "Then never read them" },
    walk: { title: "A long walk", sub: "No destination" },
    brunch: { title: "Brunch", sub: "Eggs, obviously" }
  };

  const ICONS = {
    ramen: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.75" stroke-linecap="round"><path d="M4 12h16a8 8 0 0 1-16 0z"/><path d="M9 7c0-1.4 1-1.9 1-3"/></svg>`,
    tacos: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.75" stroke-linecap="round"><path d="M3 16a9 9 0 0 1 18 0z"/></svg>`,
    sushi: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.75" stroke-linecap="round"><rect x="4" y="8" width="16" height="9" rx="4.5"/><circle cx="12" cy="12.5" r="2"/></svg>`,
    hotpot: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.75" stroke-linecap="round"><path d="M4 11h16v3a6 6 0 0 1-6 6h-4a6 6 0 0 1-6-6z"/><path d="M2.5 11h19"/><path d="M9.5 7.4c0-1.2 1-1.6 1-2.7"/><path d="M14 7.4c0-1.2 1-1.6 1-2.7"/></svg>`,
    poke: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.75" stroke-linecap="round"><path d="M3.5 12h17a8.5 8.5 0 0 1-17 0z"/><circle cx="9" cy="8.6" r="1.2"/><circle cx="14.4" cy="7.8" r="1.2"/></svg>`,
    surprise: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.75" stroke-linecap="round"><path d="M12 4l2.2 5.8L20 12l-5.8 2.2L12 20l-2.2-5.8L4 12l5.8-2.2z"/></svg>`,
    park: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.75" stroke-linecap="round"><path d="M12 21v-6"/><path d="M7 15h10L12 8z"/><path d="M9 9l3-4 3 4"/></svg>`,
    market: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.75" stroke-linecap="round"><path d="M4 8h16l-1.6 11H5.6z"/><path d="M9 8a3 3 0 0 1 6 0"/></svg>`,
    drive: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.75" stroke-linecap="round"><rect x="3" y="10" width="18" height="6" rx="2.5"/><path d="M6 10l2-4h8l2 4"/><circle cx="7.5" cy="17.5" r="1.4"/><circle cx="16.5" cy="17.5" r="1.4"/></svg>`,
    museum: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.75" stroke-linecap="round"><path d="M4 9l8-4 8 4"/><path d="M6 9v9M12 9v9M18 9v9"/><path d="M4 19h16"/></svg>`,
    movie: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.75" stroke-linecap="round"><rect x="3" y="6" width="18" height="12" rx="3"/><path d="M10.5 10l4.5 2-4.5 2z"/></svg>`,
    coffee: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.75" stroke-linecap="round"><path d="M5 8h11v5a5.5 5.5 0 0 1-11 0z"/><path d="M16 9.5h1.5a2.5 2.5 0 0 1 0 5H16"/><path d="M5 20h12"/></svg>`,
    home: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.75" stroke-linecap="round"><rect x="3" y="12" width="18" height="7" rx="3"/><path d="M6 12V9.5A3.5 3.5 0 0 1 9.5 6h5A3.5 3.5 0 0 1 18 9.5V12"/></svg>`,
    books: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.75" stroke-linecap="round"><path d="M5 5h6v14H5z"/><path d="M13 5h6v14h-6z"/></svg>`,
    library: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.75" stroke-linecap="round"><path d="M4 5h5a2.5 2.5 0 0 1 2.5 2.5V19a2.5 2.5 0 0 0-2.5-2.5H4z"/><path d="M20 5h-5a2.5 2.5 0 0 0-2.5 2.5V19a2.5 2.5 0 0 1 2.5-2.5h5z"/></svg>`,
    marathon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.75" stroke-linecap="round"><rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="M7.5 5v14M16.5 5v14"/></svg>`,
    walk: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.75" stroke-linecap="round"><circle cx="13.5" cy="4.6" r="1.9"/><path d="M12.4 21l1.4-6.2-3-2.4 1-4.2 3 2.2 2.4 1"/><path d="M10.8 12.4 8.2 16l-2 5"/></svg>`,
    brunch: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.75" stroke-linecap="round"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="2.8"/></svg>`,
    other: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.75" stroke-linecap="round"><path d="M16.5 3.9a2.3 2.3 0 0 1 3.3 3.3L8.4 18.6l-4.3 1 1-4.3z"/></svg>`
  };

  const NO_LABELS = ["No", "Are you sure?", "Really?", "Hm.", "Last chance"];

  const HEARTS = Array.from({ length: 16 }, (_, i) => ({
    left: ((i * 6.1 + (i % 3) * 9) % 94 + 2).toFixed(0) + "%",
    size: [14, 20, 26, 17][i % 4] + "px",
    dur: (6 + (i % 5) * 1.4).toFixed(1) + "s",
    delay: (i * 0.55).toFixed(2) + "s"
  }));

  function freshState() {
    return { step: 0, fri: [], sat: [], sun: [], friOther: "", noTries: 0, noPos: "translate(0,0)" };
  }
  let state = freshState();

  const esc = (s) => s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const slideEl = document.getElementById("slide");
  const heartsEl = document.getElementById("hearts");
  const dotsEl = document.getElementById("dots");
  const backBtn = document.getElementById("backBtn");
  const nextBtn = document.getElementById("nextBtn");

  function go(d) {
    state.step = Math.max(0, Math.min(TOTAL_STEPS - 1, state.step + d));
    render();
  }

  function toggle(key, id) {
    const list = state[key];
    state[key] = list.includes(id) ? list.filter((x) => x !== id) : list.concat([id]);
    render();
  }

  function chosen(key) {
    const names = state[key].map((id) => SETS[key][id]);
    if (key === "fri" && state.friOther.trim()) names.push(state.friOther.trim());
    if (!names.length) return "Your call, I'll follow";
    if (names.length === 1) return names[0];
    return names.slice(0, -1).join(", ") + " + " + names[names.length - 1];
  }

  function cardHtml(key, id, sage) {
    const on = state[key].includes(id);
    const bg = on ? (sage ? "var(--color-accent-2-200)" : "var(--color-accent-200)") : "var(--color-neutral-100)";
    const bd = on ? (sage ? "var(--color-accent-2-600)" : "var(--color-accent-500)") : "var(--color-divider)";
    const sh = on ? "var(--shadow-md)" : "var(--shadow-sm)";
    const dot = on ? (sage ? "var(--color-accent-2-400)" : "var(--color-accent-300)") : (sage ? "var(--color-accent-2-200)" : "var(--color-accent-200)");
    const iconColor = sage ? "var(--color-accent-2-800)" : "var(--color-accent-800)";
    const meta = CARD_META[id];
    return `
      <button type="button" class="choice-card" data-key="${key}" data-id="${id}"
        style="background:${bg};border-color:${bd};box-shadow:${sh}">
        <span class="choice-icon${sage ? " blob" : ""}" style="color:${iconColor};background:${dot}">${ICONS[id]}</span>
        <span class="choice-title">${meta.title}</span>
        <span class="choice-sub">${meta.sub}</span>
      </button>`;
  }

  function otherCardHtml() {
    const on = !!state.friOther.trim();
    return `
      <div class="choice-card card-wide" style="background:${on ? "var(--color-accent-200)" : "var(--color-neutral-100)"};border-color:${on ? "var(--color-accent-500)" : "var(--color-divider)"};box-shadow:${on ? "var(--shadow-md)" : "var(--shadow-sm)"}">
        <span class="choice-icon" style="color:var(--color-accent-800);background:${on ? "var(--color-accent-300)" : "var(--color-accent-200)"}">${ICONS.other}</span>
        <label class="choice-title" for="friOther">Something else</label>
        <input id="friOther" class="custom-input" type="text" autocomplete="off"
          placeholder="Name it and it's yours" value="${esc(state.friOther)}">
      </div>`;
  }

  function cardGrid(key, sage) {
    const cards = Object.keys(SETS[key]).map((id) => cardHtml(key, id, sage)).join("");
    return `<div class="card-grid">${cards}${key === "fri" ? otherCardHtml() : ""}</div>`;
  }

  const SLIDES = {
    intro() {
      return `
        <div class="slide slide-loose">
          <div class="art-intro">
            <div class="blob blob-1"></div>
            <div class="blob blob-2"></div>
            <div class="blob blob-3"></div>
            <img class="art-ink" src="./image/us-intro.png" alt="A drawing of the two of us">
            <span class="script-note">that's us</span>
          </div>
          <span class="tag tag-accent-2" style="font-size:13px">an official request</span>
          <h1 style="font-size:46px;margin:0;line-height:1.03;max-width:12ch">Hey you.</h1>
          <p style="font-size:18px;margin:0;color:var(--color-neutral-800);max-width:30ch">I'm asking you out. Formally. With slides, because apparently that's who I am now.</p>
          <button type="button" class="btn btn-primary" data-action="next" style="font-size:18px;border-radius:999px;padding:16px 34px;min-height:54px;width:100%">Go on then</button>
        </div>`;
    },
    ask() {
      return `
        <div class="slide slide-loose">
          <h1 style="font-size:42px;margin:0;line-height:1.06;max-width:15ch">Come out with me this weekend?</h1>
          <p style="font-size:18px;margin:0;color:var(--color-neutral-800);max-width:30ch">Three days. One of me. I've already cleared my schedule, which was empty.</p>
          <div style="position:relative;width:100%;display:flex;flex-wrap:wrap;gap:14px;align-items:center;margin-top:6px">
            <button type="button" class="btn btn-primary" data-action="yes" style="font-size:21px;border-radius:999px;padding:18px 44px;min-height:58px;animation:wobble 2.8s ease-in-out infinite">Yes</button>
            <span class="script-note" style="font-size:22px;transform:rotate(-6deg)">&#8592; the correct one</span>
            <button type="button" id="noBtn" class="btn btn-secondary" data-action="no" style="font-size:16px;border-radius:999px;padding:13px 26px;min-height:46px;background:var(--color-neutral-100);transform:${state.noPos};transition:transform .24s cubic-bezier(.34,1.56,.64,1)">${NO_LABELS[Math.min(state.noTries, NO_LABELS.length - 1)]}</button>
          </div>
        </div>`;
    },
    fri() {
      return `
        <div class="slide">
          <div>
            <span class="tag tag-accent" style="font-size:13px">Friday</span>
            <h2 style="font-size:34px;margin:12px 0 4px;line-height:1.08">Dinner. What are we eating?</h2>
            <p class="text-muted" style="margin:0;font-size:15px">Tap everything that sounds good.</p>
          </div>
          ${cardGrid("fri", false)}
        </div>`;
    },
    sat() {
      return `
        <div class="slide">
          <div>
            <span class="tag tag-accent-2" style="font-size:13px">Saturday</span>
            <h2 style="font-size:34px;margin:12px 0 4px;line-height:1.08">The main event.</h2>
            <p class="text-muted" style="margin:0;font-size:15px">All day is ours. Pick your poison.</p>
          </div>
          <img class="art-event" src="./image/us-event.jpg" alt="The two of us on the couch">
          ${cardGrid("sat", true)}
        </div>`;
    },
    sun() {
      return `
        <div class="slide">
          <div>
            <span class="tag tag-accent" style="font-size:13px">Sunday</span>
            <h2 style="font-size:34px;margin:12px 0 4px;line-height:1.08">Slow one, I assume.</h2>
            <p class="text-muted" style="margin:0;font-size:15px">Last slide of choices, promise.</p>
          </div>
          <img class="art-sunday" src="./image/us-sunday.png" alt="Two dinosaurs holding hands">
          ${cardGrid("sun", false)}
        </div>`;
    },
    recap() {
      const rows = [
        { k: "Friday", v: chosen("fri") },
        { k: "Saturday", v: chosen("sat") },
        { k: "Sunday", v: chosen("sun") }
      ];
      return `
        <div class="slide">
          <h1 style="font-size:44px;margin:0;line-height:1.04;max-width:12ch">It's a weekend.</h1>
          <img class="art-recap" src="./image/us-recap.png" alt="A drawing of the two of us">
          <div class="card elev-md recap-card">
            ${rows.map((r) => `
              <div class="recap-row">
                <span class="recap-key">${r.k}</span>
                <span class="recap-val">${r.v}</span>
              </div>`).join("")}
            <div class="recap-foot">
              <span style="width:30px;height:30px;border-radius:50%;background:var(--color-accent-500);flex:none"></span>
              <span style="width:22px;height:22px;border-radius:50%;background:var(--color-accent-2-400);flex:none"></span>
              <span style="font-size:14px;color:var(--color-neutral-700)">and you said yes, so.</span>
            </div>
          </div>
          <button type="button" class="btn btn-secondary" data-action="restart" style="border-radius:999px;padding:13px 24px;min-height:46px;font-size:15px;align-self:flex-start">Start over</button>
        </div>`;
    }
  };

  const SLIDE_ORDER = ["intro", "ask", "fri", "sat", "sun", "recap"];

  function renderSlide() {
    const name = SLIDE_ORDER[state.step];
    slideEl.innerHTML = SLIDES[name]();

    slideEl.querySelectorAll(".choice-card").forEach((btn) => {
      btn.addEventListener("click", () => toggle(btn.dataset.key, btn.dataset.id));
    });

    const otherInput = slideEl.querySelector("#friOther");
    if (otherInput) {
      // Update state without re-rendering the slide, or the field would lose focus.
      otherInput.addEventListener("input", (e) => {
        state.friOther = e.target.value;
        renderNav();
      });
    }

    const introNext = slideEl.querySelector('[data-action="next"]');
    if (introNext) introNext.addEventListener("click", () => go(1));

    const yesBtn = slideEl.querySelector('[data-action="yes"]');
    if (yesBtn) yesBtn.addEventListener("click", () => { state.step = 2; render(); });

    const restartBtn = slideEl.querySelector('[data-action="restart"]');
    if (restartBtn) restartBtn.addEventListener("click", () => { state = freshState(); render(); });

    const noBtn = document.getElementById("noBtn");
    if (noBtn) {
      noBtn.addEventListener("click", () => {
        if (!NO_BUTTON_DODGES) { state.step = 5; render(); }
        else { state.noTries += 1; render(); }
      });
      const dodge = () => {
        if (!NO_BUTTON_DODGES) return;
        const x = (Math.random() * 150 - 75).toFixed(0);
        const y = (Math.random() * 80 - 40).toFixed(0);
        const sc = Math.max(0.5, 1 - state.noTries * 0.12).toFixed(2);
        state.noPos = `translate(${x}px,${y}px) scale(${sc})`;
        noBtn.style.transform = state.noPos;
      };
      noBtn.addEventListener("mouseenter", dodge);
      noBtn.addEventListener("touchstart", dodge, { passive: true });
    }
  }

  function renderHearts() {
    const show = state.step === 5 && HEARTS_ENABLED;
    heartsEl.hidden = !show;
    if (!show) { heartsEl.innerHTML = ""; return; }
    if (!heartsEl.childElementCount) {
      heartsEl.innerHTML = HEARTS.map((h) =>
        `<div class="heart" style="left:${h.left};font-size:${h.size};animation-duration:${h.dur};animation-delay:${h.delay}">&#9829;</div>`
      ).join("");
    }
  }

  function renderNav() {
    const step = state.step;
    backBtn.style.visibility = step === 0 ? "hidden" : "visible";
    nextBtn.style.visibility = step === 0 || step === 1 || step === 5 ? "hidden" : "visible";
    const disabled = step === 2 ? !(state.fri.length || state.friOther.trim())
      : step === 3 ? !state.sat.length : step === 4 ? !state.sun.length : false;
    nextBtn.disabled = disabled;
    nextBtn.textContent = step === 4 ? "See the plan" : "Next";

    dotsEl.innerHTML = Array.from({ length: TOTAL_STEPS }, (_, i) => {
      const bg = i === step ? "var(--color-accent-500)" : i < step ? "var(--color-accent-300)" : "var(--color-neutral-300)";
      return `<span class="dot" style="background:${bg}"></span>`;
    }).join("");
  }

  function render() {
    renderSlide();
    renderHearts();
    renderNav();
  }

  backBtn.addEventListener("click", () => go(-1));
  nextBtn.addEventListener("click", () => go(1));

  render();
})();
