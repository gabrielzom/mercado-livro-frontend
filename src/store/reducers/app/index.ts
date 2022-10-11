import { createSlice } from '@reduxjs/toolkit';
import { 
  apiMercadoLivroDocs, 
  emptyTextFieldValues,
  ITextFields,
  IMercadoLivroDocs
} from '../../../utils/options'

// @ts-ignore: Unreachable code error
const textFieldValueStorage = JSON.parse(localStorage.getItem('textFieldValues')) as ITextFields;
// @ts-ignore: Unreachable code error
const apiMercadoLivroDocsStorage = JSON.parse(localStorage.getItem('apiMercadoLivroDocsToShow')) as IMercadoLivroDocs;
// @ts-ignore: Unreachable code error
const resultStorage = JSON.parse(localStorage.getItem('result')) as any;

const app = createSlice({
  name: 'app',
  initialState: {
    count: Number(window.localStorage.getItem('count')) || 0,
    isLoadindRequest: false,
    openModalToShowResponse: false,
    textFieldValues: textFieldValueStorage || emptyTextFieldValues,
    apiMercadoLivroDocsToShow: apiMercadoLivroDocsStorage || apiMercadoLivroDocs[0],
    result: resultStorage || null
  },
  reducers: {
    incrementCount: (state) => {
      state.count += 1;
      window.localStorage.setItem('count', JSON.stringify(state.count))
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
      window.localStorage.setItem('textFieldValues', JSON.stringify(state.textFieldValues))
    },

    clearTextFieldValues: (state) => {
      state.textFieldValues = emptyTextFieldValues;
      window.localStorage.setItem('textFieldValues', JSON.stringify(state.textFieldValues))
    },

    setApiMercadoLivroDocsToShow: (state, { payload: apiMercadoLivroDocsToShow }) => {
      state.apiMercadoLivroDocsToShow = apiMercadoLivroDocs.filter(
        element => element.title === apiMercadoLivroDocsToShow.title
      )[0]
      window.localStorage.setItem('apiMercadoLivroDocsToShow', JSON.stringify(state.apiMercadoLivroDocsToShow))
    },

    setResult: (state, { payload: result }) => {
      state.result = result;
      window.localStorage.setItem('result', JSON.stringify(state.result))
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
} = app.actions;
export default app.reducer;