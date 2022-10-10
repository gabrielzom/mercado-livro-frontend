export interface IParam {
  name: string,
  type: string,
  valueType: string,
  required: boolean
  obs: string | null,
}



export interface IMercadoLivroDocs {
  title: string,
  method: string,
  params: IParam[]
  color: string,
  status: number,
  returnType: string,
  path: string,
}

export interface IRequest {
  method: string,
  params: IParam[],
  path: string,
}

export interface ITextFields {
  id: string,
  fullName: string,
  email: string
}

export const emptyTextFieldValues: ITextFields = { 
  fullName: '', 
  email: '', 
  id: '' 
}

export const apiMercadoLivroDocs: IMercadoLivroDocs[] = [
  {
    title: 'Get All Customers',
    method: 'GET',
    params: [ 
      { 
        name:'fullName', 
        type: 'Query', 
        valueType: 'string', 
        required: false,
        obs: 'Keep empty for not use'
      },
      { 
        name:'email', 
        type: 'Query', 
        valueType: 'string', 
        required: false,
        obs: 'Keep empty for not use'
      },
    ],
    color: 'purple',
    status: 200,
    returnType: 'List of Customer object',
    path: '/customer'
  },
  {
    title: 'Get Customer by Id',
    method: 'GET',
    params: [
      {
        name: 'id',
        type: 'Path',
        valueType: 'number',
        required: true,
        obs: ''
      }
    ],
    color: 'purple',
    status: 200,
    returnType: 'Single Customer object',
    path: '/customer/id'
  },
  {
    title: 'Create Customer',
    method: 'POST',
    params: [ 
      { 
        name:'fullName', 
        type: 'Body', 
        valueType: 'string', 
        required: true,
        obs: ''
      },
      { 
        name:'email', 
        type: 'Body', 
        valueType: 'string', 
        required: true,
        obs: ''
      },
    ],
    color: 'green',
    status: 201,
    returnType: 'Customer object with id, create by and created at.',
    path: '/customer'
  },
  {
    title: 'Update Customer by Id',
    method: 'PUT',
    params: [ 
      { 
        name:'id', 
        type: 'Path', 
        valueType: 'number', 
        required: true,
        obs: ''
      },
      { 
        name:'fullName', 
        type: 'Body', 
        valueType: 'string', 
        required: true,
        obs: ''
      },
      { 
        name:'email', 
        type: 'Body', 
        valueType: 'string', 
        required: true,
        obs: ''
      },
    ],
    color: 'orange',
    status: 202,
    returnType: 'Customer object updated',
    path: '/customer/id'
  },
  {
    title: 'Delete Customer by Id',
    method: 'DELETE',
    params: [ 
      { 
        name:'id', 
        type: 'Path', 
        valueType: 'number', 
        required: true,
        obs: ''
      },
    ],
    color: 'red',
    status: 302,
    returnType: 'Customer object deleted',
    path: '/customer/id'
  },
]