import axios from 'axios';
import { IParam, IRequest, ITextFields } from '../utils/options';

const mercadoLivro = axios.create({
  baseURL: 'http://localhost:8080',
})

export const submitRequest = async ({ method, params, path  }: IRequest, textFieldValues: ITextFields): Promise<any> => {
  let response: any
  let data: any = {}
  let query = '?'
  let countQuery = 0
  params.forEach((param: IParam) => {
    if (param.type === 'Query') {
      // @ts-ignore: Unreachable code error
      if(!textFieldValues[param.name]) {
        query += `${param.name}=&`
        countQuery++
      } else {
        // @ts-ignore: Unreachable code error
        query += `${param.name}=${textFieldValues[param.name]}&`
        countQuery++
      }
    }
    // @ts-ignore: Unreachable code error
    if (param.type === 'Body') data[param.name] = textFieldValues[param.name]
    // @ts-ignore: Unreachable code error
    if(param.type === 'Path') path = path.replace(param.name, textFieldValues[param.name])

  })

  if (!!countQuery) {
    query = query.substring(0, query.length-1)
    response = await mercadoLivro({ method, url: path + query, data })
  } else {
    response = await mercadoLivro({ method, url: path, data })
  }

  if (response.status > 290) {
    return {
      response: {
        status: 400
      },
      isCompleteRequest: false
    }
  }
  return {
    response,
    isCompleteRequest: false
  }
}
