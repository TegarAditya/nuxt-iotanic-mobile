import { Preferences } from "@capacitor/preferences"

export const getPreferences = async (key: string) => {
  return await Preferences.get({ key })
}

export const setPreferences = async (key: string, value: string) => {
  await Preferences.set({ key, value })
}
