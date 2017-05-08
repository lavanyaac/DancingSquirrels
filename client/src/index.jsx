import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import PodcastList from './components/PodcastList.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.search = this.search.bind(this);
    this.state = {
      podcasts: []
    }
  }



  search(query) {
    //console.log(query);
    $.post('/search', { search: query })
      .done((results) => {
        console.log(results);
        this.setState({
          podcasts: results
        });
      });
  }

  render() {
    return (
      <div>
        <div>
          <Search onSearch={this.search} />
        </div>
        <div>
          <PodcastList podcasts={this.state.podcasts} />
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));