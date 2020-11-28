import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './components/App'
import { store } from './redux/store'
import { BrowserRouter as Router } from 'react-router-dom'
import Modal from 'react-modal'
import './index.scss'

Modal.setAppElement('#root')

render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById('root'),
)
