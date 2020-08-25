import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App';
import { ThemeProvider } from 'styled-components'
import theme from './utils/theme'
import GlobalStyle from './utils/globalStyles'
import { rootStore } from './redux/rootStore'


ReactDOM.render(
  <React.StrictMode>
    <Provider store={rootStore}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
