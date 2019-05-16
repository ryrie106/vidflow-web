import React from 'react';
import ReactDOM from 'react-dom';
import Home from './Home';
import Footer from './Footer';
import './index.css';

const Index = () => (
    <div>
        <Home />
        <Footer />
    </div>
);

ReactDOM.render(<Index/>, document.getElementById('root'));

// import * as serviceWorker from './serviceWorker';
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
