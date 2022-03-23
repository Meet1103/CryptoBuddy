import React from 'react';
import {
	Switch,
	Route,
	useLocation
} from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import CryptoList from './Components/CryptoList';
import CryptoDetails from './Components/CryptoDetails';
import News from './Components/News';
import Exchange from './Components/Exchange';

const App = () => {
	const location = useLocation();

	return (
		<div className='font-main'>
			<nav className='sticky top-0 z-50'>
				<Navbar />
			</nav>
			<main>
				<AnimatePresence exitBeforeEnter>
					<Switch location={location} key={location.key}>
						<Route exact path='/'>
							<Home />
						</Route>
						<Route exact path='/crypto'>
							<CryptoList topCryptos={false} />
						</Route>
						<Route exact path='/crypto/:coinId'>
							<CryptoDetails />
						</Route>
						<Route exact path='/news'>
							<News topNews={false} />
						</Route>
						<Route exact path='/exchange'>
							<Exchange />
						</Route>
					</Switch>
				</AnimatePresence>
			</main>
		</div>
	);
};

export default App;
