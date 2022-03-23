import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { PostsContext } from "./context/PostsContext"
import reportWebVitals from './reportWebVitals';
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";


ReactDOM.render(
  <React.StrictMode>
    <PostsContext>
      <App />
    </PostsContext>
  </React.StrictMode>,
  document.getElementById('root')
)
reportWebVitals();
serviceWorkerRegistration.register({
  onUpdate: async (registration) => {
    // Corremos este código si hay una nueva versión de nuestra app
    // Detalles en: https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle
    if (registration && registration.waiting) {
      await registration.unregister();
      registration.waiting.postMessage({ type: "SKIP_WAITING" });
      // Des-registramos el SW para recargar la página y obtener la nueva versión. Lo cual permite que el navegador descargue lo nuevo y que invalida la cache que tenía previamente.
      window.location.reload();
    }
  },
});
