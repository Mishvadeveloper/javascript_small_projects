const pwEl = document.getElementById("pw");
const copyEl = document.getElementById("copy");
const lenEl = document.getElementById("length");
const stringEl = document.getElementById("string");
const upperEl = document.getElementById("upper");
const lowerEl = document.getElementById("lower");
const numberEl = document.getElementById("number");
const symbolEl = document.getElementById("symbol");
const generateEl = document.getElementById("generate");
const resetEl = document.getElementById("reset");

// Characters for generating password
const upperLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerLetters = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()_+=";

function getRandomChar(set) {
  return set[Math.floor(Math.random() * set.length)];
}

// Main function to generate a password
function generatePassword() {
  const length = parseInt(lenEl.value) || 6; // default length 6 if not given
  const userString = stringEl.value;
  const availableLength = length - userString.length;

  if (availableLength <= 0) {
    alert("The user string is too long. Please choose a shorter string.");
    return;
  }

  const charSets = [];
  if (upperEl.checked) charSets.push(upperLetters);
  if (lowerEl.checked) charSets.push(lowerLetters);
  if (numberEl.checked) charSets.push(numbers);
  if (symbolEl.checked) charSets.push(symbols);

  if (charSets.length === 0) {
    alert("Please select at least one character type.");
    return;
  }
  let password = userString;
  for (let i = 0; i < availableLength; i++) {
    const randomSet = charSets[Math.floor(Math.random() * charSets.length)];
    password += getRandomChar(randomSet);
  }

  pwEl.innerText = password;
}

generateEl.addEventListener("click", generatePassword);

copyEl.addEventListener("click", () => {
  const password = pwEl.innerText;

  if (!password) {
    alert("No password to copy!");
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
  alert("Password copied to clipboard");
});

// reset all fields and checkbox
resetEl.addEventListener("click", () => {
  lenEl.value = "";
  stringEl.value = "";
  upperEl.checked = false;
  lowerEl.checked = false;
  numberEl.checked = false;
  symbolEl.checked = false;
  pwEl.innerText = "Copy Password";
});
