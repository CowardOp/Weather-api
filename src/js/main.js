const countries = [
  "",
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cabo Verde",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo (Congo-Brazzaville)",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czechia (Czech Republic)",
  "Democratic Republic of the Congo",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "España",
  "Estonia",
  "Eswatini (fmr. 'Swaziland')",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Ivory Coast",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar (formerly Burma)",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Korea",
  "North Macedonia",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestine",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Korea",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States of America",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Vatican City",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];
const result = document.getElementById("result");
const form = document.getElementById("getWeather");
const nameCity = document.getElementById("city");
const select = document.getElementById("country");

countries.forEach((allCountry) => {
  const option = document.createElement("option");
  option.value = allCountry.toLowerCase().replace(/ /g, "-");
  option.textContent = allCountry;
  select.appendChild(option);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (nameCity.value === "" || country.value === "") {
    showError("Ambos campos son obligatorios");
  }
  // console.log(city.value);
  // console.log(select.value);
  callAPI(city.value);
});
function callAPI(city, country) {
  const apiId = "0b5ef3dc4b424b3cb6b0bb6dc52b73ea";
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiId}`;
  // http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiId}}

  fetch(url)
    .then((data) => {
      return data.json();
    })
    .then((dataJSON) => {
      if (dataJSON.cod === "404") {
        showError("Ciudad no encontrada...");
      } else {
        showWeather(dataJSON);
      }
      // console.log(dataJSON);
    });
}
function showWeather(data) {
  const {
    name,
    main: { temp, temp_max, temp_min },
    weather: [arr],
  } = data;

  const degrees = kelvinConvert(temp);
  const max = kelvinConvert(temp_max);
  const min = kelvinConvert(temp_min);

  let cityName = añadir("cityName");
  let cityImg = añadir("cityImg");
  let cityTemp = añadir("cityTemp");
  let cityMaxTemp = añadir("cityMaxTemp");
  let cityMinTemp = añadir("cityMinTemp");

  cityName.textContent = `Clima de ${name}`;
  cityImg.src = `https://openweathermap.org/img/wn/${arr.icon}@2x.png`;
  cityImg.classList.remove("city-img");
  cityTemp.textContent = `${degrees}C°`;
  cityMaxTemp.textContent = `Max: ${max}C°`;
  cityMinTemp.textContent = `Min: ${min}C°`;

  cityTemp.classList.remove("color-blue", "color-warm", "color-yellow", "anim");
  cityMaxTemp.classList.remove(
    "color-blue",
    "color-warm",
    "color-yellow",
    "anim"
  );
  cityMinTemp.classList.remove(
    "color-blue",
    "color-warm",
    "color-yellow",
    "anim"
  );

  if (degrees <= 15 || max <= 15 || min <= 15) {
    cityTemp.classList.add("color-blue");
    cityMaxTemp.classList.add("color-blue");
    cityMinTemp.classList.add("color-blue");
  } else if (degrees >= 35 || max >= 35 || min >= 35) {
    cityTemp.classList.add("color-warm");
    cityMaxTemp.classList.add("color-warm");
    cityMinTemp.classList.add("color-warm");
  } else {
    cityTemp.classList.add("color-yellow");
    cityMaxTemp.classList.add("color-yellow");
    cityMinTemp.classList.add("color-yellow");
  }

  // console.log(name);
  // console.log(temp);
  // console.log(temp_max);
  // console.log(temp_min);
  // console.log(arr.icon);
}

function showError(message) {
  console.log(message);
  const alert = document.createElement("p");
  alert.classList.add("alert-message");
  alert.innerHTML = message;
  form.appendChild(alert);

  setTimeout(() => {
    alert.remove();
  }, 1000);
}

function kelvinConvert(temp) {
  return parseInt(temp - 273.15);
}

function añadir(clase) {
  let cambio = document.getElementById(clase);
  return cambio;
}
