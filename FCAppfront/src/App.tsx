import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import MenuBar from './component/MenuBar'
import { BrowserRouter, Outlet, Route, RouterProvider, Routes, createBrowserRouter } from 'react-router-dom'
import { paths } from './router/router'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


const router = createBrowserRouter(paths)

function App() {
  const [count, setCount] = useState(0)
  return (
    <div>
            <BrowserRouter>          
              <ThemeProvider theme={darkTheme}>
                <CssBaseline />
                    <MenuBar/>
                    <Routes>
                      {paths.map((path)=>(
                        <Route path={path.path} element ={path.element}/>
                      ))}
                    </Routes>
              </ThemeProvider>
            </BrowserRouter>
    </div>
  )
}

export default App
