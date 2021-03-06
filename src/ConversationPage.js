import React, { Component } from 'react';
import Select from 'react-select'
import makeAnimated from 'react-select/lib/animated';
import Turn from './Turn';
const axios = require('axios');

class Conversations extends Component {
  constructor(props) {
    super(props)
    this.handleEvaluationDatasetChange = this.handleEvaluationDatasetChange.bind(this);
    this.handleModelChange = this.handleModelChange.bind(this);

    this.state = {
      all_models: [],
      current_models: new Set(),
      turns: [],
      prompts: []
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

    axios.get(process.env.REACT_APP_API_LOCATION + '/prompts?evalset=' + selectedOption.value).then(response => {
      this.setState({ prompts: response.data.prompts });
      this.setTurns([]);
    });
  }

  handleModelChange = (models) => {
    this.setState({ current_models: models });
    this.setTurns(models);
  }

  setTurns(models) {
    let turns = [];

    this.state.prompts.forEach(prompt => {
      let turn = { prompt: prompt.prompt_text, responses: [] };
      turns.push(turn);  
      this.setState({ turns });
    });

    for (let i = 0; i < models.length; i += 1) {
      const model = { name: models[i].label, model_id: models[i].value }
      const route = process.env.REACT_APP_API_LOCATION + '/responses?evalset=' + this.state.evalset + '&model_id=' + models[i].value;
      axios.get(route).then(response => {
        for (let j = 0; j < response.data.responses.length; j += 1) {
          turns[j].responses.push({ model, text: response.data.responses[j].response_text });
        }
        console.log(turns);
        this.setState({ turns });
      });
    }
  }

  render() {
    return (
      <div className="container">
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
              placeholder="Select Evaluation Dataset"
              className="vmargin"
              onChange={this.handleEvaluationDatasetChange}
            />
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
              {this.state.turns.map(turn => <Turn turn={turn} />)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Conversations;