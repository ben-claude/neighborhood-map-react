import './styles.css'
import React, { Component } from 'react'
import WikiApi from '../../WikiApi'
import PropTypes from 'prop-types'

class WikiQuery extends Component {
  static propTypes = {
    jQuery: PropTypes.func.isRequired,
  }
  state = {
    lat: 0,
    lng: 0,
    pageIds: [],
  }
  wikiApi = new WikiApi(this.props.jQuery)
  render() {
    const { lat, lng, pageIds } = this.state
    const onGeosearch = e => {
      e.preventDefault()
      this.wikiApi.geosearchLocation(lat, lng)
        .then(results => {
            console.log(results);
            const pageIds = results.query.geosearch.map(item => item.pageid);
            console.log(`pageIds ${pageIds}`);
            this.setState({ pageIds })
        })
        .catch(err => console.log(`WikiApi geosearch failed ${err}`))
    }
    const onSearchPageIds = e => {
      e.preventDefault()
      this.wikiApi.searchPageIds(pageIds)
        .then(results => {
            console.log(results);
        })
        .catch(err => console.log(`WikiApi geosearch failed ${err}`))
    }
    return (
      <form className='WikiQuery'>
        <label className='WikiQuery-label' htmlFor='lat'>Latitutde</label>
        <input id='lat' className='WikiQuery-input' type='number' value={lat} onChange={e => this.setState({ lat: e.target.value })} />
        <label className='WikiQuery-label' htmlFor='lng'>Longitude</label>
        <input id='lng' className='WikiQuery-input' type='number' value={lng} onChange={e => this.setState({ lng: e.target.value })} />
        <label className='WikiQuery-label' htmlFor='pageIds'>PageIds</label>
        <input id='pageIds' className='WikiQuery-input' type='text' value={pageIds} disabled />
        <button className='WikiQuery-button' onClick={onGeosearch}>Geosearch location</button>
        <button className='WikiQuery-button' onClick={onSearchPageIds}>Search PageIds</button>
      </form>
    )
  }
}

export default WikiQuery

