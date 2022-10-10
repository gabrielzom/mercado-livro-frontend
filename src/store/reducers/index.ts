import { createSlice, configureStore } from '@reduxjs/toolkit';
import { 
  apiMercadoLivroDocs, 
  IParam, 
  IMercadoLivroDocs, 
  IRequest, 
  ITextFields 
} from '../../utils/options'


const store = createSlice({
  name: 'store',
  initialState: {
    value: 0,
    isLoadindRequest: false,
    openModalToShowResponse: false,
    textFieldValues: { 
      fullName: '', 
      email: '', 
      id: '',
    },
    apiMercadoLivroDocsToShow: apiMercadoLivroDocs,
  },
  reducers: {
    incrementCount: state => {
      state.value += 1;
    },
    setIsLoadingRequest: (state, { payload: isLoading}) => {
      state.isLoadindRequest = isLoading;
    },
  }
})

export const { incrementCount } = store.actions;
export default store.reducer;