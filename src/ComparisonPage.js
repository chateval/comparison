import React, { Component } from 'react';
import Select from 'react-select'
import makeAnimated from 'react-select/lib/animated';
import AutomaticEvaluation from './AutomaticEvaluation';
const axios = require('axios');

class Comparisons extends Component {
  constructor(props) {
    super(props);
    this.handleEvaluationDatasetChange = this.handleEvaluationDatasetChange.bind(this);
    this.handleModelChange = this.handleModelChange.bind(this);

    this.state = {
      all_models: [],
      current_models: new Set()
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
  }

  handleEvaluationDatasetChange = (selectedOption) => {
    this.setState({ evalset: selectedOption.value });

  }

  handleModelChange = (options) => {
    this.setState({ current_models: options });
  }

  render() {
    const AutomaticEvaluations = Array.from(this.state.current_models).map(model =>
      <AutomaticEvaluation key={model.value} model_name={model.label} model_id={model.value} />
    );

    return (
      <div className="container">
        <br />
        <div className="tabs is-boxed">
          <ul>
            <li className="is-active">
              <a href="/">
                <span className="icon is-small"><i className="fas fa-robot" aria-hidden="true"></i></span>
                <span>Automatic Evaluations</span>
              </a>
            </li>
            <li className="" onClick={this.setTab}>
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
              closeMenuOnSelect={false}
              components={makeAnimated()}
              isMulti
              placeholder="Select Models"
              options={this.state.model_options}
              onChange={this.handleModelChange}
            />
            <br />
            <div className="columns is-multiline">
              {AutomaticEvaluations}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Comparisons;