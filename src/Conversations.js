import React, { Component } from 'react';
const axios = require('axios');

class Conversations extends Component {
  constructor(props) {
    super(props)

    this.state = {
      all_models: [],
      current_models: new Set(),
      prompts: []
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

    const Messages = Array.from(this.state.prompts).map(prompt => 
      <div className="column is-half">
        <div className="card">
          <div className="card-content">
            <h1 className="title"> {prompt.text} </h1>
            <div className="content">
                
            </div>
          </div>
        </div>  
      </div>
    );

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
            <article className="message">
              <div className="message-header is-success">
                <p>Currently comparing:</p>
                <button className="delete" onClick={() => this.setState({ current_models: new Set() })} aria-label="delete"></button>
              </div>
              <div className="message-body">
              {CurrentModelTags}
              </div>
            </article>
            <h2> All Models: </h2> {AllModelTags}
            <div className="columns is-multiline">
              {Messages}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Conversations;