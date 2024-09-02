export interface Land {
    id: string
    name: string
    address: string
    location: Location
    plant: string
    area: number
    status: boolean
    createdAt: string
    updatedAt: string
}

export interface Location {
    latitude: number,
    longitude: number
}
