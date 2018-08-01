import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';
import Conversations from './Conversations';
import Comparisons from './Comparisons';

const Routes = () => (
    <Router>
      <div>
        <Route exact path="/" component={Comparisons}/>
        <Route exact path="/conversations" component={Conversations}/>
      </div>
    </Router>
  )

ReactDOM.render(<Routes />, document.getElementById('root'));
registerServiceWorker();