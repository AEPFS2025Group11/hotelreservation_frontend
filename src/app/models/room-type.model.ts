export interface RoomTypeIn {
description: string
max_guests: number
}

export interface RoomTypeOut {
id: number
description: string
max_guests: number
}


export interface RoomTypeUpdate {
description: string
max_guests: number
}
