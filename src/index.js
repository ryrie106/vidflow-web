import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './Home';
import Footer from './Footer';
import Write from './Write';
import './index.css';

const Index = () => (
    <BrowserRouter>
        <Route exact path="/" component={Home} />
        <Route path="/write" component={Write} />
        <Footer />
    </BrowserRouter>
);

ReactDOM.render(<Index/>, document.getElementById('root'));

// import * as serviceWorker from './serviceWorker';
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
