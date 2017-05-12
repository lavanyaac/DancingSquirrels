import React from 'react';
import PropTypes from 'prop-types';
import PodcastListEntry from './PodcastListEntry.jsx';

var PodcastList = function(props) {
  return (
    <div className='podcast-wrapper'>
      {
        props.podcasts.map((podcast, itr) =>
          <PodcastListEntry key={itr} podcast={podcast}/>
        )
      }
    </div>
  );
};

PodcastList.propTypes = {
  podcasts: PropTypes.array.isRequired
};

export default PodcastList;
