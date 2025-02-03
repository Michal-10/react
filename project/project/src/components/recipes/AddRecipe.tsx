import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { useFieldArray, useForm } from 'react-hook-form';
import { array, object, string } from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../global-state/redux/store/store';
import { addRecipe } from '../global-state/redux/store/RecipeSlice';
import { setIsOpenAddModal } from '../global-state/redux/store/AddRecipeSlice';
import { styleModal } from '../login/LoginRegisterWithApi';
import { useNavigate } from 'react-router';
import { Delete } from "@mui/icons-material";
import { RecipeType } from '../../types/RecipeType';

const schema = object({
  title: string().required("the title is required"),
  description: string(),
  ingredients: array().of(string().required("Ingredient cannot be empty")).min(1, "At least one ingredient is required"),
  instructions: string()
}).required();

export default () => {

  const dispatch = useDispatch<AppDispatch>();
  const isOpenModal = useSelector((state: RootState) => state.isOpenModal.isOpenAddModal);
  const navigate = useNavigate();

  const {
    formState: { errors },
    control,
    register,
    handleSubmit,
    reset,
  } = useForm({ resolver: yupResolver(schema) })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'ingredients' as never
  });

  const onSubmit = (data: RecipeType) => {
    dispatch(addRecipe(data));
    reset();
    dispatch(setIsOpenAddModal(false));
    navigate('/RecipesList');
  }

  return (<>
    <Modal open={isOpenModal} >
      <Box sx={styleModal}>
        <Typography variant="h5" sx={{ color: '#193137', margin: '20px', fontWeight: 'bold', textAlign: 'center' }}>add recipe</Typography>

        <form onSubmit={handleSubmit(onSubmit)}>

          <TextField variant="filled" margin="normal" fullWidth label="title" {...register('title')} />
          {errors.title?.message && <div>{errors.title?.message} </div>}

          <TextField variant="filled" margin="normal" fullWidth label="description" {...register('description')} />
          {errors.description?.message && <div>{errors.description?.message} </div>}

          {fields.map((item, index) => (
            <div key={item.id}>
              <TextField {...register(`ingredients.${index}`)} label={`product ${index + 1}`} />
              <Button style={{ color: 'rosybrown', border: '2px solid rosybrown', marginLeft: '5%', marginTop: '2%' }} onClick={() => remove(index)}> <Delete /></Button>
            </div>
          ))}

          <Button style={{ color: 'rosybrown', border: '2px solid rosybrown' }} onClick={() => append('')} sx={{ mt: 2 }}>
            הוסף מוצר
          </Button>
          {errors.ingredients?.message && <div>{errors.ingredients?.message} </div>}

          <TextField variant="filled" margin="normal" fullWidth label="instructions" {...register('instructions')} />
          {errors.instructions?.message && <div>{errors.instructions?.message} </div>}

          <Button sx={{ backgroundColor: 'rosybrown', marginTop: '2px' }} fullWidth variant="contained" type="submit">Save Recipe</Button>
        </form>
      </Box>
    </Modal>
  </>)
};
