const form = document.querySelector("form");
const resultDiv = document.querySelector(".result");
const sound = document.getElementById("sound");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  getWordInfo(form.elements[0].value);
});
resultDiv.innerHTML = `<strong>Chalo Kuchh Search Karo...</strong>`;
async function getWordInfo(word) {
  try {
    resultDiv.innerHTML = `<strong>Ruko Jara Sabar Karo...</strong>`;
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
    const data = await response.json();
    let definitions = data[0].meanings[0].definitions[0];
    resultDiv.innerHTML = `
    <h2><strong>Word: </strong>${data[0].word}</h2>
    <p class="partOfSpeech">${data[0].meanings[0].partOfSpeech}</p>
    <p><strong>Meaning: </strong>${
      definitions.definition === undefined
        ? "Not Found"
        : definitions.definition
    }</p>
    <p><strong>Example: </strong>${
      definitions.example === undefined ? "Not Found" : definitions.example
    }</p>
    `;
    if (data[0].meanings[0].synonyms.length === 0) {
        resultDiv.innerHTML+=`<p><strong>Synonyms: </strong></p>`
      resultDiv.innerHTML += `<span>Not Found</span>`;
    } else {
        resultDiv.innerHTML+=`<p><strong>Synonyms: </strong></p>`
      for (let i = 0; i < data[0].meanings[0].synonyms.length; i++) {
        resultDiv.innerHTML += `<li>${data[0].meanings[0].synonyms[i]}</li>`;
      }
    }
    if (data[0].meanings[0].antonyms.length === 0) {
        resultDiv.innerHTML+=`<p><strong>Antonyms: </strong></p>`
      resultDiv.innerHTML += `<span>Not Found</span>`;
    } else {
        resultDiv.innerHTML+=`<p><strong>Antonyms: </strong></p>`
      for (let i = 0; i < data[0].meanings[0].antonyms.length; i++) {
        resultDiv.innerHTML += `<li>${data[0].meanings[0].antonyms[i]}</li>`;
      }
    }
    resultDiv.innerHTML += `<div><a href=${data[0].sourceUrls} target="_blank">Read More</a></div>`;
    resultDiv.innerHTML +=
      // `<audio controls src=${data[0].phonetics[0].audio}></audio>`
      data[0].phonetics[0].audio === ""
        ? `<p>No pronounciation available</p>`
        : `<audio controls src=${data[0].phonetics[0].audio}></audio>`;

    console.log(data);
  } catch (error) {
    resultDiv.innerHTML = `<p>Spelling Check Kar...</p>`;
  }
}
