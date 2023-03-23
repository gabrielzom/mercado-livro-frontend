import { createSlice } from '@reduxjs/toolkit';
import { 
  apiMercadoLivroDocs, 
  emptyTextFieldValues,
  ITextFields,
  IMercadoLivroDocs,
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
    isLoadingRequest: false,
    openModalToShowResponse: false,
    textFieldValues: textFieldValueStorage || emptyTextFieldValues,
    apiMercadoLivroDocsToShow: apiMercadoLivroDocsStorage || apiMercadoLivroDocs[0],
    result: resultStorage || null
  },
  reducers: {
    setIsLoadingRequest: (state, { payload: isLoading }) => {
      state.isLoadingRequest = isLoading;
    },

    setOpenModalToShowResponse: (state, { payload: showModal }) => {
      state.openModalToShowResponse = showModal;
    },

    incrementCount: (state) => {
      state.count += 1;
      localStorage.setItem(
        'count', 
        JSON.stringify(state.count)
      )
    },

    setTextFieldValue: (state, { payload: textFieldValue }) => {
      const { value, field } = textFieldValue;
      // @ts-ignore: Unreachable code error
      state.textFieldValues[field] = value
      localStorage.setItem(
        'textFieldValues', 
        JSON.stringify(state.textFieldValues)
      )
    },

    clearTextFieldValues: (state) => {
      state.textFieldValues = emptyTextFieldValues;
      localStorage.setItem(
        'textFieldValues', 
        JSON.stringify(state.textFieldValues)
      )
    },

    setApiMercadoLivroDocsToShow: (state, { payload: title }) => {
      state.apiMercadoLivroDocsToShow = apiMercadoLivroDocs.filter(
        element => element.title === title
      )[0]
      localStorage.setItem(
        'apiMercadoLivroDocsToShow', 
        JSON.stringify(state.apiMercadoLivroDocsToShow)
      )
    },

    setResult: (state, { payload: result }) => {
      state.result = result;
      localStorage.setItem(
        'result', 
        JSON.stringify(state.result)
      )
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
