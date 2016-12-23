// ES6 Component
// Import React and ReactDOM
import React from 'react';
import ReactDOM from 'react-dom';

// Import Search Component
import Search from './components/Search';
// Import Details Component
import Details from './components/Details';
// Import Player Component
import Player from './components/Player';
// Import Progress Component 
import Progress from './components/Progress';

// Component Class
class App extends React.Component {
    // render method is most important
    // render method returns JSX template
    render() {
        return (
          <div>
            <Search />
            <Details title={"Track Title"}/>
            <Player />
            <Progress
              position={'0.3'}
              elapsed={'00:00'}
              total={'0:40'}/>
          </div>
        );
    }
}

// Render to ID content in the DOM
ReactDOM.render(
    <App/ >,
    document.getElementById('content')
);