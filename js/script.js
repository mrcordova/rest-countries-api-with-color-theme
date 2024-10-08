const dataReponse = await fetch(
  "https://restcountries.com/v3.1/all?fields=name,region,capital,population,flags"
);

const countries = document.querySelector(".countries");
const filterHolder = document.querySelector(".select-holder");
let selectCountries = document.querySelector(".select-items");
let inputSearch = document.querySelector("#search");
const mainEle = document.querySelector("main");
const themeBtn = document.querySelector(".dark-mode-btn");

const data = await dataReponse.json();
let countryFilterChoice = "";
let originalCountries;
const regionSet = new Set();

const template = document.getElementById("template");

function numberWithCommas(x) {
  x = String(x).replace(/,/g, "");
  return parseFloat(x).toLocaleString();
}
async function countryDetails(e) {
  const countryName = e.currentTarget.dataset.name;
  const countryDetailReponse = await fetch(
    `https://restcountries.com/v3.1/name/${countryName}?fields=name,population,subregion,region,capital,tld,currencies,languages,borders,flags`
  );
  const countryDetail = (await countryDetailReponse.json())[0];

  const firstClone = template.content.cloneNode(true);
  const backBtn = firstClone.querySelector(".back-btn");

  backBtn.addEventListener("click", (e) => {
    console.log("back btn click");
    countries.style.display = "";
    filterHolder.style.display = "";

    e.currentTarget.parentElement.remove();
  });
  const img = firstClone.querySelector("[data-country-detai-flag]");
  img.src = countryDetail.flags.svg;
  img.alt = countryDetail.flags.alt;

  const countryTitle = firstClone.querySelector("[data-country-detail-name]");
  countryTitle.textContent = countryName;

  const nativeName = firstClone.querySelector(
    "[data-country-detail-native-name]"
  );

  nativeName.textContent = Object.values(
    countryDetail.name.nativeName
  )[0].common;

  const pop = firstClone.querySelector("[data-country-detail-population]");
  pop.textContent = numberWithCommas(countryDetail.population);

  const region = firstClone.querySelector("[data-country-detail-region]");
  region.textContent = countryDetail.region;

  const subregion = firstClone.querySelector("[data-country-detail-subregion]");
  subregion.textContent = countryDetail.subregion;

  const capital = firstClone.querySelector("[data-country-detail-capital]");
  capital.textContent = countryDetail.capital;

  const tld = firstClone.querySelector("[data-country-detail-tld]");
  tld.textContent = `${countryDetail.tld.join(", ")}`;

  const currencies = firstClone.querySelector(
    "[data-country-detai-currencies]"
  );

  const currenciesName = Object.values(countryDetail.currencies).reduce(
    (arr, { name, symbol }) => {
      arr.push(name);
      return arr;
    },
    []
  );
  currencies.textContent = `${currenciesName.join(", ")}`;

  const languages = firstClone.querySelector("[data-country-detail-lang]");
  languages.textContent = Object.values(countryDetail.languages).join(", ");

  const borders = firstClone.querySelector("[ data-country-detail-borders]");

  if (countryDetail.borders.length !== 0) {
    const borderResponse = await fetch(
      `https://restcountries.com/v3.1/alpha?codes=${countryDetail.borders.join(
        ","
      )}`
    );

    const bordersArr = await borderResponse.json();
    for (const border of bordersArr) {
      const borderBtn = document.createElement("button");
      borderBtn.insertAdjacentText("beforeEnd", border.name.common);
      borderBtn.setAttribute("data-name", border.name.common);
      borderBtn.addEventListener("click", (e) => {
        document.querySelector(".country-detail").remove();
        countryDetails(e);
      });
      borders.appendChild(borderBtn);
    }
  }

  mainEle.appendChild(firstClone);
  countries.style.display = "none";
  filterHolder.style.display = "none";
}

for (const countryInfo of data) {
  countries.insertAdjacentHTML(
    "beforeend",
    ` <div data-region="${countryInfo.region}" data-name="${
      countryInfo.name.common
    }" class="country-card">
          <img class="flag-img" src="${countryInfo.flags.svg}" alt="${
      countryInfo.flags.alt == ""
        ? `flag_${countryInfo.name.common}`
        : countryInfo.flags.alt
    }" />
          <div class="card-desc">
          <h2 class="nunito-sans-800">${countryInfo.name.common}</h2>
          <p class="nunito-sans-600">
          Population
          <span class="nunito-sans-300">${numberWithCommas(
            countryInfo.population
          )}</span>
          </p>
          <p class="nunito-sans-600">
          Region:
          <span class="nunito-sans-300">${countryInfo.region}</span>
          </p>
          <p class="nunito-sans-600">
          Capital:
          <span class="nunito-sans-300">${countryInfo.capital}</span>
          </p>
          </div>
        </div>`
  );
  countries.lastElementChild.addEventListener("click", countryDetails);

  if (!regionSet.has(countryInfo.region)) {
    selectCountries.insertAdjacentHTML(
      "beforeend",
      `<div data-value="${countryInfo.region}">${countryInfo.region}</div>`
    );
    regionSet.add(countryInfo.region);
  }
}
originalCountries = countries.children;

let sorted = Array.from(selectCountries.children).sort((a, b) =>
  a.dataset.value.localeCompare(b.dataset.value)
);
selectCountries.replaceChildren(...sorted);
sorted[0].selected = true;

themeBtn.addEventListener("click", (e) => {
  document.documentElement.classList.toggle("dark-mode");
});
inputSearch.addEventListener("input", (e) => {
  // console.log(e.currentTarget.value);
  const currentStr = e.currentTarget.value.toLocaleLowerCase();
  // console.log(countryFilterChoice);
  Array.from(originalCountries).map((val) => {
    const countryName = val.dataset.name.toLocaleLowerCase();
    const region = val.dataset.region.toLocaleLowerCase();
    // console.log(region);
    if (
      countryName.startsWith(currentStr) &&
      (region == countryFilterChoice || countryFilterChoice == "")
    ) {
      val.style.display = "";
    } else {
      val.style.display = "none";
    }
    // if (
    //   (val.dataset.region.toLocaleLowerCase() !==
    //     option.textContent.toLocaleLowerCase() ||
    //     countryFilterChoice == "") &&
    //   (val.dataset.name.toLocaleLowerCase().startsWith(e.currentTarget.value) ||
    //     e.currentTarget.value == "")
    // ) {
    //   val.style.display = "flex";
    // } else if (
    //   !val.dataset.name.toLocaleLowerCase().startsWith(e.currentTarget.value)
    // ) {
    //   val.style.display = "none";
    // }
  });
});
// Get all custom select elements
let customSelects = document.querySelectorAll(".custom-select");

// Attach click event listeners to each custom select
customSelects.forEach(function (select) {
  let selectSelected = select.querySelector(".select-selected");
  let selectItems = select.querySelector(".select-items");
  let options = selectItems.querySelectorAll("div");

  // Toggle the dropdown visibility when the select box is clicked
  selectSelected.addEventListener("click", function () {
    if (selectItems.style.display === "block") {
      selectItems.style.display = "none";
    } else {
      selectItems.style.display = "block";
    }
  });

  // Set the selected option and hide the dropdown when an option is clicked
  options.forEach(function (option) {
    option.addEventListener("click", function () {
      countryFilterChoice = option.textContent.toLocaleLowerCase();
      Array.from(originalCountries).map((val) => {
        if (
          val.dataset.region.toLocaleLowerCase() ==
            option.textContent.toLocaleLowerCase() &&
          val.dataset.name
            .toLocaleLowerCase()
            .startsWith(inputSearch.value.toLocaleLowerCase())
        ) {
          val.style.display = "";
        } else {
          val.style.display = "none";
        }
      });

      // countries.replaceChildren(...filteredCountries);
      // console.log(originalCountries);
      // countryFilterChoice = option.textContent;
      selectSelected.firstElementChild.textContent = option.textContent;
      selectItems.style.display = "none";
    });
  });

  // Close the dropdown if the user clicks outside of it
  window.addEventListener("click", function (e) {
    if (!select.contains(e.target)) {
      selectItems.style.display = "none";
    }
  });
});
