import React from 'react'
import { Provider } from 'react-redux'
import { createRoot } from 'react-dom/client'
import store from './store/index'
import './index.css'
import App from './App.jsx'


createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
)
