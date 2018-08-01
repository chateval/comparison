import React, { Component } from 'react';
import Select from 'react-select'
import makeAnimated from 'react-select/lib/animated';
import Turn from './Turn';
const axios = require('axios');

class Conversations extends Component {
  constructor(props) {
    super(props)
    this.getTurns = this.getTurns.bind(this);
    this.handleEvaluationDatasetChange = this.handleEvaluationDatasetChange.bind(this);
    this.handleModelChange = this.handleModelChange.bind(this);

    this.state = {
      all_models: [],
      current_models: new Set(),
      prompts: [],
    }
  }

  componentWillMount() {
    axios.get(process.env.REACT_APP_API_LOCATION + '/models').then(response => {
      let options = [];
      response.data.models.forEach(model => {
        options.push({ 'value': model.model_id, 'label': model.name})
      });

      this.setState({'model_options': options})
    });

    axios.get(process.env.REACT_APP_API_LOCATION + '/evaluationdatasets').then(response => {
      let options = [];
      response.data.evaluationdatasets.forEach(evalset => {
        options.push({ 'value': evalset.evalset_id, 'label': evalset.name})
      });

      this.setState({'options': options})
    });

    axios.get(process.env.REACT_APP_API_LOCATION + '/prompts?evalset=' + this.state.evalset).then(response => {
      this.setState({'prompts': response.data.prompts})
    });
  }

  getTurns() {
    const turns = [{
      "prompt": {
        "text": "yo"
      },
      "responses": [{
        "model": {
          "id": 1,
          "name": "Test Model"
        },
        "text": "sup"
      }]
    }];

    return turns;
  }

  handleEvaluationDatasetChange = (selectedOption) => {
    this.setState({ evalset: selectedOption.value });
  }

  handleModelChange = (options) => {
    this.setState({ current_models: options })
  }

  render() {
    return (
      <div className="container">
        <br />
        <Select
          closeMenuOnSelect={false}
          components={makeAnimated()}
          isMulti
          placeholder="Models"
          options={this.state.model_options}
          onChange={this.handleModelChange}
        />
        <br />
        <div className="tabs is-boxed">
          <ul>
            <li>
              <a href="/">
                <span className="icon is-small"><i className="fas fa-robot" aria-hidden="true"></i></span>
                <span>Automatic Evaluations</span>
              </a>
            </li>
            <li className="is-active" onClick={this.setTab}>
              <a href="/conversations">
                <span className="icon is-small"><i className="fas fa-comments" aria-hidden="true"></i></span>
                <span>Conversations</span>
              </a>
            </li>
          </ul>
        </div>

        <div className="columns">
          <div className="column">
            <Select 
              options={this.state.options} 
              placeholder="Evaluation Dataset"
              className="vmargin"
              onChange={this.handleEvaluationDatasetChange}
            />
            <br />
            <div className="columns is-multiline">
              {this.getTurns().map(turn => <Turn turn={turn} />)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Conversations;