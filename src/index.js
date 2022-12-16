import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/style.scss';
import App from './components/app/App';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';

if(process.env.NODE_ENV === 'production') disableReactDevTools();

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);
