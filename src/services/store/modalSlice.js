import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isOpen: false,
    modalChildren: null,
}

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (state, action) => {
            state.isOpen = true
            state.modalChildren = action.payload
        },
        closeModal: (state) => {
            state.isOpen = false
            state.modalChildren = null
        }
    }
})

export const { openModal, closeModal } = modalSlice.actions
export default modalSlice.reducer