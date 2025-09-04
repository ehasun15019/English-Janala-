const loadLessons = () => {
  const url = "https://openapi.programming-hero.com/api/levels/all";

  fetch(url)
    .then((res) => {
      return res.json();
    })

    .then((json) => {
      displayLessons(json.data);
    });
};

loadLessons();

const wordsLevel = (levelNo) => {
  const url = `https://openapi.programming-hero.com/api/level/${levelNo}`;

  fetch(url)
    .then((res) => {
      return res.json();
    })

    .then((data) => {
      displayWords(data.data);
    });
};

// show lesson button functionality
const displayLessons = (lessons) => {
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";

  lessons.forEach((lesson) => {
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
      <button class="lesson_btn btn btn-outline btn-primary flex items-center gap-2">
        <i class="fa-solid fa-book-open"></i>
        Lesson - ${lesson.level_no}
      </button>
    `;
    levelContainer.append(btnDiv);

    // active button and onClick functionality
    const lesson_btn = btnDiv.querySelector(".lesson_btn");

    lesson_btn.addEventListener("click", () => {
      // remove active class from all buttons
      document.querySelectorAll(".lesson_btn").forEach((b) => {
        b.classList.remove("bg-primary", "text-white");
        b.classList.add("btn-outline");
      });

      // add active class to clicked button
      lesson_btn.classList.add("bg-primary", "text-white");
      lesson_btn.classList.remove("btn-outline");

      // load words
      wordsLevel(lesson.level_no);
    });
  });
};

// show words functionality
const displayWords = (words) => {
  const wordsContainer = document.getElementById("word-container");
  wordsContainer.innerHTML = "";

  if (!words || words.length === 0) {
    wordsContainer.innerHTML = `
      <div class="flex flex-col justify-center items-center col-span-3 ">
        <img src="./assets/alert-error.png">
        <p class="font-semibold text-[0.9rem]">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
        <h2 class="text-2xl">নেক্সট Lesson এ যান</h2>
      </div>
    `;
    return;
  }

  words.forEach((word) => {
    const wordDiv = document.createElement("div");

    wordDiv.classList.add(
      "card",
      "p-5",
      "m-2",
      "shadow",
      "bg-gray-100",
      "text-black",
      "flex",
      "flex-col",
      "items-center",
      "gap-2",
      "w-full",
      "sm:w-[250px]",
      "md:w-[300px]"
    );

    wordDiv.innerHTML = `
      <h3 class="text-lg font-bold">${word.word}</h3>
      <p><b>Meaning:</b> ${word.meaning || "N/A"}</p>
      <p><b>Pronunciation:</b> ${word.pronunciation || "N/A"}</p>

      <div class="flex justify-end w-full mt-2">
        <i class="fa-solid fa-volume-high cursor-pointer sound-icon"></i>
      </div>
    `;
    wordsContainer.append(wordDiv);

    // for sound functionality
    const soundBtn = wordDiv.querySelector(".sound-icon");
    soundBtn.addEventListener("click", () => {
      let speech = new SpeechSynthesisUtterance(word.word);
      speech.lang = "en-US";
      window.speechSynthesis.speak(speech);
    });
  });
};
