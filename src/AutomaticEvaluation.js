import React, { Component } from 'react';
const axios = require('axios');

class AutomaticEvaluation extends Component {
  constructor(props) {
    super(props)

    this.state = {
      evaluations: []
    }
  }

  componentWillMount() {
    axios.get(process.env.REACT_APP_API_LOCATION + '/automatic_evaluations?model_id=' + this.props.model_id).then(response => {
      this.setState({'evaluations': response.data.evaluations})
    });
    
    axios.get(process.env.REACT_APP_API_LOCATION + '/automatic_evaluations?model_id=' + this.props.model_id).then(response => {
      this.setState({'evaluations': response.data.evaluations})
    });
  }

  renderEvaluation(evaluation) {
    return(
      <tr>
        <td> <a href=""> </a> {evaluation.name} </td>
        <td> {evaluation.value} </td>
      </tr>
    );
  }

  render() {
    const AutomaticEvaluations = Array.from(this.state.evaluations).map(evaluation => 
      <div>
        <h2 className="subtitle"> {evaluation.evalset.name} </h2>
        <div className="content">
          <table className="table is-bordered">
            <thead>
              <th>Measure</th>
              <th>Value</th>
            </thead>
            <tbody>
              {evaluation.auto_evals.map(this.renderEvaluation.bind(this))}
            </tbody>
          </table>
        </div>
      </div>
    );

    return (
      <div className="column is-half">
        <div className="card">
          <div className="card-content">
            <h1 className="title"> {this.props.model_name} </h1>
            {AutomaticEvaluations}
          </div>
        </div>  
      </div>
    );
  }
}

export default AutomaticEvaluation;