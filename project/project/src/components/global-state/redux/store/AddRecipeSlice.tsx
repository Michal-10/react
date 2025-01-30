import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { action } from "mobx";
//import { boolean } from "yup";

const IsOpenModal = createSlice({
    name: 'isOpenModal',
    initialState: { isOpenAddModal: true },
    reducers: {
      setIsOpenAddModal (state, action:PayloadAction<boolean>)  {
            state.isOpenAddModal = action.payload; 
        }
    }
});
//export const selectIsOpenModal = (state: boolean) => state;

export const { setIsOpenAddModal } = IsOpenModal.actions;
export default IsOpenModal;