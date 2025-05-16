const verseData = {
  verseId: "haazinu-1",
  title: "Haazinu Verse 1",
  segments: [
    {
      type: "tapStart",
      text: "ready?!<br/>repeat<br/>after me..."
    },
    {
      type: "tutorial",
      videoUrl: "https://drive.google.com/uc?export=download&id=18Ro63COwQLXmHgpqNfhMLG6_RSVHkz-n"
    },
    {
      type: "yourTurn",
      text: "your turn..."
    },
    {
      type: "repetition",
      cards: [
        {
          hebrew: "לוּ חָכְמוּ",
          transliteration: "loo chachemu",
          audioUrl: "https://drive.google.com/uc?export=download&id=1wfD1IqXflzWnJILbY3hcpPTfPQUMaEl7",
          highlightIndex: 0
        },
        {
          hebrew: "יַשְׂכִּילוּ",
          transliteration: "yashkilu",
          audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
          highlightIndex: 1
        },
        {
          hebrew: "זֹאת",
          transliteration: "zot",
          audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
          highlightIndex: 2
        }
      ]
    },
    {
      type: "outro",
      text: "Nice work. Ready for the next one?"
    }
  ]
};

let segmentIndex = 0;
let repetitionIndex = 0;
let shouldAutoPlayVideo = false;

function render() {
  const app = document.getElementById("app");
  const segment = verseData.segments[segmentIndex];
  app.innerHTML = "";

  // TAP START SCREEN
  if (segment.type === "tapStart") {
    const textDiv = document.createElement("div");
    textDiv.innerHTML = `<h2 style="font-size: 2em; margin-bottom: 1em;">${segment.text}</h2>`;
    textDiv.style.textAlign = "center";
    app.appendChild(textDiv);
  
    const nextBtn = document.createElement("button");
    nextBtn.textContent = "ok!";
    nextBtn.id = "next-button";
    nextBtn.onclick = () => {
      const video = document.createElement("video");
      const nextSegment = verseData.segments[segmentIndex + 1];
      video.src = nextSegment.videoUrl;
      video.playsInline = true;
      video.controls = false;
      video.autoplay = false;
      video.muted = false;
      video.style.width = "100%";
      video.style.maxWidth = "320px";
      video.style.aspectRatio = "9 / 16";
      video.style.objectFit = "cover";
  
      video.addEventListener("ended", () => {
        segmentIndex += 2; // skip tapStart and tutorial (already handled)
        render();
      });
  
      app.innerHTML = "";
      app.appendChild(video);
  
      video.play().catch(err => {
        console.warn("Autoplay failed:", err);
      });
    };
    app.appendChild(nextBtn);
    return;
  }

  // TUTORIAL VIDEO
  if (segment.type === "tutorial") {
    const video = document.createElement("video");
    video.src = segment.videoUrl;
    video.playsInline = true;
    video.controls = false;
    video.autoplay = false;
    video.style.width = "100%";
    video.style.maxWidth = "320px";
    video.style.aspectRatio = "9 / 16";
    video.style.objectFit = "cover";

    video.addEventListener("canplay", () => {
      video.muted = false;
      if (shouldAutoPlayVideo) {
        video.play().catch(err => {
          console.warn("Autoplay failed:", err);
        });
        shouldAutoPlayVideo = false;
      }
    });

    video.addEventListener("ended", () => {
      segmentIndex++;
      render();
    });

    app.appendChild(video);
    return;
  }

  // INTRO / OUTRO TEXT
  if (segment.type === "intro" || segment.type === "outro") {
    const div = document.createElement("div");
    div.innerHTML = `<h2>${segment.text}</h2>`;
    app.appendChild(div);
  }

  // REPETITION PHASE
  if (segment.type === "repetition") {
    const wrapper = document.createElement("div");
    wrapper.className = "card";

    segment.cards.forEach((card, index) => {
      const isCurrent = index === repetitionIndex;

      const wordDiv = document.createElement("div");
      wordDiv.className = "hebrew" + (isCurrent ? " highlight" : "");
      wordDiv.textContent = card.hebrew;
      wrapper.appendChild(wordDiv);

      const translitDiv = document.createElement("div");
      translitDiv.className = "translit" + (isCurrent ? " highlight" : "");
      translitDiv.textContent = card.transliteration;
      wrapper.appendChild(translitDiv);
    });

    const playBtn = document.createElement("button");
    playBtn.textContent = "Play Sound";
    playBtn.onclick = () => playAudio();
    app.appendChild(wrapper);
    app.appendChild(playBtn);
  }

  // GLOBAL NEXT BUTTON (skip for tutorial)
  if (!["tutorial"].includes(segment.type)) {
    const nextBtn = document.createElement("button");
    nextBtn.textContent = segment.type === "tapStart" ? "ok!" : "Next";
    nextBtn.id = "next-button";
    nextBtn.onclick = () => nextStep();
    app.appendChild(nextBtn);
  }
}

function nextStep() {
  const segment = verseData.segments[segmentIndex];

  if (segment.type === "repetition") {
    if (repetitionIndex < segment.cards.length - 1) {
      repetitionIndex++;
    } else {
      repetitionIndex = 0;
      segmentIndex++;
    }
  } else {
    segmentIndex++;
  }

  if (segmentIndex >= verseData.segments.length) {
    segmentIndex = 0;
  }

  render();
}

function playAudio() {
  const card = verseData.segments[segmentIndex].cards[repetitionIndex];
  const audio = new Audio(card.audioUrl);
  audio.play();
}

window.onload = render;