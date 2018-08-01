import React, { Component } from 'react';

class Turn extends Component {
  render() {
    const renderResponses = Array.from(this.props.turn.responses).map(response => 
      <p className="vlist"> <span className="tag is-success vlist" > {response.model.name} </span> {response.text} </p>
    );

    return (
      <div className="column is-half">
        <div className="card">
          <div className="card-content">
            <h1 className="title"> {this.props.turn.prompt} </h1>
            {renderResponses}
          </div>
        </div>  
      </div>
    );
  }
}

export default Turn;