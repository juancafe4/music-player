import React from 'react';
import axios from 'axios';

// Import Search Component
import Search from '../components/Search';
// Import Details Component
import Details from '../components/Details';
// Import Player Component
import Player from '../components/Player';
// Import Progress Component 
import Progress from '../components/Progress';
// Import Footer Component
import Footer from '../components/Footer';

// Sound component
import Sound from 'react-sound';
class AppContainer extends React.Component {
  constructor(props) {
    super(props);
    this.client_id = '2f98992c40b8edf17423d93bda2e04ab';
        // Initial State
    this.state = {
        // What ever is returned, we just need these 3 values
        track: {stream_url: '', title: '', artwork_url: ''},
        playStatus: Sound.status.STOPPED,
        elapsed: '00:00',
        total: '00:00',
        position: 0,
        playFromPosition: 0,
        autoCompleteValue: '',
        tracks: [],
    };
    this.randomTrack = this.randomTrack.bind(this);
    this.prepareUrl = this.prepareUrl.bind(this);
    this.formatMilliseconds = this.formatMilliseconds.bind(this);
    this.xlArtwork = this.xlArtwork.bind(this);
  }
  componentDidMount() {
    this.randomTrack();
  }
  prepareUrl(url) {
    // Attach client id to stream url
    return `${url}?client_id=${this.client_id}`
  }
  randomTrack() {
    const URL = `https://api.soundcloud.com/playlists/209262931?client_id=${this.client_id}`;
    //Request for a playlist via Soundcloud using a client id
    axios.get(URL)
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
  handleSongPlaying(audio) {
    this.setState({  elapsed: this.formatMilliseconds(audio.position),
        total: this.formatMilliseconds(audio.duration),
        position: audio.position / audio.duration, })
  }
  formatMilliseconds(milliseconds) {
    // Format hours
    var hours = Math.floor(milliseconds / 3600000);
    milliseconds = milliseconds % 3600000;

    // Format minutes
    var minutes = Math.floor(milliseconds / 60000);
    milliseconds = milliseconds % 60000;

    // Format seconds
    var seconds = Math.floor(milliseconds / 1000);
    milliseconds = Math.floor(milliseconds % 1000);

    // Return as string
    return (minutes < 10 ? '0' : '') + minutes + ':' +
    (seconds < 10 ? '0' : '') + seconds;
  }
  handleSongFinished () {
    // Call random Track
    this.randomTrack();
  }
  handleChange(event, value) {

    // Update input box
    this.setState({autoCompleteValue: event.target.value});

    const URL = `https://api.soundcloud.com/tracks?client_id=${this.client_id}&q=${value}`;
    //Search for song with entered value
    axios.get(URL)
      .then( ({data}) => {
        // Update track state
        this.setState({tracks: data});
      })
      .catch(err => console.err)
  }
  handleSelect(value, item){
    this.setState({ autoCompleteValue: value, track: item });
  }
  togglePlay(){
    // Check current playing state
    if(this.state.playStatus === Sound.status.PLAYING){
      // Pause if playing
      this.setState({playStatus: Sound.status.PAUSED})
    } else {
      // Resume if paused
      this.setState({playStatus: Sound.status.PLAYING})
    }
  }
  stop(){
    // Stop sound
   this.setState({playStatus: Sound.status.STOPPED});
  }
  forward(){
    this.setState({playFromPosition: this.state.playFromPosition+=1000*10});
  }
  backward(){
    this.setState({playFromPosition: this.state.playFromPosition-=1000*10});
  }
  render() {
    const scotchStyle = {
      width: '500px',
      height: '500px',
      backgroundImage: `linear-gradient(
      rgba(0, 0, 0, 0.7),
      rgba(0, 0, 0, 0.7)
      ),   url(${this.xlArtwork(this.state.track.artwork_url)})`
    }
    return (
      <div className="scotch_music">
        <Search
          autoCompleteValue={this.state.autoCompleteValue}
          tracks={this.state.tracks}
          handleSelect={this.handleSelect.bind(this)}
          handleChange={this.handleChange.bind(this)}
        />
        <Details
          title={this.state.track.title}
        />
        <Player
          togglePlay={this.togglePlay.bind(this)}
          stop={this.stop.bind(this)}
          playStatus={this.state.playStatus}
          forward={this.forward.bind(this)}
          backward={this.backward.bind(this)}
          random={this.randomTrack.bind(this)}
        />
        <Progress
          elapsed={this.state.elapsed}
          total={this.state.total}
          position={this.state.position}
        />
        <Footer />
        <Sound 
          url={this.prepareUrl(this.state.track.stream_url)}
          playStatus={this.state.playStatus}
          onPlaying={this.handleSongPlaying.bind(this)}
          playFromPosition={this.state.playFromPosition}
          onFinishedPlaying={this.handleSongFinished.bind(this)}
        />
      </div>
    );
  }
}

export default AppContainer;