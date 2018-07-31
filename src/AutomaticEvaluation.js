import React, { Component } from 'react';
const axios = require('axios');

class AutomaticEvaluation extends Component {
  constructor(props) {
    super(props)

    this.state = {
      automatic_evaluations: [],
      auto_evals: []
    }
  }

  componentWillMount() {
    axios.get(process.env.REACT_APP_API_LOCATION + '/automatic_evaluations?model_id=' + this.props.model_id).then(response => {
      this.setState({'auto_evals': response.data.evaluations[0].auto_evals, 'evalset': response.data.evaluations[0].evalset})
    });
  }
  

  render() {
    const AutomaticEvaluations = Array.from(this.state.auto_evals).map(evaluation => 
      <tr>
        <td> <a href=""> </a> {evaluation.name} </td>
        <td> {evaluation.value} </td>
      </tr>
    );

    return (
      <div className="column is-half">
        <div className="card">
          <div className="card-content">
            <h1 className="title"> {this.props.model_name} </h1>
            <h2 className="subtitle"> Evaluation Dataset </h2>
            <div className="content">
              <table className="table is-bordered">
                <thead>
                  <th>Measure</th>
                  <th>Value</th>
                </thead>
                <tbody>
                  {AutomaticEvaluations}
                </tbody>
              </table>
            </div>
          </div>
        </div>  
      </div>
    );
  }
}

export default AutomaticEvaluation;