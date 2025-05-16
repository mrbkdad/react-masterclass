import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider, type DefaultTheme } from 'styled-components'
import { RouterProvider } from 'react-router-dom'
import { Router } from './router.tsx'
import { QueryClient, QueryClientProvider } from 'react-query'

const theme: DefaultTheme = {
  bgColor: "#353b48",
  textColor: "#dcdde1",
  accentColor: "#e1b12c",
}

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={Router}/>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
)
