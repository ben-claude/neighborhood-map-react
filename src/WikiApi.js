class WikiApi {
  constructor(jQuery) {
    this.url = 'http://en.wikipedia.org/w/api.php'
    this.jQuery = jQuery
  }
  geosearchLocation(lat, lng) {
    return new Promise((resolve, reject) => {
      this.jQuery.ajax({
        url: this.url,
        data: { format: 'json', action: 'query', list: 'geosearch', 'gsradius': 10000, gscoord: `${lat}|${lng}` },
        dataType: 'jsonp',
      })
        .done((results, textStatus, request) => {
          if (request.status === 200) {
            resolve(results)
          }
          else {
            reject(`status ${request.status}`)
          }
        })
        .fail(request => reject(`status ${request.status}`))
    })
  }
  searchPageIds(pageIds) {
    return new Promise((resolve, reject) => {
      this.jQuery.ajax({
        url: this.url,
        data: { format: 'json', action: 'query', prop: 'extracts', 'exintro': '', pageids: pageIds.join('|') },
        dataType: 'jsonp',
      })
        .done((results, textStatus, request) => {
          if (request.status === 200) {
            resolve(results)
          }
          else {
            reject(`status ${request.status}`)
          }
        })
        .fail(request => reject(`status ${request.status}`))
    })
  }
  openNearbyPlaces(marker, domReady) {
    this.geosearchLocation(marker.position.lat(), marker.position.lng())
      .then(results => {
        const pageIds = results.query.geosearch.map(item => item.pageid)
        return this.searchPageIds(pageIds)
      })
      .then(results => {
        let content = `<h2>Nearby Wikis:</h2>
                         <span><a href="https://www.wikimedia.org/"><small>Powered by Wikimedia</small></a><span>
                         <ul>`
        Object.keys(results.query.pages).forEach(key => {
          const value = results.query.pages[key]
          content +=
            `<li>
               <h3>${value.title}</h3>
               <p>${value.extract}</p>
             </li>`
        })
        content += '</ul>'
        domReady
          .then(domIds => {
            const el = document.getElementById(domIds.wiki)
            if (el) {
              el.innerHTML = content
            }
          })
      })
      .catch(error => {
        domReady
          .then(domIds => {
            const el = document.getElementById(domIds.wiki)
            if (el) {
              el.textContent = `Wikimedia errror (${error})`
            }
          })
      })
  }

}

export default WikiApi

