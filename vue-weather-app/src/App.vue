<template>
  <div
    id="app"
    :class="
      typeof weather.main !== 'undefined' && weather.main.temp > 16
        ? 'warm'
        : ''
    "
  >
    <main>
      <div class="search-box">
        <input
          type="text"
          class="search-bar"
          placeholder="查询..."
          v-model="query"
          @keyup.enter="fetchWeather"
        />
      </div>
      <div class="weather-wrap" v-if="typeof weather.main !== 'undefined'">
        <div class="location-box">
          <div class="location">
            {{ weather.name }}, {{ weather.sys.country }}
          </div>
          <div class="date">{{ dateBuilder() }}</div>
        </div>

        <div class="weather-box">
          <div class="temp">{{ Math.round(weather.main.temp) }}°C</div>
          <div class="weather">{{ weather.weather[0].main }}</div>
          <div class="low-high">
            {{ Math.round(weather.main.temp_min) }}°C /
            {{ Math.round(weather.main.temp_max) }}°C
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      api_key: '681acf542ae4967f3b6432891c3f47a8',
      url_base: 'https://api.openweathermap.org/data/2.5/',
      query: '',
      weather: {},
    }
  },
  methods: {
    fetchWeather() {
      fetch(
        `${this.url_base}weather?q=${this.query}&units=metric&APPID=${this.api_key}`,
      )
        .then((response) => {
          return response.json()
        })
        .then(this.setResults)
    },
    setResults(data) {
      this.weather = data
    },
    dateBuilder() {
      const d = new Date()
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
    },
  },
}
</script>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'montserrat', sans-serif;
}

#app {
  background: {
    image: url('./assets/cold-bg.jpg');
    size: cover;
    position: bottom;
  }
  transition: 0.4s;
}

#app.warm {
  background-image: url('./assets/warm-bg.jpg');
}

main {
  min-height: 100vh;
  padding: 25px;
  color: #ffffff;
  text-align: center;
  background-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.25),
    rgba(0, 0, 0, 0.75)
  );

  .search-box {
    width: 100%;
    margin-bottom: 30px;

    .search-bar {
      width: 100%;
      padding: 15px;
      color: #313131;
      font-size: 20px;
      border-radius: 0 16px;
      border: none;
      outline: none;
      box-shadow: 0 0 8px rgba(0, 0, 0, 0.25);
      background-color: rgba(255, 255, 255, 0.5);
      transition: 0.4s;

      &:focus {
        border-radius: 16px 0;
        border-bottom: 3px solid #42b983;
        box-shadow: 0 0 16px rgba(0, 0, 0, 0.25);
        background-color: rgba(255, 255, 255, 0.75);
      }
    }
  }

  .location-box {
    .location {
      font: {
        size: 32px;
        weight: 500;
      }
      margin-bottom: 5px;
      text-shadow: 1px 3px rgba(0, 0, 0, 0.25);
    }

    .date {
      font: {
        size: 18px;
        weight: 300;
        style: italic;
      }
    }
  }

  .weather-box {
    .temp {
      display: inline-block;
      margin: 30px 0;
      padding: 10px 25px;
      font: {
        size: 64px;
        weight: 900;
      }
      border-radius: 16px;
      background-color: rgba(255, 255, 255, 0.25);
      text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
      box-shadow: 3px 6px rgba(0, 0, 0, 0.25);
    }
    .weather {
      font: {
        size: 48px;
        weight: 700;
        style: italic;
      }
      text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
    }
    .low-high {
      font: {
        size: 16px;
        weight: 500;
      }
    }
  }
}
</style>
