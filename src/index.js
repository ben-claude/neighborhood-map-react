import './index.css'
import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import App from './components/App'
import { BrowserRouter } from 'react-router-dom'

const config = {
  localStorageKey: 'neighborhood-map',
  mapCenter: {  lat: 48.856614, lng: 2.3522219000000177 }, // Paris
  mapZoom: 11,
}

ReactDOM.render(
  <BrowserRouter>
    <App
      localStorageKey={config.localStorageKey}
      googleMapsPromise={window.googleMapsPromise}
      mapCenter={config.mapCenter}
      mapZoom={config.mapZoom}
      jQueryPromise={Promise.resolve(window.jQuery) /* in index.html the <script> for the webpack bundle is after the <script> for jQuery */}
    />
  </BrowserRouter>,
  document.getElementById('root'))

registerServiceWorker()

