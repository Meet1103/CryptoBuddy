import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import store from './redux/store';
import './index.css';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import App from './App';

ReactDOM.render(
	<React.Fragment>
		<Router>
			<Provider store={store}>
				<App />
			</Provider>
		</Router>
	</React.Fragment>,
	document.getElementById('root')
);

serviceWorkerRegistration.register();
