import React from 'react';
import axios from 'axios'

class AppContainer extends React.Component {
  constructor(props) {
    super(props);
    
    this.randomTrack = this.randomTrack.bind(this);
  }
  componentDidMount() {
    this.randomTrack();
  }
}

export default AppContainer