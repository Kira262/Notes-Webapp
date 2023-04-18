// Preloader Thingy
var loader = document.getElementById("preloader");
window.addEventListener("load", function () {
  loader.style.display = "none";
});
// Live Date Thing

function updateDate() {
  var d = new Date();
  var options = {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  var formattedDate = d.toLocaleString("en-US", options);
  document.querySelector("#date").textContent = formattedDate;
}

updateDate();

setInterval(updateDate, 500);
// Weather App Thingy

const form = document.querySelector("form");
const input = document.querySelector("input");
const weatherDiv = document.getElementById("weather");
const apiKey = "c0ee70f6e6b307782e98c5d58a5453f7";

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const city = input.value.trim();

  // Make API call
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // Update the HTML with the weather information
      const temperature = data.main.temp;
      const description = data.weather[0].description;
      weatherDiv.innerHTML = `Temperature: ${temperature} &deg;C<br> Weather: ${description}`;
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
      weatherDiv.innerHTML = "Unable to get weather information.";
    });
});

// Suggestion thing

function suggestCitiesAndFetchWeather(input) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/find?q=${input}&type=like&sort=population&appid=${apiKey}`;
  let suggestions = [];

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      data.list.forEach((city) => {
        suggestions.push(city.name);
      });
      if (input.value.trim().length > 0) {
        // Update the interface with the suggested cities
      } else {
        // Clear the interface if the input field is empty
      }
    })
    .catch((error) => console.log(error));

  // Fetch weather data for the entered city
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const city = input.value.trim();

    // Make API call
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Update the HTML with the weather information
        const temperature = data.main.temp;
        const description = data.weather[0].description;
        weatherDiv.innerHTML = `Temperature: ${temperature} &deg;C<br> Weather: ${description}`;
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
        weatherDiv.innerHTML = "Unable to get weather information.";
      });
  });

  // Add event listener for input changes
  input.addEventListener("input", () => {
    const inputText = input.value.trim();
    if (inputText.length > 0) {
      // Call suggestCities to get suggestions
      fetch(
        `https://api.openweathermap.org/data/2.5/find?q=${inputText}&type=like&sort=population&appid=${apiKey}`
      )
        .then((response) => response.json())
        .then((data) => {
          // Update the interface with the suggested cities
          const citySuggestions = data.list.map((city) => city.name);
          console.log(citySuggestions);
        })
        .catch((error) => console.log(error));
    } else {
      // Clear the interface if the input field is empty
    }
  });
}
