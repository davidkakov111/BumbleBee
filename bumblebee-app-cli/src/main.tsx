import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import store from './redux/store';
import { Provider } from 'react-redux';

createRoot(document.getElementById('root')!).render(
  // Provide Redux store to the entire app
  <Provider store={store}>
    <StrictMode>
      <App />
    </StrictMode>
  </Provider>
)
