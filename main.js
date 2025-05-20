const verseData = {
  verseId: "haazinu-1",
  title: "Haazinu Verse 1",
  segments: [
    {
      type: "startPhrase",
      text: "ready?!<br/>repeat<br/>after me..."
    },
    {
      type: "tutorial",
      videoUrl: "gs://bmbootcamp-e38fb.firebasestorage.app/video_files/Haz_5_29_part_1.mp4"
    },
    {
      type: "instruction",
      text: "your turn..."
    },
    {
      type: "repetition",
      cards: [
        {
          hebrew: "לוּ חָכְמוּ",
          transliteration: "loo chachemu",
          audioUrl: "gs://bmbootcamp-e38fb.firebasestorage.app/audio_files/Haz_5_29_audio_part_1.m4a",
          highlightIndex: 0
        },
        {
          hebrew: "יַשְׂכִּילוּ",
          transliteration: "yashkilu",
          audioUrl: "gs://bmbootcamp-e38fb.firebasestorage.app/audio_files/Haz_5_29_audio_part_2.m4a",
          highlightIndex: 1
        },
        {
          hebrew: "זֹאת",
          transliteration: "zot",
          audioUrl: "gs://bmbootcamp-e38fb.firebasestorage.app/audio_files/Haz_5_29_audio_part_3.m4a",
          highlightIndex: 2
        }
      ]
    },
    {
      type: "startPhrase",
      text: "Nice work. Ready for the next one?"
    },
    {
      type: "tutorial",
      videoUrl: "gs://bmbootcamp-e38fb.firebasestorage.app/video_files/Haz_5_29_part_2.mp4"
    },
    {
      type: "instruction",
      text: "your turn..."
    },
    {
      type: "repetition",
      cards: [
        {
          hebrew: "יָבִ֖ינוּ",
          transliteration: "yavinu",
          audioUrl: "gs://bmbootcamp-e38fb.firebasestorage.app/audio_files/Haz_5_29_tutorial_2_audio_1.m4a",
          highlightIndex: 0
        },
        {
          hebrew: "לְאַחֲרִיתָֽם׃",
          transliteration: "la'acharitam",
          audioUrl: "gs://bmbootcamp-e38fb.firebasestorage.app/audio_files/Haz_5_29_tutorial_2_audio_2.m4a",
          highlightIndex: 1
        },
      ]
    },
    {
      type: "startPhrase",
      text: "now the whole thing together..."
    },
    {
      type: "tutorial",
      videoUrl: "gs://bmbootcamp-e38fb.firebasestorage.app/video_files/Haz_5_29_tutorial_3.mp4"
    },
    {
      type: "instruction",
      text: "your turn..."
    },
    {
      type: "repetition",
      cards: [
        {
          hebrew: "ל֥וּ חָכְמ֖וּ יַשְׂכִּ֣ילוּ זֹ֑את",
          transliteration: "loo chachemu yashkilu zot",
          audioUrl: "gs://bmbootcamp-e38fb.firebasestorage.app/audio_files/Haz_5_29_tutorial_3_audio_1.m4a",
          highlightIndex: 0
        },
        {
          hebrew: "יָבִ֖ינוּ לְאַחֲרִיתָֽם",
          transliteration: "yavinu la'acharitam",
          audioUrl: "gs://bmbootcamp-e38fb.firebasestorage.app/audio_files/Haz_5_29_tutorial_3_audio_2.m4a",
          highlightIndex: 1
        }
      ]
    },
    {
      type: "outro",
      text: "🔥"
    }
  ]
};

let segmentIndex = 0;
let repetitionIndex = 0;
let shouldAutoPlayVideo = false;


async function applyHighlightBackground(gsUrl) {
  try {
    console.log("Starting applyHighlightBackground");
    const storageRef = storage.refFromURL(gsUrl);
    const downloadURL = await storageRef.getDownloadURL();
    console.log("Got download URL:", downloadURL);

    // Add a style element to the document head with the background styling
    const style = document.createElement('style');
    style.textContent = `
      .highlight {
        background: linear-gradient(0deg, rgba(240, 188, 43, 0.55) 0%, rgba(240, 188, 43, 0.55) 100%), url('${downloadURL}') lightgray 50% / cover no-repeat !important;
        background-clip: text !important;
        -webkit-background-clip: text !important;
        color: transparent !important;
      }
    `;
    document.head.appendChild(style);
    console.log("Style element added to head");

    // Check if elements with .highlight class exist
    const highlightElements = document.querySelectorAll('.highlight');
    console.log("Number of .highlight elements found:", highlightElements.length);
  } catch (error) {
    console.error("Error applying highlight background:", error);
  }
}

window.onload = () => {
  render(); // Ensure this is called if needed
  applyHighlightBackground('gs://bmbootcamp-e38fb.appspot.com/assets/Rough-Chiseled-1A1-e1381839098947.jpeg');
}

function render() {
  const app = document.getElementById("app");
  const segment = verseData.segments[segmentIndex];
  app.innerHTML = "";

  //  START A New Phrase
  if (segment.type === "startPhrase") {
    const textDiv = document.createElement("div");
    textDiv.innerHTML = `<h2 style="font-size: 3em; margin-bottom: 1em;">${segment.text}</h2>`;
    textDiv.style.textAlign = "center";
    app.appendChild(textDiv);
  
    const nextBtn = document.createElement("button");
    nextBtn.textContent = "ok!";
    nextBtn.id = "next-button";
    nextBtn.className = "button_text";
    nextBtn.onclick = async () => {
      const video = document.createElement("video");
      const nextSegment = verseData.segments[segmentIndex + 1];

      // Fetch video URL from Firebase Storage
      try {
        const videoRef = storage.refFromURL(nextSegment.videoUrl);
        const videoUrl = await videoRef.getDownloadURL();
        video.src = videoUrl;
      } catch (error) {
        console.error("Error fetching video URL:", error);
        return;
      }

      video.playsInline = true;
      video.controls = false;
      video.autoplay = false;
      video.muted = false;

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

  // Instruction
  if (segment.type === "instruction") {
    const textDiv = document.createElement("div");
    textDiv.innerHTML = `<h2 style="font-size: 3em; margin-bottom: 1em;">${segment.text}</h2>`;
    textDiv.style.textAlign = "center";
    app.appendChild(textDiv);

    const nextBtn = document.createElement("button");
    nextBtn.textContent = "Next";
    nextBtn.id = "next-button";
    nextBtn.onclick = () => nextStep();
    app.appendChild(nextBtn);
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
  const segment = verseData.segments[segmentIndex];
  const card = segment.cards[repetitionIndex];

  // Fetch audio URL from Firebase Storage
  try {
    const audioRef = storage.refFromURL(card.audioUrl);
    audioRef.getDownloadURL().then((url) => {
      const audio = new Audio(url);
      audio.play().catch(err => {
        console.error("Error playing audio:", err);
      });
    }).catch(err => {
      console.error("Error fetching audio URL:", err);
    });
  } catch (error) {
    console.error("Error with audio URL:", error);
  }
}

window.onload = render;