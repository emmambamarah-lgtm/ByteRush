const STORAGE_KEY = "byterush_player";
const ENERGY_PER_MISSION = 30;

const game = {
  pendingMissionResult: null,
  currentCode: "",

  state: {
    energy: 0,
    currentMissionIdx: 0,
    completedMissions: []
  },

  missions: [
    {
      id: "m1",
      title: "Mission 1: The Silent Tree",
      narrator: "The tree has no name. Give it one.",
      guideLines: [
        "Use <h1> for the title.",
        "Use <p> for the message.",
        "Write The Moon Tree and I am learning to code."
      ],
      starterCode: "<h1>The Moon Tree</h1>\n<p>I am learning to code.</p>",
      buttonText: "Awaken the Tree",
      successMsg: "The tree remembers its name.",
      learn: ["<h1> creates a title", "<p> adds text"],
      validate(code) {
        const doc = new DOMParser().parseFromString(code, "text/html");
        const heading = doc.querySelector("h1")?.textContent?.trim() || "";
        const paragraph = doc.querySelector("p")?.textContent?.trim() || "";

        if (heading !== "The Moon Tree") {
          return { valid: false, msg: "The tree still needs the title The Moon Tree." };
        }

        if (paragraph !== "I am learning to code.") {
          return { valid: false, msg: "The tree still needs the message I am learning to code." };
        }

        return { valid: true, msg: this.successMsg, learn: this.learn };
      },
      buildPreview(code, helpers) {
        const doc = new DOMParser().parseFromString(code, "text/html");
        const heading = doc.querySelector("h1")?.textContent?.trim() || "Unnamed Tree";
        const paragraph = doc.querySelector("p")?.textContent?.trim() || "Waiting for a whisper...";

        return `
          <section class="scene scene-tree">
            <div class="sky-glow"></div>
            <div class="tree-card">
              <div class="tree-crown"></div>
              <div class="tree-trunk"></div>
              <h1>${helpers.text(heading)}</h1>
              <p>${helpers.text(paragraph)}</p>
            </div>
          </section>
        `;
      }
    },
    {
      id: "m2",
      title: "Mission 2: The Lost Path",
      narrator: "The path has no steps. Place them gently.",
      guideLines: [
        "Use one <ul>.",
        "Add three <li> items.",
        "Write Walk forward, Climb the hill, and Enter the forest."
      ],
      starterCode: "<ul>\n  <li>Walk forward</li>\n  <li>Climb the hill</li>\n  <li>Enter the forest</li>\n</ul>",
      buttonText: "Build the Path",
      successMsg: "The way forward is clear.",
      learn: ["<ul> creates a list", "<li> adds list items"],
      validate(code) {
        const doc = new DOMParser().parseFromString(code, "text/html");
        const items = Array.from(doc.querySelectorAll("li")).map((item) => item.textContent.trim());

        if (items.length < 3) {
          return { valid: false, msg: "The path needs three list items." };
        }

        if (items[0] !== "Walk forward") {
          return { valid: false, msg: "The first step must be Walk forward." };
        }

        if (items[1] !== "Climb the hill") {
          return { valid: false, msg: "The second step must be Climb the hill." };
        }

        if (items[2] !== "Enter the forest") {
          return { valid: false, msg: "The third step must be Enter the forest." };
        }

        return { valid: true, msg: this.successMsg, learn: this.learn };
      },
      buildPreview(code, helpers) {
        const doc = new DOMParser().parseFromString(code, "text/html");
        const items = Array.from(doc.querySelectorAll("li")).map((item) => item.textContent.trim());
        const steps = [items[0], items[1], items[2]]
          .map((item, index) => {
            const fallback = ["Quiet ground", "Misty bend", "Sleeping gate"][index];
            return `<div class="path-step"><span class="step-number">${index + 1}</span><span>${helpers.text(item || fallback)}</span></div>`;
          })
          .join("");

        return `
          <section class="scene scene-path">
            <div class="path-glow"></div>
            <div class="path-panel">
              <h2>Forest Path</h2>
              <div class="path-steps">${steps}</div>
            </div>
          </section>
        `;
      }
    },
    {
      id: "m3",
      title: "Mission 3: The Glowing Signs",
      narrator: "The signs are blank. Guide the travelers.",
      guideLines: [
        "Add one <img> with the correct src and alt.",
        "Add one <a> with href #forest-map.",
        "Link text must be Open the forest map."
      ],
      starterCode: "<img src=\"https://picsum.photos/id/1025/200/300\" alt=\"Friendly forest path with glowing flowers\">\n<a href=\"#forest-map\">Open the forest map</a>",
      buttonText: "Light the Signs",
      successMsg: "Travelers can find their way now.",
      learn: ["<img> displays an image", "<a> creates a clickable link"],
      validate(code) {
        const doc = new DOMParser().parseFromString(code, "text/html");
        const image = doc.querySelector("img");
        const link = doc.querySelector("a");

        if (!image) {
          return { valid: false, msg: "Add an image to light the sign." };
        }

        if (image.getAttribute("src")?.trim() !== "https://picsum.photos/id/1025/200/300") {
          return { valid: false, msg: "The image source must be https://picsum.photos/id/1025/200/300." };
        }

        if (image.getAttribute("alt")?.trim() !== "Friendly forest path with glowing flowers") {
          return { valid: false, msg: "The image alt text must be Friendly forest path with glowing flowers." };
        }

        if (!link) {
          return { valid: false, msg: "Add a link for the forest map." };
        }

        if (link.getAttribute("href")?.trim() !== "#forest-map") {
          return { valid: false, msg: "The link href must be #forest-map." };
        }

        if (link.textContent.trim() !== "Open the forest map") {
          return { valid: false, msg: "The link text must be Open the forest map." };
        }

        return { valid: true, msg: this.successMsg, learn: this.learn };
      },
      buildPreview(code, helpers) {
        const doc = new DOMParser().parseFromString(code, "text/html");
        const image = doc.querySelector("img");
        const link = doc.querySelector("a");
        const imageSrc = image?.getAttribute("src")?.trim() || "";
        const imageAlt = image?.getAttribute("alt")?.trim() || "Forest sign";
        const linkHref = link?.getAttribute("href")?.trim() || "#";
        const linkText = link?.textContent?.trim() || "A map button will glow here";

        return `
          <section class="scene scene-signs">
            <div class="signs-panel">
              <div class="signs-image-wrap">
                ${imageSrc
                  ? `<img class="signs-image" src="${helpers.attr(imageSrc)}" alt="${helpers.attr(imageAlt)}">`
                  : '<div class="scene-image-placeholder">Waiting for a forest picture</div>'}
              </div>
              <p class="signs-caption">${helpers.text(imageAlt || "A sign is waiting for its glowing description.")}</p>
              <a class="signs-button" href="${helpers.attr(linkHref)}">${helpers.text(linkText)}</a>
            </div>
          </section>
        `;
      }
    },
    {
      id: "m4",
      title: "Mission 4: The First Clearing",
      narrator: "The clearing is almost awake. Bring everything together.",
      guideLines: [
        "Use <h1>, <p>, <ul>, <img>, and <a>.",
        "List items must be Pages, Lists, and Links.",
        "Finish with Continue the journey."
      ],
      starterCode: "<div>\n  <h1>The First Clearing</h1>\n  <p>The forest is waking up.</p>\n  <ul>\n    <li>Pages</li>\n    <li>Lists</li>\n    <li>Links</li>\n  </ul>\n  <img src=\"https://picsum.photos/id/1018/200/300\" alt=\"A quiet forest clearing\">\n  <a href=\"#next-path\">Continue the journey</a>\n</div>",
      buttonText: "Restore the Forest",
      successMsg: "The forest breathes again.",
      learn: ["You combined multiple HTML elements", "You built a complete mini page"],
      validate(code) {
        const doc = new DOMParser().parseFromString(code, "text/html");
        const heading = doc.querySelector("h1")?.textContent?.trim() || "";
        const paragraph = doc.querySelector("p")?.textContent?.trim() || "";
        const items = Array.from(doc.querySelectorAll("li")).map((item) => item.textContent.trim());
        const image = doc.querySelector("img");
        const link = doc.querySelector("a");

        if (heading !== "The First Clearing") {
          return { valid: false, msg: "The title must be The First Clearing." };
        }

        if (paragraph !== "The forest is waking up.") {
          return { valid: false, msg: "The message must be The forest is waking up." };
        }

        if (items[0] !== "Pages" || items[1] !== "Lists" || items[2] !== "Links") {
          return { valid: false, msg: "The list must contain Pages, Lists, and Links." };
        }

        if (image?.getAttribute("src")?.trim() !== "https://picsum.photos/id/1018/200/300") {
          return { valid: false, msg: "The image source must be https://picsum.photos/id/1018/200/300." };
        }

        if (image?.getAttribute("alt")?.trim() !== "A quiet forest clearing") {
          return { valid: false, msg: "The image alt text must be A quiet forest clearing." };
        }

        if (link?.getAttribute("href")?.trim() !== "#next-path") {
          return { valid: false, msg: "The link href must be #next-path." };
        }

        if (link?.textContent?.trim() !== "Continue the journey") {
          return { valid: false, msg: "The link text must be Continue the journey." };
        }

        return { valid: true, msg: this.successMsg, learn: this.learn };
      },
      buildPreview(code, helpers) {
        const doc = new DOMParser().parseFromString(code, "text/html");
        const heading = doc.querySelector("h1")?.textContent?.trim() || "The clearing awaits";
        const paragraph = doc.querySelector("p")?.textContent?.trim() || "A gentle breeze is still writing this place.";
        const items = Array.from(doc.querySelectorAll("li")).map((item) => item.textContent.trim());
        const image = doc.querySelector("img");
        const link = doc.querySelector("a");
        const badges = [items[0], items[1], items[2]]
          .map((item, index) => {
            const fallback = ["Pages", "Lists", "Links"][index];
            return `<span class="clearing-badge">${helpers.text(item || fallback)}</span>`;
          })
          .join("");

        return `
          <section class="scene scene-clearing">
            <div class="clearing-panel">
              <h1>${helpers.text(heading)}</h1>
              <p>${helpers.text(paragraph)}</p>
              <div class="clearing-badges">${badges}</div>
              <div class="clearing-media">
                ${image?.getAttribute("src")
                  ? `<img class="clearing-image" src="${helpers.attr(image.getAttribute("src") || "")}" alt="${helpers.attr(image.getAttribute("alt") || "Clearing")}">`
                  : '<div class="scene-image-placeholder">A clearing image will glow here</div>'}
              </div>
              <a class="clearing-link" href="${helpers.attr(link?.getAttribute("href") || "#")}">${helpers.text(link?.textContent?.trim() || "A path opens here")}</a>
            </div>
          </section>
        `;
      }
    }
  ],

  init() {
    if (window.location.pathname.includes("L1-html.html")) {
      this.setupGamePage();
      return;
    }

    this.setupIndexPage();
  },

  setupIndexPage() {
    this.loadState();
    this.updateMenuProgress();

    const startAdventure = document.getElementById("startAdventure");
    const continueJourney = document.getElementById("continueJourney");
    const resetJourney = document.getElementById("resetJourney");

    if (startAdventure) {
      startAdventure.addEventListener("click", () => {
        this.resetState();
        this.saveState();
        window.location.href = "L1-html.html";
      });
    }

    if (continueJourney) {
      continueJourney.addEventListener("click", () => {
        this.loadState();
        window.location.href = "L1-html.html";
      });
    }

    if (resetJourney) {
      resetJourney.addEventListener("click", () => {
        localStorage.removeItem(STORAGE_KEY);
        this.resetState();
        window.location.reload();
      });
    }
  },

  setupGamePage() {
    this.loadState();
    this.configureEditor();
    this.updateHUD();

    const actionButton = document.getElementById("action-btn");
    const continueButton = document.getElementById("mission-complete-continue");
    const backButton = document.querySelector(".btn-back");
    const replayButton = document.getElementById("replay-journey-btn");
    const returnButton = document.getElementById("return-forest-btn");

    if (actionButton) {
      actionButton.addEventListener("click", () => {
        this.checkSolution();
      });
    }

    if (continueButton) {
      continueButton.addEventListener("click", () => {
        this.continueAfterMissionComplete();
      });
    }

    if (backButton) {
      backButton.addEventListener("click", () => {
        window.location.href = "index.html";
      });
    }

    if (replayButton) {
      replayButton.addEventListener("click", () => {
        this.resetState();
        this.saveState();
        window.location.reload();
      });
    }

    if (returnButton) {
      returnButton.addEventListener("click", () => {
        window.location.href = "index.html";
      });
    }

    this.loadMission(this.normalizeMissionIndex(this.state.currentMissionIdx));
  },

  configureEditor() {
    const editor = this.getEditorElement();
    const chipSection = document.querySelector(".answer-chips");

    if (!editor) {
      return;
    }

    if (chipSection) {
      chipSection.style.display = "none";
    }

    editor.innerHTML = "";
    editor.setAttribute("contenteditable", "true");
    editor.setAttribute("spellcheck", "false");
    editor.classList.add("code-editor");

    editor.addEventListener("input", () => {
      this.currentCode = editor.textContent || "";
      this.clearMessage();
      this.updatePreview();
    });
  },

  getEditorElement() {
    return document.getElementById("code-input") || document.getElementById("code-puzzle");
  },

  normalizeMissionIndex(index) {
    if (!Number.isInteger(index) || index < 0) {
      return 0;
    }

    if (index > this.missions.length) {
      return this.missions.length;
    }

    return index;
  },

  resetState() {
    this.state = {
      energy: 0,
      currentMissionIdx: 0,
      completedMissions: []
    };
    this.currentCode = "";
    this.pendingMissionResult = null;
  },

  loadState() {
    const raw = localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      this.resetState();
      return;
    }

    try {
      const parsed = JSON.parse(raw);
      this.state = {
        energy: Number.isFinite(parsed.energy) ? parsed.energy : 0,
        currentMissionIdx: this.normalizeMissionIndex(parsed.currentMissionIdx ?? 0),
        completedMissions: Array.isArray(parsed.completedMissions) ? parsed.completedMissions : []
      };
      this.pendingMissionResult = null;
      this.currentCode = "";
    } catch (error) {
      console.error("Save file corrupted", error);
      this.resetState();
    }
  },

  saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
  },

  updateMenuProgress() {
    const progressText = document.getElementById("progress-text");
    const progressBar = document.getElementById("progress-bar");
    const continueJourney = document.getElementById("continueJourney");
    const completedCount = this.state.completedMissions.length;
    const progressPercent = Math.round((completedCount / this.missions.length) * 100);
    const hasProgress = completedCount > 0 || this.state.currentMissionIdx > 0 || this.state.energy > 0;

    if (progressText) {
      progressText.textContent = hasProgress
        ? `${completedCount} of ${this.missions.length} missions completed, ${this.state.energy} energy stored.`
        : "No journey started yet.";
    }

    if (progressBar) {
      progressBar.style.width = `${progressPercent}%`;
    }

    if (continueJourney) {
      continueJourney.disabled = !hasProgress;
    }
  },

  updateHUD() {
    const missionIndicator = document.getElementById("mission-indicator");
    const energyCurrent = document.getElementById("energy-current");

    if (missionIndicator) {
      missionIndicator.textContent = `Mission ${Math.min(this.state.currentMissionIdx + 1, this.missions.length)} / ${this.missions.length}`;
    }

    if (energyCurrent) {
      energyCurrent.textContent = `${this.state.energy} / 120`;
    }
  },

  loadMission(index) {
    if (index >= this.missions.length) {
      this.showCompletionScreen();
      return;
    }

    this.state.currentMissionIdx = index;
    const mission = this.missions[index];
    const missionTitle = document.getElementById("mission-title");
    const missionNarrator = document.getElementById("mission-narrator");
    const actionButton = document.getElementById("action-btn");
    const completionScreen = document.getElementById("completion-screen");
    const editor = this.getEditorElement();

    if (completionScreen) {
      completionScreen.style.display = "none";
    }

    if (missionTitle) {
      missionTitle.textContent = mission.title;
    }

    if (missionNarrator) {
      missionNarrator.innerHTML = `<span class="mission-copy">${this.escapeHtml(mission.narrator)}</span><span class="mission-label mission-guide-label">Guide</span>${mission.guideLines.map((line) => `<div class="guide-line">${this.escapeHtml(line)}</div>`).join("")}`;
    }

    if (actionButton) {
      actionButton.textContent = mission.buttonText;
      actionButton.disabled = false;
    }

    this.currentCode = mission.starterCode;

    if (editor) {
      editor.textContent = this.currentCode;
    }

    this.pendingMissionResult = null;
    this.closeMissionComplete();
    this.clearMessage();
    this.updateHUD();
    this.updatePreview();
    this.saveState();
  },

  getCurrentCode() {
    const editor = this.getEditorElement();
    if (!editor) {
      return this.currentCode;
    }

    return editor.textContent || "";
  },

  updatePreview() {
    const mission = this.missions[this.state.currentMissionIdx];
    const previewFrame = document.getElementById("preview-frame");

    if (!mission || !previewFrame) {
      return;
    }

    const previewDoc = previewFrame.contentDocument || previewFrame.contentWindow.document;
    previewDoc.open();
    previewDoc.write(
      this.getPreviewCss() +
      mission.buildPreview(this.getCurrentCode(), {
        text: (value) => this.escapeHtml(value),
        attr: (value) => this.escapeHtml(value)
      })
    );
    previewDoc.close();
  },

  checkSolution() {
    const mission = this.missions[this.state.currentMissionIdx];
    if (!mission) {
      return;
    }

    const result = mission.validate(this.getCurrentCode());
    if (!result.valid) {
      this.showMessage(result.msg, true);
      return;
    }

    if (!this.state.completedMissions.includes(mission.id)) {
      this.state.completedMissions.push(mission.id);
      this.state.energy += ENERGY_PER_MISSION;
    }

    this.pendingMissionResult = result;
    this.saveState();
    this.updateHUD();
    this.showMissionComplete(result);
  },

  showMissionComplete(result) {
    const overlay = document.getElementById("mission-complete-overlay");
    const message = document.getElementById("mission-complete-message");
    const learn = document.getElementById("mission-complete-learn");
    const energy = document.getElementById("mission-complete-energy");
    const actionButton = document.getElementById("action-btn");

    if (message) {
      message.textContent = result.msg;
    }

    if (learn) {
      learn.innerHTML = Array.isArray(result.learn)
        ? result.learn.map((item) => `<div class="success-learn">${this.escapeHtml(item)}</div>`).join("")
        : "";
    }

    if (energy) {
      energy.textContent = `+${ENERGY_PER_MISSION} Forest Energy restored`;
    }

    if (actionButton) {
      actionButton.disabled = true;
    }

    if (overlay) {
      overlay.classList.add("active");
    }
  },

  closeMissionComplete() {
    const overlay = document.getElementById("mission-complete-overlay");
    if (overlay) {
      overlay.classList.remove("active");
    }
  },

  continueAfterMissionComplete() {
    if (!this.pendingMissionResult) {
      return;
    }

    this.closeMissionComplete();
    this.playTransition();
  },

  playTransition() {
    const overlay = document.getElementById("transition-overlay");
    const text = document.getElementById("transition-text");

    if (!overlay || !text) {
      return;
    }

    overlay.classList.add("active");
    text.textContent = "The forest listens...";

    window.setTimeout(() => {
      text.textContent = "The forest shifts...";

      window.setTimeout(() => {
        this.pendingMissionResult = null;
        this.loadMission(this.state.currentMissionIdx + 1);
        window.setTimeout(() => {
          overlay.classList.remove("active");
        }, 500);
      }, 1200);
    }, 1200);
  },

  showCompletionScreen() {
    const completionScreen = document.getElementById("completion-screen");
    if (completionScreen) {
      completionScreen.style.display = "flex";
    }
  },

  showMessage(text, isError) {
    const messageArea = document.getElementById("message-area");
    if (!messageArea) {
      return;
    }

    messageArea.textContent = text;
    messageArea.className = isError ? "msg-error" : "msg-success";
  },

  clearMessage() {
    const messageArea = document.getElementById("message-area");
    if (!messageArea) {
      return;
    }

    messageArea.textContent = "";
    messageArea.className = "";
  },

  escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#39;");
  },

  getPreviewCss() {
    return `
      <style>
        :root {
          color-scheme: dark;
        }
        * {
          box-sizing: border-box;
        }
        html, body {
          margin: 0;
          min-height: 100%;
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
          background: radial-gradient(circle at top, #16314a 0%, #08131f 58%, #040811 100%);
          color: #f3f8ff;
        }
        body {
          padding: 16px;
        }
        .scene {
          position: relative;
          min-height: calc(100vh - 32px);
          border-radius: 20px;
          overflow: hidden;
          padding: 18px;
          background: linear-gradient(180deg, rgba(255,255,255,0.06), rgba(4,8,17,0.18));
          border: 1px solid rgba(175, 203, 255, 0.18);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.08);
        }
        .scene::before {
          content: "";
          position: absolute;
          inset: auto -20% -30% -20%;
          height: 48%;
          background: radial-gradient(circle at 50% 0%, rgba(97, 186, 135, 0.34), rgba(6, 18, 25, 0.95) 70%);
          filter: blur(10px);
        }
        .sky-glow,
        .path-glow {
          position: absolute;
          top: -24px;
          right: -16px;
          width: 120px;
          height: 120px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(183,166,255,0.42), rgba(183,166,255,0.02) 72%);
        }
        .tree-card,
        .path-panel,
        .signs-panel,
        .clearing-panel {
          position: relative;
          z-index: 1;
          background: rgba(8, 18, 31, 0.66);
          border: 1px solid rgba(175, 203, 255, 0.22);
          border-radius: 18px;
          padding: 18px;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }
        .tree-card {
          min-height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          gap: 10px;
          padding-top: 120px;
        }
        .tree-crown {
          position: absolute;
          top: 24px;
          left: 50%;
          transform: translateX(-50%);
          width: 132px;
          height: 132px;
          border-radius: 50%;
          background: radial-gradient(circle at 30% 30%, #98ffd4 0%, #5abf8d 38%, #1f5e4b 70%, #15352f 100%);
          box-shadow: 0 0 28px rgba(111, 231, 183, 0.26);
        }
        .tree-trunk {
          position: absolute;
          top: 118px;
          left: 50%;
          transform: translateX(-50%);
          width: 24px;
          height: 90px;
          border-radius: 14px;
          background: linear-gradient(180deg, #7a5538, #47301f);
        }
        .tree-card h1,
        .clearing-panel h1 {
          margin: 0;
          color: #ddebff;
          font-size: 1.45rem;
        }
        .tree-card p,
        .clearing-panel p,
        .signs-caption {
          margin: 0;
          color: #c3d4e8;
          line-height: 1.5;
        }
        .path-panel h2 {
          margin: 0 0 14px;
          font-size: 1.2rem;
          color: #ddebff;
        }
        .path-steps {
          display: grid;
          gap: 10px;
        }
        .path-step {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 12px;
          border-radius: 14px;
          background: rgba(255,255,255,0.06);
          color: #eef5ff;
        }
        .step-number {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: rgba(175,203,255,0.18);
          color: #afcbff;
          font-size: 0.75rem;
          flex-shrink: 0;
        }
        .signs-panel,
        .clearing-panel {
          display: grid;
          gap: 14px;
        }
        .signs-image-wrap,
        .clearing-media {
          border-radius: 16px;
          overflow: hidden;
          background: rgba(255,255,255,0.05);
          min-height: 150px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .signs-image,
        .clearing-image {
          width: 100%;
          max-height: 220px;
          object-fit: cover;
          display: block;
        }
        .scene-image-placeholder {
          color: #9eb4cb;
          text-align: center;
          padding: 16px;
          font-size: 0.92rem;
        }
        .signs-button,
        .clearing-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 42px;
          padding: 10px 14px;
          border-radius: 999px;
          background: linear-gradient(135deg, rgba(111,168,220,0.88), rgba(183,166,255,0.86));
          color: #07111f;
          text-decoration: none;
          font-weight: 700;
        }
        .clearing-badges {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .clearing-badge {
          padding: 7px 10px;
          border-radius: 999px;
          background: rgba(255,255,255,0.08);
          color: #e5eefb;
          font-size: 0.82rem;
        }
      </style>
    `;
  }
};

document.addEventListener("DOMContentLoaded", () => {
  game.init();
});
