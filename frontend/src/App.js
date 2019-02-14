import React from 'react';
import axios from 'axios';

const Review = ({review}) => {
  return (
    <tr>
      <td>{review.yelp_rating}</td>
      <td>{review.model_rating}</td>
      <td>{review.text}</td>
    </tr>
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
      <Reviews reviews={data.reviews} />
    </div>
  );
};

const Reviews = ({reviews}) => {
  const listItems = reviews.map((review, i) => <Review key={i} review={review} />);
  return (
    <table>
      <thead>
        <tr>
          <th>Yelp Rating</th>
          <th>Model Rating</th>
          <th>Review</th> 
        </tr>
      </thead>
      <tbody>
        {listItems}
      </tbody>
    </table>
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

    axios.get(`http://localhost:5042/business/${url}`)
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
