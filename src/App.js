import React, { Component } from 'react';
import AutomaticEvaluation from './AutomaticEvaluation';
const axios = require('axios');

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      all_models: [],
      current_models: new Set(),
    }
  }

  componentWillMount() {
    axios.get(process.env.REACT_APP_API_LOCATION + '/models').then(response => {
      this.setState({'all_models': response.data.models})
    });
  }

  render() {
    const AllModelTags = Array.from(this.state.all_models).map(model =>  
      <span className="tag is-light" onClick={() => this.setState({ current_models: this.state.current_models.add(model)})} key={model.model_id}> {model.name} </span>
    );

    const CurrentModelTags = Array.from(this.state.current_models).map(model => 
      <span className="tag is-success" key={model.model_id}> {model.name} </span>
    );

    const AutomaticEvaluations = Array.from(this.state.current_models).map(model =>
      <AutomaticEvaluation key={model.model_id} model_name={model.name} model_id={model.model_id} />
    );

    return (
      <div className="container">
        <br />
        <div className="tabs is-boxed">
          <ul>
            <li className="is-active">
              <a>
                <span className="icon is-small"><i className="fas fa-robot" aria-hidden="true"></i></span>
                <span>Automatic Evaluations</span>
              </a>
            </li>
            <li>
              <a>
                <span className="icon is-small"><i className="fas fa-comments" aria-hidden="true"></i></span>
                <span>Conversations</span>
              </a>
            </li>
          </ul>
        </div>
        <div className="columns">
          <div className="column">
            <article className="message">
              <div className="message-header is-success">
                <p>Currently comparing:</p>
              </div>
              <div className="message-body">
              {CurrentModelTags}
              </div>
            </article>
            <h2> All Models: </h2> {AllModelTags}

            <div className="columns is-multiline">
              {AutomaticEvaluations}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;