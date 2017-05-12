import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import ViewRating from './ViewRating.jsx';
import Rating from './Rating.jsx';

// class PodcastListEntry extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       podcast: {},
//       renderEpisodes: false
//     };
//     this.onClickPodcast = this.onClickPodcast.bind(this);
//   }
//
//   onClickPodcast() {
//     // post request to the server
//     if (this.state.renderEpisodes) {
//       this.setState({
//         renderEpisodes: false
//       });
//     } else {
//       $.post('/podcast', {
//         feedUrl: this.props.podcast.feedUrl,
//         collectionId: this.props.podcast.collectionId
//       })
//         .done((podcast) => {
//           // when done renderEpisodes is true AND episodes is set to the results
//           // console.log(podcast[0]);
//           this.setState({
//             podcast: podcast[0],
//             renderEpisodes: true
//           });
//         });
//     }
//   }
//
//   render() {
//     return (
//       <div className='podcast'>
//         <img onClick={this.onClickPodcast} src={this.props.podcast.artworkUrl100} />
//         <div className='podcast-title-author'>
//           <h4 onClick={this.onClickPodcast}>{this.props.podcast.collectionName}</h4>
//           <h5 onClick={this.onClickPodcast}>{this.props.podcast.artistName}</h5>
//         </div>
//       </div>
//     );
//   }
// }

class PodcastListEntry extends React.Component {
  constructor(props) {
    super(props);

    this.onClickPodcast = this.onClickPodcast.bind(this);
  }

  onClickPodcast() {
    this.props.onClickPodcast(this.props.podcast.feedUrl, this.props.podcast.collectionId, () => {
      this.context.router.history.push('/podcasts/episodes');
    });
  }

  render() {
    return (
      <div className='podcast'>
        <img onClick={this.onClickPodcast} src={this.props.podcast.artworkUrl100} />
        <div className='podcast-title-author'>
          <h4 onClick={this.onClickPodcast}>{this.props.podcast.collectionName}</h4>
          <h5 onClick={this.onClickPodcast}>{this.props.podcast.artistName}</h5>
        </div>
        {
            this.props.podcast.rating ? <ViewRating rating={this.props.podcast.rating} /> : null
        }
      </div>
    );
  }

}

PodcastListEntry.contextTypes = {
  router: PropTypes.object
}

PodcastListEntry.propTypes = {
  podcast: PropTypes.object.isRequired,
  onClickPodcast: PropTypes.func.isRequired
};

export default PodcastListEntry;
