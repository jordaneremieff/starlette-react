import React from 'react';
import axios from 'axios';


class Review extends React.Component {
  render() {
    const review = this.props.review;
    return (
      <tr>
        <td>{review.yelp_rating}</td>
        <td>{review.model_rating}</td>
        <td>{review.text}</td>
      </tr>
    );
  }
}

class Business extends React.Component {
  render() {
    if (!this.props.data) {
      return null;
    }
    const data = this.props.data;
  return (
    <div>
      <li>Business Name: {data.name}</li> 
      <li>Yelp Rating (overall rating): {data.yelp_rating}</li> 
      <li>Review Rating (scores of 20 most relevant reviews averaged out): {data.review_rating}</li> 
      <li>Model Rating: (model predicted scores of 20 most relevant reviews averaged out): {data.model_rating}</li> 
      <strong>Reviews</strong>
      <Reviews reviews={data.reviews} />
    </div>
  );
  }
}


class Reviews extends React.Component {
  render() {
    const reviews = this.props.reviews;
    const listItems = reviews.map((review) =>
    <tr>
      <Review review={review} />
    </tr>
  );
  return (
    <table>
        <tr>
          <th>Yelp Rating</th>
          <th>Model Rating</th>
          <th>Review</th> 
        </tr>
      {listItems}
    </table>
    
  );
  }
}

export default class App extends React.Component {
  state = { data: null, name: '', reviews: {} };

  handleChange = event => {
    this.setState({ name: event.target.value });
  }

  handleSubmit = event => {
    event.preventDefault();
    let url = encodeURIComponent(this.state.name);
    axios.get(`http://localhost:5432/business/${url}`)
      .then(response => this.setState({ data: response.data }))
      .catch(function (error) {
        console.log('Fetch error: ' + error.message);
      })
  }

  render() {
    const data = this.state.data;
    
    return (
      <div>
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            <strong>Enter Yelp URL: </strong>
            <input type="text" name="name" onChange={this.handleChange} />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
        <Business data={data} />
      </div>
      
    )
  }
}
