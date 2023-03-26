const convertBtn = document.querySelector("#bionicConverterBtn");
const input = document.querySelector("#inputText");
const output = document.querySelector("#outputText");

const outputTextColor = document.querySelector("#outputTextColor");
const outputBgColor = document.querySelector("#outputBgColor");
const outputTextSize = document.querySelector("#outputTextSize");

const inputFile = document.querySelector("#inputFile");

const docSize = document.querySelector("#outputDocSize");

convertBtn.onmousedown = function () {
  convertBtn.style.transform = "scale(.95)";
};

convertBtn.onmouseup = function () {
  convertBtn.style.transform = "scale(1)";
};

convertBtn.onmouseover = function () {
  convertBtn.style.transform = "scale(1.05)";
};

convertBtn.onmouseleave = function () {
  convertBtn.style.transform = "scale(1)";
};

docSize.ondblclick = function () {
  output.style.height = 10 + "vh";
  output.style.width = 50 + "vw";
  docSize.value = 24;
};

outputTextSize.ondblclick = function () {
  output.style.height = 10 + "vh";
  output.style.width = 50 + "vw";
  output.style.fontSize = 24 + "px";
  outputTextSize.value = 24;
};

docSize.oninput = function () {
  if (docSize.value > 24) {
    output.style.height = docSize.value * 1.9 + "vh";
    output.style.width = docSize.value * 1.9 + "vw";
    output.style.marginTop = 1.5 + "rem";
  } else if (docSize.value < 24) {
    output.style.height = docSize.value * 1.9 + "vh";
    output.style.width = docSize.value * 1.9 + "vw";
    output.style.marginTop = 1.5 + "rem";
  }
};

inputFile.onchange = function () {
  input.value = "";
  const file = inputFile.files[0];
  const reader = new FileReader();

  reader.onload = function () {
    input.value = reader.result;
    console.dir(reader.result);
  };

  reader.readAsText(file);
};

outputBgColor.oninput = function () {
  output.style.background = outputBgColor.value;
};

outputTextColor.oninput = function () {
  output.style.color = outputTextColor.value;
};

outputTextSize.oninput = function () {
  output.style.fontSize = outputTextSize.value + "px";
  output.style.marginTop = 1.5 + "rem";
};

let bioReadBtnCount = 0;
let originalText;
let words;

convertBtn.onclick = function () {
  const lines = input.value.split("\n"); // split text into separate lines

  let wordCount = 0;

  for (let i = 0; i < lines.length; i++) {
    const words = lines[i].trim().split(" "); // split each line into separate words

    for (let j = 0; j < words.length; j++) {
      const word = words[j];
      const halfLength = Math.floor(word.length / 2);
      const boldWord =
        "<b>" + word.substr(0, halfLength) + "</b>" + word.substr(halfLength);
      words[j] = boldWord;
      wordCount++;
    }

    lines[i] = words.join(" ");
  }

  const formattedText = lines.join("\n"); // join lines back together

  output.innerHTML = formattedText;

  // Adjust the height of the output box based on the number of words

  if (wordCount > 0 && wordCount < 80) {
    output.style.height = wordCount / 1.1 + "vh";
  } else if (wordCount > 79) {
    output.style.height = "85vh";
  }
  if (output.innerText == "") {
    output.style.height = "10vh";
    output.style.width = "50vw";
  }
};
