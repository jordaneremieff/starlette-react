import React from 'react';
import axios from 'axios';

const Review = ({review}) => {
  return (
    <div className="review">
      <p className="review-text">{review.text}</p>
      <div className="review-ratings">
        <p className="yelp-rating">Yelp Rating: {review.yelp_rating}</p>
        <p className="model-rating">Model Rating: {review.model_rating}</p>
      </div>
    </div>
  );
};

const Business = ({data}) => {
  if (!data) return null;
  return (
    <div>
      <ul>
        <li>Business Name: {data.name}</li>
        <li>Yelp Rating (overall rating): {data.yelp_rating}</li>
        <li>Review Rating (scores of 20 most relevant reviews averaged out): {data.review_rating}</li>
        <li>Model Rating: (model predicted scores of 20 most relevant reviews averaged out): {data.model_rating}</li>
      </ul>
      <strong>Reviews</strong>
      <div className="reviews">
        {data.reviews.map((review, i) => <Review key={i} review={review} />)}
      </div>
    </div>
  );
};

export default class App extends React.Component {
  state = {
    data: null,
    name: '',
    loading: false,
    reviews: {}
  };

  handleChange = event => {
    this.setState({name: event.target.value});
  }

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.loading) return;

    this.setState({loading: true});

    const url = encodeURIComponent(this.state.name);
    const hostname = window.location.origin;

    axios.get(`${hostname}/business?url=${url}`)
      .then(response => this.setState({data: response.data, loading: false}))
      .catch((error) => {
        this.setState({loading: false});
        console.log('Fetch error: ' + error.message);
      });
  }

  render() {
    const data = this.state.data;
    
    return (
      <div className="app">
        <form onSubmit={this.handleSubmit}>
          <label>
            <strong>Enter Yelp URL:</strong>
            <input type="text" name="name" onChange={this.handleChange} value={this.state.name} />
          </label>
          <button type="submit">{this.state.loading ? 'Loading...' : 'Submit'}</button>
        </form>
        <Business data={data} />
      </div>
    );
  }
}
