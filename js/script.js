const dataReponse = await fetch(
  "https://restcountries.com/v3.1/all?fields=name,region,capital,population,flags"
);
const countries = document.querySelector(".countries");
// const dataReponse = await fetch("https://restcountries.com/v3.1/all");
const data = await dataReponse.json();

for (const countryInfo of data) {
  console.log(countryInfo);
}
// console.log(data);
