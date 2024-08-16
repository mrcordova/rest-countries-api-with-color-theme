const dataReponse = await fetch(
  "https://restcountries.com/v3.1/all?fields=name,region,capital,population,flags"
);
const countries = document.querySelector(".countries");
let selectCountries = document.querySelector(".select-items");

// console.log(selectCountries);
// const dataReponse = await fetch("https://restcountries.com/v3.1/all");
const data = await dataReponse.json();
let countryFilterChoice = "";
let originalCountries;
const regionSet = new Set();
function countryDetails(e) {
  console.log(e.currentTarget);
}
function numberWithCommas(x) {
  x = String(x).replace(/,/g, "");
  return parseFloat(x).toLocaleString();
}
for (const countryInfo of data) {
  // console.log(countryInfo);
  countries.insertAdjacentHTML(
    "beforeend",
    ` <div data-region="${countryInfo.region}" data-name="${
      countryInfo.name.common
    }" class="country-card">
          <img class="flag-img" src="${countryInfo.flags.svg}" alt="flag_${
      countryInfo.name.common
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

// console.log(selectCountries);
let sorted = Array.from(selectCountries.children).sort((a, b) =>
  a.dataset.value.localeCompare(b.dataset.value)
);
selectCountries.replaceChildren(...sorted);
sorted[0].selected = true;

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
      Array.from(originalCountries).map((val) => {
        if (
          val.dataset.region.toLocaleLowerCase() !==
          option.textContent.toLocaleLowerCase()
        ) {
          val.style.display = "none";
        } else {
          val.style.display = "";
        }
      });

      // countries.replaceChildren(...filteredCountries);
      console.log(originalCountries);
      countryFilterChoice = option.textContent;
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

// for (const opt of sorted) {
//   selectCountries.appendChild(opt);
// }
// sorted[0].selected = true;

// console.log(data);
