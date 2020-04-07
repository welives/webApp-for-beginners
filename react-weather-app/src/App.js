import React, { useState } from 'react'
const config = {
  key: '681acf542ae4967f3b6432891c3f47a8',
  base_url: 'https://api.openweathermap.org/data/2.5/',
}

function App() {
  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState({})

  const search = (e) => {
    if (e.key === 'Enter') {
      fetch(
        `${config.base_url}weather?q=${query}&units=metric&APPID=${config.key}`,
      )
        .then((response) => response.json())
        .then((result) => {
          setWeather(result)
          setQuery('')
        })
    }
  }

  const dateBuilder = (d) => {
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
  return (
    <div
      className={
        typeof weather.main !== 'undefined' && weather.main.temp > 16
          ? 'app warm'
          : 'app'
      }
    >
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="search..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {typeof weather.main !== 'undefined' ? (
          <div>
            <div className="location-box">
              <div className="city">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}°C</div>
              <div className="weather">{weather.weather[0].main}</div>
              <div className="low-high">
                {Math.round(weather.main.temp_min)}°C{' / '}
                {Math.round(weather.main.temp_max)}°C
              </div>
            </div>
          </div>
        ) : (
          ''
        )}
      </main>
    </div>
  )
}

export default App
