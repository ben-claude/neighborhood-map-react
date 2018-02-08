import './styles.css'
import { Component } from 'react'
import PropTypes from 'prop-types'

class InfoWindow extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    google: PropTypes.object.isRequired,
    map: PropTypes.object.isRequired,
    marker: PropTypes.object.isRequired,
    wikiApi: PropTypes.object, // can be null
    streetViewApi: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
  }
  state = {
    infowindow: null,
    domReady: null,
  }
  infoWindowClosed = false
  componentDidMount() {
    const { location, google, marker, map, onClose, streetViewApi, wikiApi } = this.props
    const infowindow = new google.maps.InfoWindow()
    const domIds = {
      label: `InfoWindow-label-${location.label}`,
      streetView: `InfoWindow-streetView-${location.label}`,
      wiki: `InfoWindow-wiki-${location.label}`,
    }
    infowindow.setContent(`<div class='InfoWindow'>
                             <h2 id='${domIds.label}' class='InfoWindow-label'></h2>
                             <div id='${domIds.streetView}' class='InfoWindow-streetView'></div>
                             <div id='${domIds.wiki}' class='InfoWindow-wiki'></div>
                           </div>`)
    infowindow.addListener('closeclick', () => {
      this.infoWindowClosed = true
      onClose()
    })
    const domReady = new Promise((resolve, reject) => {
      google.maps.event.addListener(infowindow, 'domready', () => {
        if (this.infoWindowClosed) {
          reject(`InfoWindow ${location.label} closed`)
        }
        else {
          resolve(domIds)
        }
      })
    })
    domReady.then(domIds => document.getElementById(domIds.label).textContent = location.label)
    streetViewApi.openPanoramaByLocation(marker, domReady)
    if (wikiApi) {
      wikiApi.openNearbyPlaces(marker, domReady)
    }
    else {
      domReady.then(domIds => {
          const el = document.getElementById(domIds.wiki)
          if (el) {
            el.textContent = `Wikimedia errror (JQuery not available)`
          }
        })
    }
    infowindow.open(map, marker)
    //
    this.setState({ infowindow, domReady })
  }
  componentWillUnmount() {
    const { infowindow } = this.state
    infowindow.close()
  }
  render() {
    return null // nothing to render
  }
}

export default InfoWindow

