let select = document.querySelector(".select-heading");
let arrow = document.querySelector(".select-heading img");
let options = document.querySelector(".options");
let option = document.querySelectorAll(".option");
let selecttext = document.querySelector(".select-heading span");

select.addEventListener("click", () => {
  options.classList.toggle("active-options");
  arrow.classList.toggle("rotate");
});

option.forEach((item) => {
  item.addEventListener("click", () => {
    selecttext.innerText = item.innerText;
  });
});

// --------->// chat bot code //<---------- //

let prompt = document.querySelector(".prompt");
let chatbtn = document.querySelector(".input-area button");
let chatcontainer = document.querySelector(".chat-container");
let h1 = document.querySelector(".h1");
let chatimg = document.querySelector(".chatbot");
let chatbox = document.querySelector(".chat-box");

let userMessage = "";

chatimg.addEventListener("click", () => {
  chatbox.classList.toggle("active-chat-box");
  if (chatbox.classList.contains("active-chat-box")) {
    chatimg.src = "cross.svg";
  } else {
    chatimg.src = "chatbot.svg";
  }
});

let Api_url =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyCJXgL2p60E8oPOtmAeiYaZHR_GeL9EeOc";

async function generateApiResponse(aiChatBox) {
  const textElement = aiChatBox.querySelector(".text");
  try {
    const response = await fetch(Api_url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: `${userMessage} in 10 words` }],
          },
        ],
      }),
    });
    const data = await response.json();
    const apiResponse = data?.candidates[0].content.parts[0].text.trim();
    textElement.innerText = apiResponse;
  } catch (error) {
    console.log(error);
  } finally {
    aiChatBox.querySelector(".loading").style.display = "none";
  }
}

function createChatBox(html, className) {
  const div = document.createElement("div");
  div.classList.add(className);
  div.innerHTML = html;
  return div;
}

chatbtn.addEventListener("click", () => {
  h1.style.display = "none";
  userMessage = prompt.value;
  const html = `<p class="text">${userMessage}</p>`;
  let userChatBox = createChatBox(html, "user-chat-box");
  userChatBox.querySelector(".text").innerText = userMessage;
  chatcontainer.appendChild(userChatBox);
  prompt.value = "";
  setTimeout(showLoading, 500);
});

prompt.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    h1.style.display = "none";
    userMessage = prompt.value;
    const html = `<p class="text">${userMessage}</p>`;
    let userChatBox = createChatBox(html, "user-chat-box");
    userChatBox.querySelector(".text").innerText = userMessage;
    chatcontainer.appendChild(userChatBox);
    prompt.value = "";
    setTimeout(showLoading, 500);
  }
});

function showLoading() {
  const html = `<p class="text"></p>
   <img src="load.svg" class="loading" width="10px">`;
  let aiChatBox = createChatBox(html, "ai-chat-box");
  chatcontainer.appendChild(aiChatBox);
  generateApiResponse(aiChatBox);
}

// ----------virtual assistant------------- //

let ai = document.querySelector(".virtual-assistant img");
let speakpage = document.querySelector(".speak-page");
let content = document.querySelector(".speak-page h1");

function speak(text) {
  let text_speak = new SpeechSynthesisUtterance(text);
  text_speak.rate = 1.2;
  text_speak.pitch = 10.5;
  text_speak.volume = 10.3;
  text_speak.lang = "hi-GB";
  window.speechSynthesis.speak(text_speak);
}

let speecrecognition =
  window.SpeecRecognition || window.webkitSpeechRecognition;
let recogination = new speecrecognition();
recogination.onresult = (event) => {
  speakpage.style.display = "none";
  let currentIndex = event.resultIndex;
  let transcript = event.results[currentIndex][0].transcript;
  content.innerText = transcript;
  takeCommand(transcript.toLowerCase());
};

function takeCommand(message) {
  if (message.includes("open") || message.includes("chat")) {
    speak("Chat bot is opening sir");
    chatbox.classList.add("active-chat-box", "_self");
  } else if (message.includes("close") || message.includes("chat")) {
    speak("Chat bot is closeing sir");
    chatbox.classList.remove("active-chat-box");
  } else if (message.includes("action", "_self")) {
    speak("opening action anime recommendation sir");
    window.o("action.html", "_self");
  } else if (message.includes("funny") || message.includes("comedy")) {
    speak("opening funny anime recommendation sir");
    window.open("funny.html", "_self");
  } else if (message.includes("romance") || message.includes("romantic")) {
    speak("opening romance anime recommendation sir");
    window.open("Romance.html", "_self");
  } else if (message.includes("shounen")) {
    speak("opening romance shounen recommendation sir");
    window.open("shounen.html", "_self");
  } else if (
    message.includes("slice of life") ||
    message.includes("relateble")
  ) {
    speak("opening slice of life anime recommendation sir");
    window.open("Slice of Life.html", "_self");
  } else if (message.includes("home") || message.includes("anime")) {
    speak("opening home page sir");
    window.open("index.html", "_self");
  } else if (message.includes("hello") || message.includes("yoooo")) {
    speak("hii sir, how can i help you?");
  } else if (message.includes("who are you") || message.includes("hu r u")) {
    speak(" i am reco, created by Ashish sir");
  } else if (message.includes("reco")) {
    speak("yes sir");
  } else if (message.includes("reco")) {
    speak("heyy sir how's your day ?");
  } else if (message.includes("open youtube")) {
    speak("opening youtube...");
    window.open("https://www.youtube.com", "_blank");
  } else if (message.includes("open instagram")) {
    speak("opening instagram...");
    window.open("https://www.instagram.com", "_blank");
  } else if (message.includes("open facebook", "_blank")) {
    speak("opening facebook...");
    window.open("https://www.facebook.com", "_blank");
  } else if (message.includes("open google")) {
    speak("opening google...");
    window.open("https://www.google.com", "_blank");
  } else if (message.includes("open whatsapp")) {
    speak("opening whatsapp...");
    window.open("https://web.whatsapp.com/");
  } else if (message.includes("open calculator")) {
    speak("do it your self...");
  } else if (message.includes("time")) {
    let time = new Date().toLocaleDateString(undefined, {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });
    speak(time);
  } else if (message.includes("date")) {
    let date = new Date().toLocaleDateString(undefined, {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    speak(date);
  } else {
    const query = message.replace("reco", "").trim();
    speak(`This is what I found on the internet regarding ${query}`);
    window.open(
      `https://www.google.com/search?q=${message.replace("reco", "")}`
    );
  }
}

ai.addEventListener("click", () => {
  recogination.start();
  speakpage.style.display = "flex";
});
