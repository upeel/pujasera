import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
// import App from './App'
import { store } from './store'
import './styles/index.scss'
import '../i18n'
import './utils/request'
import { customTheme } from './styles/theme.config'
import { HelmetProvider } from 'react-helmet-async'
import AppRouter from './Route'
import { BrowserRouter } from 'react-router-dom'
import { CookiesProvider } from 'react-cookie'
import ErrorPage from './views/error/ErrorPage'
import { ErrorBoundary } from 'react-error-boundary'
import ScrollToTop from './components/scrollToTop'
import { CheckNetwork } from './components/checkNetwork'
import Helmet from './components/helmet'
import { ToastContainer } from './helpers/toast'

// Render Root
const container = document.getElementById('root') as HTMLElement
ReactDOM.createRoot(container).render(
  // <React.StrictMode>
  <ChakraProvider theme={customTheme}>
    <ErrorBoundary FallbackComponent={ErrorPage} onReset={() => window.location.reload()}>
      <CookiesProvider>
        <HelmetProvider>
          <Provider store={store}>
            <BrowserRouter>
              <ScrollToTop />
              <CheckNetwork />
              <Helmet />
              <AppRouter />
            </BrowserRouter>
          </Provider>
        </HelmetProvider>
        <ToastContainer />
      </CookiesProvider>
    </ErrorBoundary>
  </ChakraProvider>
  // </React.StrictMode>
)
