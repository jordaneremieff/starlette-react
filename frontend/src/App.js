import React from 'react';
import axios from 'axios';

export default class App extends React.Component {
  state = {data: null, name: ''};

  handleChange = event => {
    this.setState({ name: event.target.value });
  }

  handleSubmit = event => {
    event.preventDefault();
    axios.get(`http://localhost:8000/hello/${this.state.name}`)
    .then(response => this.setState({data:response.data}))
    .catch(function(error) {
     console.log('Fetch error: ' + error.message);
   })
  }

  render() {

    // `name` is the current input value of the form.
    const name = this.state.name;

    // `data` is the response returned by the backend.
    const data = this.state.data;

    // `message` will default to "Hello", but will be replaced with the "Hello {name}"
    // value contained in the `data.message` payload.
    var message = "Hello";

    console.log(data);

    // Assign the payload value if it exists
    if (this.state.data !== null) {
      message = this.state.data.message;
    }


    return (
      <div>
      <strong>Name</strong>: {name}<br/>

      <form onSubmit={this.handleSubmit}>
      <label>
      <strong>Enter name: </strong>
      <input type="text" name="name" onChange={this.handleChange} />
      </label>
      <button type="submit">Submit</button>
      </form>

      <strong>Message</strong>: {message}<br/><br/>
      </div>
      )
    }
  }
