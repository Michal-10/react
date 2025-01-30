import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Modal, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { object, string } from 'yup'
import { RecipeType } from '../../types/RecipeType';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../global-state/redux/store/store';
import { addRecipe } from '../global-state/redux/store/RecipeSlice';
import { useState } from 'react';
import LoginStore from '../global-state/mobX/LoginStore';
import IsOpenModal, { setIsOpenAddModal } from '../global-state/redux/store/AddRecipeSlice';


const schema = object({
  title: string().required(),
  description: string(),
  products: string().required(),
  ingredients: string(),
  instructions: string()
}).required();

export default () => {

  // const [openModal,setOpenModal]= useState(true);
  const dispatch = useDispatch<AppDispatch>();
  const isOpenModal = useSelector((state: any) => state.isOpenModal.isOpenAddModal);

  const {
    formState:{errors},
    register,
    handleSubmit,
    reset,
  } = useForm({ resolver: yupResolver(schema) })

  const onSubmit = (data: RecipeType) => {//----------------any-------
    const dispatch = useDispatch<AppDispatch>();
    // setOpenModal(false);
    dispatch(addRecipe({...data}));
    reset();
    // LoginStore.isLogin = 'in';
  }

  return (<>
    <Modal open={isOpenModal} onClose={()=>dispatch(setIsOpenAddModal(false))}>
      <form onSubmit={handleSubmit(onSubmit)}>

        <TextField label="title" {...register('title')} />
        {errors.title?.message && <div>{errors.title?.message} </div>}
        
        <TextField label="description" {...register('description')} />
        {errors.description?.message && <div>{errors.description?.message} </div>}
        
        <TextField label="products" {...register('products')} />
        {errors.products?.message && <div>{errors.products?.message} </div>}
        
        <TextField label="ingredients" {...register('ingredients')} />
        {errors.ingredients?.message && <div>{errors.ingredients?.message} </div>}

        <TextField label="instructions" {...register('instructions')} />
        {errors.instructions?.message && <div>{errors.instructions?.message} </div>}

        <Button >Save recipe</Button>
      </form>
    </Modal>
  </>)
}
