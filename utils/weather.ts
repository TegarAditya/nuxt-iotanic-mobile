import { fetchWeatherApi } from "openmeteo"
import type { Geolocation } from "~/types/geolocation"
import type { WeatherData } from "~/types/weather"

type WeatherCodeMap = { [key: number]: string }

export async function getWeatherData(latitude: number, longitude: number) {
  const params = {
    latitude: latitude,
    longitude: longitude,
    current: [
      "temperature_2m",
      "relative_humidity_2m",
      "apparent_temperature",
      "is_day",
      "weather_code",
      "wind_speed_10m",
    ],
  }

  const url = "https://api.open-meteo.com/v1/forecast"
  const responses = await fetchWeatherApi(url, params)

  const range = (start: number, stop: number, step: number) =>
    Array.from({ length: (stop - start) / step }, (_, i) => start + i * step)

  const response = responses[0]

  const utcOffsetSeconds = response.utcOffsetSeconds()
  const timezone = response.timezone()
  const timezoneAbbreviation = response.timezoneAbbreviation()

  const address = await getAddress(longitude, latitude)

  const current = response.current()!

  const date = new Date().toLocaleDateString('id-ID')

  const weatherData: WeatherData = {
    current: {
      time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
      temperature2m: current.variables(0)!.value(),
      relativeHumidity2m: current.variables(1)!.value(),
      apparentTemperature: current.variables(2)!.value(),
      isDay: current.variables(3)!.value(),
      weatherCode: current.variables(4)!.value(),
      weatherDescription: describeWeatherCode(current.variables(4)!.value()),
      windSpeed10m: current.variables(5)!.value(),
      address: address,
      date: date,
    },
  };

  return weatherData
}

export async function fetchWeatherData(latitude: number, longitude: number) {
    try {
      const data = await getWeatherData(latitude, longitude);
      return data;
    } catch (error) {
      console.error("Error fetching weather data:", error);
      throw error;
    }
  }

/**
 * Describes the weather based on the provided weather code.
 * @param code - The weather code.
 * @returns The description of the weather corresponding to the code, or "Unknown weather code" if the code is not found.
 */
function describeWeatherCode(code: number) {
  const weatherCodeMap: WeatherCodeMap = {
    0: "Langit cerah",
    1: "Sebagian besar cerah",
    2: "Sebagian besar cerah",
    3: "Sebagian besar cerah",
    45: "Kabut dan deposit kabut rime",
    48: "Kabut dan kabut rim yang mengendap",
    51: "Gerimis: Intensitas ringan, sedang, dan pekat",
    53: "Gerimis: Intensitas ringan, sedang, dan pekat",
    55: "Gerimis: Intensitas ringan, sedang, dan pekat",
    56: "Gerimis yang membeku: Intensitas ringan dan pekat",
    57: "Gerimis Beku: Intensitas ringan dan lebat",
    61: "Hujan: Intensitas ringan, sedang, dan lebat",
    63: "Hujan: Intensitas ringan, sedang dan lebat",
    65: "Hujan: Intensitas ringan, sedang dan lebat",
    66: "Hujan Beku: Intensitas ringan dan lebat",
    67: "Hujan Beku: Intensitas ringan dan lebat",
    71: "Salju turun: Intensitas ringan, sedang, dan lebat",
    73: "Hujan salju: Intensitas ringan, sedang, dan lebat",
    75: "Hujan salju: Intensitas ringan, sedang, dan deras",
    77: "Butiran salju",
    80: "Hujan deras: Ringan, sedang, dan deras",
    81: "Hujan deras: Ringan, sedang, dan deras",
    82: "Hujan: Ringan, sedang, dan deras",
    85: "Hujan salju: Ringan dan deras",
    86: "Hujan salju: Ringan dan deras",
    95: "Badai petir: Ringan atau sedang",
    96: "Badai petir dengan hujan es ringan dan lebat",
    99: "Badai petir dengan hujan es ringan dan lebat",
  }

  return weatherCodeMap[code] || "Unknown weather code"
}

function getImages(code: number) {
    const weatherCodeMap: WeatherCodeMap = {
        0: "clear-sky",
        1: "mostly-clear",
        2: "mostly-clear",
        3: "mostly-clear",
        45: "fog",
        48: "fog",
        51: "drizzle",
        53: "drizzle",
        55: "drizzle",
        56: "freezing-drizzle",
        57: "freezing-drizzle",
        61: "rain",
        63: "rain",
        65: "rain",
        66: "freezing-rain",
        67: "freezing-rain",
        71: "snow",
        73: "sleet",
        75: "sleet",
        77: "snow",
        80: "heavy-rain",
        81: "heavy-rain",
        82: "rain",
        85: "heavy-snow",
        86: "heavy-snow",
        95: "thunderstorm",
        96: "thunderstorm",
        99: "thunderstorm",
    }
    
    return weatherCodeMap[code] || "unknown"
}

/**
 * Retrieves the address based on the provided longitude and latitude coordinates.
 * @param longitude - The longitude coordinate.
 * @param latitude - The latitude coordinate.
 * @returns The address corresponding to the given coordinates.
 */
async function getAddress(longitude: number, latitude: number) {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&accept-language=id-ID`
    const response = await fetch(url)
    const geoData: Geolocation = await response.json()

    let address = ""

    if (geoData.address.village) {
        address += `${geoData.address.village}, `
    }
    if (geoData.address.county) {
        address += `${geoData.address.county}, `
    }
    if (geoData.address.state) {
        address += `${geoData.address.state}, `
    }
    if (geoData.address.country) {
        address += `${geoData.address.country}`
    }

    console.log(geoData)

    return address
}
