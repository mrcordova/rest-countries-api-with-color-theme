const dataReponse = await fetch(
  "https://restcountries.com/v3.1/all?fields=name,region,capital,population,flags"
);
const countries = document.querySelector(".countries");
let selectCountries = document.querySelector("#country-select");
// const dataReponse = await fetch("https://restcountries.com/v3.1/all");
const data = await dataReponse.json();
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
    ` <div class="country-card">
          <img src="${countryInfo.flags.svg}" alt="flag_${
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
      `<option value="${countryInfo.region}">${countryInfo.region}</option>`
    );
    regionSet.add(countryInfo.region);
  }
}
let sorted = Array.from(selectCountries.children).sort((a, b) =>
  a.value.localeCompare(b.value)
);

selectCountries.replaceChildren(...sorted);
sorted[0].selected = true;
// for (const opt of sorted) {
//   selectCountries.appendChild(opt);
// }
// sorted[0].selected = true;

// console.log(data);
