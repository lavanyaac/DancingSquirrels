import React from 'react';
import $ from 'jquery';
import Search from './Search.jsx';
import PodcastList from './PodcastList.jsx';

class PodcastMain extends React.Component {
  constructor(props) {
    super(props);
    this.search = this.search.bind(this);
    this.state = {
      podcasts: [],
      ratings: []
    };
  }

  search(query) {
    $.post('/search', { search: query })
      .done((results) => {
        this.setState({
          podcasts: results
        });
        this.updateRatings();
      });
  }

  updateRatings(){
    var collectionIds = this.state.podcasts.map((podcast) => {
      return podcast.collectionId;
    });
    $.get('/search-rating', { collectionIds })
        .done(rating => {
          console.log( rating )
          if(rating && Object.keys(rating).length > 0){
            var newPodcasts = this.state.podcasts;
            rating.forEach(function(val) {
              for( var item of newPodcasts ){
                if(item.collectionId === val.podcast_id ){
                  item.rating = val.rating
                  break;
                }
              }
            });
            this.setState({
              podcasts: newPodcasts
          });
        }

      });
  }

  render() {
    return (
      <div className='main-container'>
        <Search onSearch={this.search} />
        <PodcastList podcasts={this.state.podcasts}/>
      </div>
    );
  }
}

export default PodcastMain;
