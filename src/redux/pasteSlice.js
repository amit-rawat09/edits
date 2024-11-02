import { createSlice } from '@reduxjs/toolkit'
import Toast, { toast } from 'react-hot-toast';

const initialState = {
    pastes: localStorage.getItem("pastes")
        ? JSON.parse(localStorage.getItem("pastes"))
        : []
}

export const pasteSlice = createSlice({
    name: 'paste',
    initialState,
    reducers: {
        addToPaste: (state, action) => {
            const paste = action.payload;

            if (action.payload.title === '' || action.payload.content === '') {
                toast.error("Title or Content can't be empty")
                return;
            }
            state.pastes.push(paste);
            localStorage.setItem("pastes", JSON.stringify(state.pastes))
            toast.success("Edit Created Successfully")
        },
        updateToPaste: (state, action) => {
            const paste = action.payload
            const index = state.pastes.findIndex((item) => item._id === paste._id)

            if (index >= 0) {
                state.pastes[index] = paste

                localStorage.setItem("pastes", JSON.stringify(state.pastes))

                toast.success("Edit Updated")
            }
        },
        resetAllPastes: (state, action) => {
            state.pastes = []
            localStorage.removeItem("pastes")
        },
        removeFromPastes: (state, action) => {
            const pasteId = action.payload

            console.log(pasteId);
            const index = state.pastes.findIndex((item) => item._id === pasteId)

            if (index >= 0) {
                state.pastes.splice(index, 1)

                localStorage.setItem("pastes", JSON.stringify(state.pastes))

                toast.success("Edit deleted")
            }
        },
    },
})

// Action creators are generated for each case reducer function
export const { addToPaste, updateToPaste, resetAllPastes, removeFromPastes } = pasteSlice.actions

export default pasteSlice.reducer