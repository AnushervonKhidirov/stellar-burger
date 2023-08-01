export enum WebSocketStatus {
    CONNECTING = 'CONNECTING',
    ONLINE = 'ONLINE',
    OFFLINE = 'OFFLINE',
}

export type TOrderStatuses = 'created' | 'pending' | 'done'

export interface IOrderListStore {
    list: IOrderDataReceived
    doneIdList: number[]
    restIdList: number[]
    status: WebSocketStatus
    connectingError: string
}

export interface IOrderDataReceived {
    readonly orders: IOrderItem[]
    readonly success: boolean
    readonly total: number
    readonly totalToday: number
}

export interface IOrderItem {
    _id: string
    ingredients: string[]
    name: string
    number: number
    status: TOrderStatuses
    createdAt: Date
    updatedAt: Date
}
