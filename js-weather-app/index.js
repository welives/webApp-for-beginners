const config = {
  key: '681acf542ae4967f3b6432891c3f47a8',
  base_url: 'https://api.openweathermap.org/data/2.5/',
}

const search = document.querySelector('.search-bar')
search.addEventListener('keypress', setQuery)

function setQuery(e) {
  if (e.key === 'Enter') {
    getResults(search.value)
  }
}

function getResults(query) {
  fetch(`${config.base_url}weather?q=${query}&units=metric&APPID=${config.key}`)
    .then((response) => response.json())
    .then(displayResults)
}

function displayResults(weather) {
  if (weather.cod !== 200) {
    return alert('请输入要搜索的城市')
  }
  search.value = ''
  if (weather.main.temp > 16) {
    document.querySelector('body').style.backgroundImage = 'url("warm-bg.jpg")'
  } else {
    document.querySelector('body').style.backgroundImage = 'url("cold-bg.jpg")'
  }
  let city = document.querySelector('.location-box .city')
  city.innerText = `${weather.name}, ${weather.sys.country}`

  let date = document.querySelector('.location-box .date')
  date.innerText = dateBuilder(new Date())

  let temp = document.querySelector('.weather-box .temp')
  temp.style.display = 'inline-block'
  temp.innerText = `${Math.round(weather.main.temp)}°C`

  let weather_el = document.querySelector('.weather-box .weather')
  weather_el.innerText = weather.weather[0].main

  let low_high = document.querySelector('.weather-box .low-high')
  low_high.innerText = `${Math.round(weather.main.temp_min)}°C / ${Math.round(
    weather.main.temp_max,
  )}°C`
}

function dateBuilder(d) {
  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  const days = [
    '星期日',
    '星期一',
    '星期二',
    '星期三',
    '星期四',
    '星期五',
    '星期六',
  ]
  const day = days[d.getDay()]
  const date = d.getDate()
  const month = months[d.getMonth()]
  const year = d.getFullYear()
  return `${year}年${month}月${date}日 ${day}`
}
