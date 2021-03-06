import React from 'react';
import $ from 'jquery';
import Search from './Search.jsx';
import PodcastList from './PodcastList.jsx';
import PropTypes from 'prop-types';
import FavoritePodcasts from './FavoritePodcasts.jsx';


class UserHomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: true,
      favoritePodcasts: []
    };
    let hashArr = window.location.hash.split('/');
    this.username = hashArr[hashArr.length - 1];
    this.getFavorites = this.getFavorites.bind(this);
  }

  getFavorites() {
    $.get('/favorite', {
      username: this.username
    })
      .done((result) => {
        this.setState({
          favoritePodcasts: result
        });
      });
  }


  componentWillMount() {
    $.get('loggedIn')
    .done((result) => {
      if (result === 'loggedIn') {
        this.setState({
          loggedIn: true
        })
      } else {
        this.setState({
          loggedIn: false
        })
      }
    })
  }

  render() {
    return (
      <div>
      {!this.state.loggedIn && <p> Please login </p> }
      {this.state.loggedIn && 
         <div className='main-container'>
        <h1>UserHomePage</h1>
        <Search onSearch={this.props.onSearch} />
        <PodcastList
          podcasts={this.props.podcasts}
          onClickPodcast={this.props.onClickPodcast}
          getFavPodcasts={this.getFavorites}
          loggedIn={this.state.loggedIn}/>
        <FavoritePodcasts
          favPodcasts={this.state.favoritePodcasts}
          getFavPodcasts={this.getFavorites}
          onClickPodcast={this.props.onClickPodcast}
          loggedIn={this.state.loggedIn}/>
      </div>
      }

      </div>
    )
  }
}

UserHomePage.propTypes = {
  onSearch: PropTypes.func.isRequired,
  podcasts: PropTypes.array.isRequired,
  onClickPodcast: PropTypes.func.isRequired
};

export default UserHomePage;
