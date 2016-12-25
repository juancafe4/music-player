import React from 'react';
import axios from 'axios'

class AppContainer extends React.Component {
  constructor(props) {
    super(props);
    this.client_id = '2f98992c40b8edf17423d93bda2e04ab';
        // Initial State
    this.state = {
        // What ever is returned, we just need these 3 values
        track: {stream_url: '', title: '', artwork_url: ''}
    }
    this.randomTrack = this.randomTrack.bind(this);
  }
  componentDidMount() {
    this.randomTrack();
  }
  randomTrack() {
    const URL = `https://api.soundcloud.com/playlists/209262931?client_id=${this.client_id}`;
    //Request for a playlist via Soundcloud using a client id
    Axios.get(URL)
      .then(({data}) => {
        // Store the length of the tracks
        const trackLength = data.tracks.length;
        // Pick a random number
        const randomNumber = Math.floor((Math.random() * trackLength) + 1);
        const track = data.tracks[randomNumber]
        this.setState({track});
      })
      .catch(err => console.err);
  }
  render() {
    return (
      <div className="scotch_music">
        
      </div>
    );
  }
}

export default AppContainer;