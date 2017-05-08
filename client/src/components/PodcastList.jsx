import React from 'react';
import PropTypes from 'prop-types';
import PodcastListEntry from './PodcastListEntry.jsx';

var PodcastList = function(props) {
  return (
    <div>
      {
        props.podcasts.map((podcast) => 
          <PodcastListEntry podcast={podcast} />
        )
      }
    </div>
  );
};

PodcastList.propTypes = {
  podcasts: PropTypes.array.isRequired
}

export default PodcastList;