import type { RootState } from '../services/store/store'

export const ingredientSelector = (store: RootState) => store.ingredientList
export const orderDetailSelector = (store: RootState) => store.orderDetails
export const constructorIngredientSelector = (store: RootState) => store.constructorIngredientList
export const profileSelector = (store: RootState) => store.profile
export const feedOrderSelector = (store: RootState) => store.feedOrderList
export const profileOrderSelector = (store: RootState) => store.profileOrderList
export const tabSelector = (store: RootState) => store.ingredientTab.currentTab
