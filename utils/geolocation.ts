import type { Geolocation as GeolocationType } from "~/types/geolocation"
import { Geolocation } from "@capacitor/geolocation"

/**
 * Retrieves the current position using the Geolocation API.
 * @returns A promise that resolves to the coordinates of the current position.
 */
export async function getCurrentPosition() {
  const { coords } = await Geolocation.getCurrentPosition()

  return coords
}

/**
 * Retrieves the address based on the provided longitude and latitude coordinates.
 * @param longitude - The longitude coordinate.
 * @param latitude - The latitude coordinate.
 * @returns The address corresponding to the given coordinates.
 */
export async function getAddress(longitude: number, latitude: number) {
  const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&accept-language=id-ID`
  const response = await fetch(url)
  const geoData: GeolocationType = await response.json()

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
