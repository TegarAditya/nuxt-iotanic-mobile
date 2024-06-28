export interface WeatherData {
  current: {
    time: Date
    temperature2m: number
    relativeHumidity2m: number
    apparentTemperature: number
    isDay: number
    weatherCode: number
    weatherDescription: string
    windSpeed10m: number
    address: string
  }
}

export interface CurrentWeather {
  time: Date
  temperature2m: number
  relativeHumidity2m: number
  apparentTemperature: number
  isDay: number
  weatherCode: number
  weatherDescription: string
  windSpeed10m: number
  address: string
}
