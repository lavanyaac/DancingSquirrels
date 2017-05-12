import React from 'react';

var ViewRating = ({ rating }) =>
  <div className="rating">
    <div id="wrapper">
      <form action="">
        <p className="clasificacion">
            <input id="radio1" disabled="true" type="radio"  name="estrellas" value="5" disabled="true" checked={rating >= 5 ? 'checked' : ''} />
            <label for="radio1">&#9733;</label>
            <input id="radio2" type="radio" name="estrellas" value="4" checked={rating == 4 ? 'checked' : '' }/>
            <label for="radio2">&#9733;</label>
            <input id="radio3" disabled="true"  type="radio" name="estrellas" value="3" checked={rating == 3 ? 'checked' : ''}/>
            <label for="radio3">&#9733;</label>
            <input id="radio4" disabled="true" type="radio" name="estrellas" value="2" checked={rating == 2 ? 'checked' : ''}/>
            <label for="radio4">&#9733;</label>
            <input id="radio5" disabled="true" type="radio" name="estrellas" value="1" checked={rating == 1 ? 'checked' : ''}/>
            <label for="radio5">&#9733;</label>
        </p>
      </form>
    </div>
  </div>

export default ViewRating;
