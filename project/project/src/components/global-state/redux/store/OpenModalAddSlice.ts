import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const IsOpenModal = createSlice({
    name: 'isOpenModal',
    initialState: { isOpenAddModal: true },
    reducers: {
        setIsOpenAddModal(state, action: PayloadAction<boolean>) {
            state.isOpenAddModal = action.payload;
        }
    }
});

export const { setIsOpenAddModal } = IsOpenModal.actions;
export default IsOpenModal;