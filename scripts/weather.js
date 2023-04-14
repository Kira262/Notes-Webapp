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

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const city = input.value.trim();

  // Make API call
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c0ee70f6e6b307782e98c5d58a5453f7&units=metric`
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
      weatherDiv.innerHTML = `Temperature: ${temperature}&deg;C<br> Description: ${description}`;
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
      weatherDiv.innerHTML = "Unable to get weather information.";
    });
});
