const dataReponse = await fetch(
  "https://restcountries.com/v3.1/all?fields=name,region,capital,population,flags"
);
const countries = document.querySelector(".countries");
// const dataReponse = await fetch("https://restcountries.com/v3.1/all");
const data = await dataReponse.json();

function countryDetails(e) {
  console.log(e.currentTarget);
}
for (const countryInfo of data) {
  // console.log(countryInfo);
  countries.insertAdjacentHTML(
    "beforeend",
    ` <div class="country-card">
          <img src="${countryInfo.flags.svg}" alt="flag" />
          <h2 class="nunito-sans-800">${countryInfo.name.common}</h2>
          <p class="nunito-sans-600">
            Population
            <span class="nunito-sans-300">${countryInfo.population}</span>
          </p>
          <p class="nunito-sans-600">
            Region:
            <span class="nunito-sans-300">${countryInfo.region}</span>
          </p>
          <p class="nunito-sans-600">
            Capital:
            <span class="nunito-sans-300">${countryInfo.capital}</span>
          </p>
        </div>`
  );
  countries.lastElementChild.addEventListener("click", countryDetails);
}
// console.log(data);
