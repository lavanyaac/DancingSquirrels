import React from 'react';
import $ from 'jQuery';

class Rating extends React.Component{
  constructor(props){
    super(props);
  }

  handleOnRatingClick(e){
    console.log($(e.target.previousSibling).val());
    $(e.target.previousSibling).prop("checked", true);
    var rating = $(e.target.previousSibling).val();
    $.post('/addRating', {collectionId:this.props.collectionId, rating: rating})
      .done(result => console.log(result));
  }

  render(){
    return(
      <div className="rating">Rate This
        <div id="wrapper">
          <form action="" onClick={(e) => this.handleOnRatingClick(e)}>
            <p className="clasificacion">
                <input id="radio10" type="radio" name="estrellas1" value="5"/>
                <label for="radio10">&#9733;</label>
                <input id="radio20" type="radio" name="estrellas1" value="4" />
                <label for="radio20">&#9733;</label>
                <input id="radio30" type="radio" name="estrellas1" value="3" />
                <label for="radio30">&#9733;</label>
                <input id="radio40" type="radio" name="estrellas1" value="2" />
                <label for="radio40">&#9733;</label>
                <input id="radio50" type="radio" name="estrellas1" value="1" />
                <label for="radio50">&#9733;</label>
            </p>
          </form>
        </div>
      </div>
    )
  }

}

export default Rating;
