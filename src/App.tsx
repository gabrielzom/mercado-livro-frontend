import React, { SyntheticEvent } from 'react'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Button, Tooltip, Tab, Box, Grid, TextField, Modal, Typography, CircularProgress } from '@mui/material'
import { TabPanel, TabList, TabContext } from '@mui/lab'
import { apiMercadoLivroDocs, IParam, IMercadoLivroDocs, IRequest, ITextFields } from './utils/options'
import { submitRequest } from './api'

function App() {
  const emptyTextFieldValues: ITextFields = { fullName: '', email: '', id: '' }

  const [isLoadindRequest, setIsLoadingRequest] = useState(false)
  const [openModalToShowResponse, setOpenModalToShowResponse] = useState(false)
  const [textFieldValues, setTextFieldValue] = useState(emptyTextFieldValues)
  const [count, setCount] = useState(0)
  const [apiMercadoLivroDocsToShow, setApiMercadoLivroDocsToShow] = useState(apiMercadoLivroDocs[0])

  const handleChangeTab = (event: SyntheticEvent, title: string) => {
    setTextFieldValue(emptyTextFieldValues)
    setApiMercadoLivroDocsToShow(apiMercadoLivroDocs.filter(element => element.title === title)[0])
  }

  const handleToShowModal = () => {
    setOpenModalToShowResponse(!openModalToShowResponse)
  }

  return (
    <div className='App'>
      <Box>
      <TabContext value={apiMercadoLivroDocsToShow.title}>
        <TabList
          onChange={handleChangeTab}
        >
          {apiMercadoLivroDocs.map((customerEndpoint: IMercadoLivroDocs, index: number) => 
            <Tab key={index} style={{ outline: 'none' }} label={customerEndpoint.title} value={customerEndpoint.title} />
          )}
        </TabList>
        <TabPanel
          value={apiMercadoLivroDocsToShow.title}
        >
          <Grid style={{
            textAlign: 'left',
            color: apiMercadoLivroDocsToShow.color,
          }}>
            <h3>Endpoint: {apiMercadoLivroDocsToShow.title}</h3>
            <h3>Path: {apiMercadoLivroDocsToShow.path}</h3>
            <h3>Method: {apiMercadoLivroDocsToShow.method}</h3>
            <h3>Status: {apiMercadoLivroDocsToShow.status}</h3>
            <h3>Return type: {apiMercadoLivroDocsToShow.returnType}</h3>
          </Grid>
          <Grid>
          <hr/>
          <h3>Parameters:</h3>
            <ul style={{ textAlign: 'left', display: 'flex', justifyContent: 'flex-start' }}>
              {apiMercadoLivroDocsToShow.params.map((param: IParam, index: number) =>
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
            <div style={{ textAlign: 'left' }}>
            <h4>Parameters</h4>
              {apiMercadoLivroDocsToShow.params.map((param: IParam, index: number) => 
                <Grid key={index}>
                  <TextField
                    style={{
                      marginRight: '1rem',
                    }}
                    id={param.name + param.type}
                    label={param.name}
                    variant="standard"
                    // @ts-ignore: Unreachable code error
                    value={textFieldValues[param.name]}
                    onChange={(event) => { 
                      setTextFieldValue({...textFieldValues, [param.name]: event.target.value})
                    }}
                  />
                </Grid>
              )}
              <Tooltip arrow={true} title={'Click for ' + apiMercadoLivroDocsToShow.title}>
                <Button
                  style={{
                    outline: 'none',
                    fontWeight: 'normal',
                    margin: '1rem',
                  }}
                  variant='contained' 
                  onClick={async () => {
                    setIsLoadingRequest(true)
                    handleToShowModal()
                    const { method, params, path  } =  apiMercadoLivroDocsToShow;
                    const { response, isCompleteRequest } = await submitRequest({ method, params, path }, textFieldValues)
                    setTextFieldValue(emptyTextFieldValues)
                    setInterval(() => setIsLoadingRequest(isCompleteRequest), 2200)
                    console.log('Result of request for ' + apiMercadoLivroDocsToShow.title, response)
                  }}
                >
                  Submit
                </Button>
              </Tooltip>
              <Modal
                open={openModalToShowResponse}
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
                  {isLoadindRequest ? 
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
                        Request send.
                      </Typography>
                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                         Open the console for see response.
                      </Typography>                  
                    </Grid>
                  }
                </Grid>
              </Modal>
            </div>
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
        <Tooltip arrow={true} title='Button for increment count'>
          <Button 
            style={{
              outline: 'none'
            }}
            variant='contained' 
            onClick={() => setCount((count: number) => count + 1)}
          >
            count is {count}
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
