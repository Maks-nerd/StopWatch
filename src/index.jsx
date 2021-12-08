//Модули
import React from 'react';
import ReactDOM from 'react-dom';

// Компоненты
import App from './App';

// Стили
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <React.StrictMode>
    <div className="container my-5">
      <App />
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);
