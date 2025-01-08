import {createSlice} from '@reduxjs/toolkit';

export interface ModalState {
    isOpen: boolean;
}

const initialState: ModalState = {
    isOpen: false,
};

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (state: ModalState) => {
            state.isOpen = true;
        },
        closeModal: (state: ModalState) => {
            state.isOpen = false;
        },
    },
});

export const {
    openModal,
    closeModal,
} = modalSlice.actions;

export const modalReducer = modalSlice.reducer;