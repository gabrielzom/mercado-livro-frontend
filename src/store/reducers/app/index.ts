import { createSlice } from '@reduxjs/toolkit';
import { 
  apiMercadoLivroDocs, 
  emptyTextFieldValues,
} from '../../../utils/options'


const store = createSlice({
  name: 'store',
  initialState: {
    count: 0,
    isLoadindRequest: false,
    openModalToShowResponse: false,
    textFieldValues: emptyTextFieldValues,
    apiMercadoLivroDocsToShow: apiMercadoLivroDocs[0],
    result: null
  },
  reducers: {
    incrementCount: state => {
      state.count += 1;
    },
    setIsLoadingRequest: (state, { payload: isLoading }) => {
      state.isLoadindRequest = isLoading;
    },
    setOpenModalToShowResponse: (state, { payload: showModal }) => {
      state.openModalToShowResponse = showModal;
    },
    setTextFieldValue: (state, { payload: textFieldValue }) => {
      const { value, field } = textFieldValue;
      // @ts-ignore: Unreachable code error
      state.textFieldValues[field] = value
    },
    clearTextFieldValues: state => {
      state.textFieldValues = emptyTextFieldValues;
    },
    setApiMercadoLivroDocsToShow: (state, { payload: apiMercadoLivroDocsToShow }) => {
      state.apiMercadoLivroDocsToShow = apiMercadoLivroDocs.filter(
        element => element.title === apiMercadoLivroDocsToShow.title
      )[0]
    },
    setResult: (state, { payload: result }) => {
      state.result = result;
    }
  }
})

export const { 
  incrementCount, 
  setIsLoadingRequest, 
  setOpenModalToShowResponse,
  setTextFieldValue,
  clearTextFieldValues,
  setApiMercadoLivroDocsToShow,
  setResult
} = store.actions;
export default store.reducer;