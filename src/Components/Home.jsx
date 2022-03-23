import React from 'react';
import { motion } from 'framer-motion';
import millify from 'millify';
import { Link } from 'react-router-dom';
import Loader from './Loader';
import CryptoList from './CryptoList';
import News from './News';
import ErrorPage from './ErrorPage';
import { useGetCoinsQuery } from '../services/cryptoApi';

const homeContainerVariant = {
	initial: {
		x: '100vw',
		opacity: 0.5
	},
	animate: {
		x: 0,
		opacity: 1,
		transition: {
			duration: 0.5
		}
	},
	exit: {
		x: '-100vw',
		opacity: 0,
		transition: {
			ease: 'easeInOut'
		}
	}
};

const Home = () => {
	const { data, isFetching } = useGetCoinsQuery(8);
	const cryptoInfo = data?.data?.stats;

	if (isFetching) return <Loader />;

	return (
		<motion.div
			variants={homeContainerVariant}
			initial='initial'
			animate='animate'
			exit='exit'
			className='p-2 text-black'>
			{cryptoInfo !== undefined ? (
				<>
					<h1 className='flex justify-center my-3 font-bold text-xl md:font-bold md:text-2xl lg:font-extrabold lg:text-2xl'>
						<span
							role='img'
							aria-label='chart-with-upward-trend'
							className='text-primary'>
							{String.fromCodePoint(0x1f4c8)}
						</span>
						<span className='px-2'>
							CryptoCurrencies Stats
						</span>
						<span
							role='img'
							aria-label='chart-with-downward-trend'
							className='text-primary'>
							{String.fromCodePoint(0x1f4c9)}
						</span>
					</h1>
					<div className='grid grid-cols-1 m-6 gap-5 font-normal sm:grid-cols-2 lg:grid-cols-3 lg:gap-6 lg:text-lg'>
						<p>
							Total CryptoCurrencies:{' '}
							<span className='font-semibold ml-2 text-primary'>
								{cryptoInfo?.total}
							</span>
						</p>
						<p>
							Total Markets:{' '}
							<span className='font-semibold ml-2 text-primary'>
								{millify(cryptoInfo?.totalMarkets)}
							</span>
						</p>
						<p>
							Total Exchanges:{' '}
							<span className='font-semibold ml-2 text-primary'>
								{millify(cryptoInfo?.totalExchanges)}
							</span>
						</p>
						<p>
							Total MarketCaps:{' '}
							<span className='font-semibold ml-2 text-primary'>
								${millify(cryptoInfo?.totalMarketCap)}
							</span>
						</p>
						<p>
							Total 24H Volume:{' '}
							<span className='font-semibold ml-2 text-primary'>
								${millify(cryptoInfo?.total24hVolume)}
							</span>
						</p>
					</div>
					<hr className='my-4 border-secondary' />
					<div className='flex gap-4 mb-3 items-center justify-between mx-2'>
						<span className='font-semibold text-base sm:text-lg lg:font-extrabold lg:text-2xl'>
							Top CryptoCurrencies
						</span>
						<button className=' text-primary text-base font-normal sm:text-lg sm:font-semibold rounded-md cursor-pointer p-2 items-baseline lg:font-extrabold lg:text-xl'>
							<Link to='/crypto'>Show More</Link>
						</button>
					</div>
					<CryptoList topCryptos={true} />
					<hr className='my-4 mt-6 border-secondary' />
					<div className='flex gap-4 mb-3 items-center justify-between mx-2'>
						<span className='font-semibold text-base sm:text-lg lg:font-extrabold lg:text-2xl'>
							Top CryptoCurrencies News
						</span>
						<button className='text-primary text-base font-normal sm:text-xl sm:font-semibold rounded-md cursor-pointer p-2 items-baseline lg:font-extrabold lg:text-xl'>
							<Link to='/news'>Show More</Link>
						</button>
					</div>
					<News topNews={true} />
				</>
			) : (
				<ErrorPage />
			)}
		</motion.div>
	);
};

export default Home;
