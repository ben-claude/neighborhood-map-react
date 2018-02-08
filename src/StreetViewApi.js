class StreetViewApi {
  constructor(google) {
    this.google = google
    this.streetViewService = new google.maps.StreetViewService()
  }
  openPanoramaByLocation(marker, domReady) {
    const { google } = this
    const radius = 50
    const getStreetView = (data, status) => {
      if (status === google.maps.StreetViewStatus.OK) {
        const nearStreetViewLocation = data.location.latLng
        const heading = google.maps.geometry.spherical.computeHeading(nearStreetViewLocation, marker.position)
        const panoramaOptions = {
          position: nearStreetViewLocation,
          pov: {
            heading,
            pitch: 0,
          }
        }
        domReady
          .then(domIds => {
            const el = document.getElementById(domIds.streetView)
            if (el) {
              new google.maps.StreetViewPanorama(el, panoramaOptions)
            }
          })
      }
      else {
        domReady
          .then(domIds => {
            const el = document.getElementById(domIds.streetView)
            if (el) {
              el.textContent = `StreetView error (status ${status})`
            }
          })
      }
    }
    this.streetViewService.getPanoramaByLocation(marker.position, radius, getStreetView)
  }

}

export default StreetViewApi

