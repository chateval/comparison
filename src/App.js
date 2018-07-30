import React, { Component } from 'react';
const axios = require('axios');

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      models: []
    }
  }

  componentWillMount() {
    axios.get(process.env.REACT_APP_API_LOCATION + '/models')
    .then(response => {
      this.setState({'models': response.data.models})
      console.log(this.state.models)
    })
    .catch(error => {
      console.log(error);
    });
  }

  render() {
    const ModelTags = this.state.models.map(model => 
      <span className="tag is-info" key={model.model_id}> {model.name} </span>
    );

    return (
      <div className="container">
        <div className="columns">
          <div className="column">
            <br />
            <h1 className="title"> Comparison </h1>
            <h2 subtitle> All Models: </h2>
            {ModelTags}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
