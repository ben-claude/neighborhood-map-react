class LocationApi {
  constructor(localStorageKey) {
    this.localStorageKey = localStorageKey
  }
  loadLocations() {
    return new Promise((resolve, reject) => {
      if (!localStorage[this.localStorageKey]) {
        this.fetchLocations().then(locations => {
          localStorage[this.localStorageKey] = JSON.stringify(locations)
          resolve(locations)
        }).catch(err => {
          console.log(`LocationApi.loadLocations() failed ${err}`)
          reject(err)
        })
      }
      else {
        const locations = JSON.parse(localStorage[this.localStorageKey])
        resolve(locations)
      }
    })
  }
  addLocation(location) {
    return new Promise((resolve, reject) => {
      let locations = JSON.parse(localStorage[this.localStorageKey])
      if (locations.filter(l => l.label === location.label).length) {
        const err = `LocationApi.addLocation() label ${location.label} already exists`
        console.log(err)
        reject(err)
        return
      }
      locations.push(location)
      localStorage[this.localStorageKey] = JSON.stringify(locations)
      resolve(location)
    })
  }
  removeLocation(locationLabel) {
    return new Promise((resolve, reject) => {
      const locations = JSON.parse(localStorage[this.localStorageKey])
      const newLocations = locations.filter(location => location.label !== locationLabel)
      if (newLocations.length === locations.length) {
        const err = `LocationApi.removeLocation() label ${locationLabel} not found`
        console.log(err)
        reject(err)
        return
      }
      localStorage[this.localStorageKey] = JSON.stringify(newLocations)
      resolve(locationLabel)
    })
  }
  fetchLocations() {
    const headers = {
      'Accept': 'application/json',
    }
    // use of the PUBLIC_URL global variable defines in index.html (window.PUBLIC_URL = "%PUBLIC_URL%")
    return fetch(`${window.PUBLIC_URL}/locations.json`, { headers })
      .then(res => res.json())
  }

}

export default LocationApi

