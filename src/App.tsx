import React, { SyntheticEvent } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { 
  Button, 
  Tooltip, 
  Tab, 
  Box, 
  Grid, 
  TextField, 
  Modal, 
  Typography, 
  CircularProgress 
} from '@mui/material'
import { TabPanel, TabList, TabContext } from '@mui/lab'
import { apiMercadoLivroDocs, IParam, IMercadoLivroDocs } from './utils/options'
import { submitRequest } from './api'
import { 
  incrementCount, 
  setIsLoadingRequest, 
  setOpenModalToShowResponse, 
  setTextFieldValue, 
  clearTextFieldValues,
  setApiMercadoLivroDocsToShow,
  setResult
} from './store/reducers/app';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store'

function App() {
  const dispatch = useDispatch();

  const state = useSelector((state: RootState) => state);

  const handleChangeTab = (event: SyntheticEvent, title: string) => {
    dispatch(clearTextFieldValues())
    dispatch(setApiMercadoLivroDocsToShow(title)
    )
  }

  const handleToShowModal = () => {
    dispatch(setOpenModalToShowResponse(!state.app.openModalToShowResponse))
  }

  return (
    <div className='App'>
      <Box>
      <TabContext value={state.app.apiMercadoLivroDocsToShow.title}>
        <TabList
          onChange={handleChangeTab}
        >
          {apiMercadoLivroDocs.map((customerEndpoint: IMercadoLivroDocs, index: number) => 
            <Tab key={index} style={{ outline: 'none' }} label={customerEndpoint.title} value={customerEndpoint.title} />
          )}
        </TabList>
        <TabPanel
          value={state.app.apiMercadoLivroDocsToShow.title}
        >
          <Grid style={{
            textAlign: 'left',
            color: state.app.apiMercadoLivroDocsToShow.color,
          }}>
            <h3>Endpoint: {state.app.apiMercadoLivroDocsToShow.title}</h3>
            <h3>Path: {state.app.apiMercadoLivroDocsToShow.path}</h3>
            <h3>Method: {state.app.apiMercadoLivroDocsToShow.method}</h3>
            <h3>Status: {state.app.apiMercadoLivroDocsToShow.status}</h3>
            <h3>Return type: {state.app.apiMercadoLivroDocsToShow.returnType}</h3>
          </Grid>
          <Grid>
          <hr/>
          <h3>Parameters:</h3>
            <ul style={{ textAlign: 'left', display: 'flex', justifyContent: 'flex-start' }}>
              {state.app.apiMercadoLivroDocsToShow.params.map((param: IParam, index: number) =>
                <Grid key={index}>
                  <div style={{ marginLeft: '2rem' }}>
                    <h4>{index+1}. Name: {param.name}</h4>
                    <div style={{ marginLeft: '2rem' }}>
                      <li>Type: {param.type}</li>
                      <li>Value type: {param.valueType}</li>
                      <li>Is Required ? {param.required ? 'Yes.' : 'No.'}</li>
                      <li>Observation: {!!param.obs ? param.obs : '-'}</li>
                    </div>
                  </div>
                </Grid>
              )}
            </ul>
            <hr/>
            <h3>Use Endpoint</h3>
            <Grid style={{ textAlign: 'left' }}>
              <h4>Parameters</h4>
              {state.app.apiMercadoLivroDocsToShow.params.map((param: IParam, index: number) => 
                <Grid key={index}>
                  <TextField
                    style={{
                      marginRight: '1rem',
                    }}
                    id={param.name + param.type}
                    label={param.name}
                    variant="standard"
                    // @ts-ignore: Unreachable code error
                    value={state.app.textFieldValues[param.name]}
                    onChange={(event) => { 
                      dispatch(setTextFieldValue({ value: event.target.value, field: param.name }))
                    }}
                  />
                </Grid>
              )}
              <Tooltip arrow={true} title={'Click for ' + state.app.apiMercadoLivroDocsToShow.title}>
                <Button
                  style={{
                    outline: 'none',
                    fontWeight: 'normal',
                    margin: '1rem',
                  }}
                  variant='contained' 
                  onClick={async () => {
                    dispatch(setIsLoadingRequest(true))
                    handleToShowModal()
                    const { method, params, path  } =  state.app.apiMercadoLivroDocsToShow;
                    const { response, isCompleteRequest } = await submitRequest({ method, params, path }, state.app.textFieldValues)
                    
                    dispatch(clearTextFieldValues())
                    setTimeout(() => dispatch(setIsLoadingRequest(isCompleteRequest)), 2000) 
                    dispatch(setResult(response.data))
                  }}
                >
                  Submit
                </Button>
              </Tooltip>
              <Modal
                open={state.app.openModalToShowResponse}
                onClose={handleToShowModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Grid  
                  style ={{
                    padding: '1rem',
                    top: '50%',
                    position: 'absolute' as 'absolute',
                    transform: 'translate(-50%, -50%)',
                    left: '50%',
                    backgroundColor: 'white',
                    width: 400,
                    boxShadow: 'shadow',
                    border: '0.5px solid #acacac',
                    borderRadius: '8px'
                  }}
                >
                  {state.app.isLoadindRequest ? 
                    <Grid style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                      <CircularProgress />
                    </Grid>
                     : 
                    <Grid
                      style={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        flexDirection: 'column',
                      }}
                    >
                      <Typography id="modal-modal-title" variant="h5" component="h1">
                        Result:
                      </Typography>
                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <Grid>
                          <pre>
                            { JSON.stringify(state.app.result, null, 2) }
                          </pre>
                        </Grid>
                      </Typography>                  
                    </Grid>
                  }
                </Grid>
              </Modal>
            </Grid>
          </Grid>
        </TabPanel>
      </TabContext>
      </Box>
      <div>
        <a href='https://vitejs.dev' target='_blank'>
          <img src='/vite.svg' className='logo' alt='Vite logo' />
        </a>
        <a href='https://reactjs.org' target='_blank'>
          <img src={reactLogo} className='logo react' alt='React logo' />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className='card'>
        <Tooltip arrow={true} title='Button for increment app'>
          <Button 
            style={{
              outline: 'none'
            }}
            variant='contained' 
            onClick={() => dispatch(incrementCount())}
          >
            count is {state.app.count}
          </Button>
        </Tooltip>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className='read-the-docs'>
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
