import React, { Component } from 'react';

class Turn extends Component {
  render() {
    const renderResponses = Array.from(this.props.turn.responses).map(response => 
      <div>
      <p> <span className="tag is-success" > {response.model.name} </span> {response.text} </p>
      </div>
    );

    return (
      <div className="column is-half">
        <div className="card">
          <div className="card-content">
            <h1 className="title"> {this.props.turn.prompt.text} </h1>
            {renderResponses}
          </div>
        </div>  
      </div>
    );
  }
}

export default Turn;