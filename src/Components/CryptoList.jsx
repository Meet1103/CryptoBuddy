import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import millify from 'millify';
import Loader from './Loader';
import ErrorPage from './ErrorPage';
import { useGetCoinsQuery } from '../services/cryptoApi';

const cryptoListContainerVariant = {
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

const CryptoList = ({ topCryptos }) => {
	const count = topCryptos === true ? 8 : 100;

	const [searchCrypto, setSearchCrypto] = useState('');
	const { data, isFetching } = useGetCoinsQuery(count);
	const cryptos = data?.data?.coins;

	const onSearchChange = (e) => {
		setSearchCrypto(e.target.value);
	};

	const filteredCryptos = cryptos?.filter((crypto) => {
		return crypto?.name
			.toLowerCase()
			.includes(searchCrypto.toLowerCase());
	});

	if (isFetching) return <Loader />;

	return (
		<motion.div
			variants={cryptoListContainerVariant}
			initial='initial'
			animate='animate'
			exit='exit'>
			{filteredCryptos !== undefined ? (
				<>
					{!topCryptos && (
						<div className='flex justify-center my-4'>
							<input
								className='p-2 bg-white rounded-lg shadow-md focus:outline-none'
								placeholder='Search'
								type='text'
								value={searchCrypto}
								onChange={onSearchChange}
							/>
						</div>
					)}
					<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 m-2'>
						{filteredCryptos?.map((coin) => (
							<Link
								to={`/crypto/${coin.uuid}`}
								key={coin?.uuid}
								className='p-3 rounded-sm shadow-md transition duration-100 hover:shadow-2xl transform hover:scale-103 bg-white text-black'>
								<div className='flex mb-2 font-semibold justify-between items-center'>
									<div className='truncate ...'>
										<span className='mx-1'>
											{coin?.rank}.
										</span>
										<span>{coin?.name}</span>
									</div>
									<img
										className='h-6'
										src={coin?.iconUrl}
										alt={coin?.name}
									/>
								</div>
								<hr className='border-secondary' />
								<div className='flex flex-col p-1 mt-1'>
									<span className='mb-1'>
										Symbol: {coin?.symbol}
									</span>
									<span className='mb-1'>
										Price: $
										{coin?.price && millify(coin?.price)}
									</span>
									<span>
										Market Cap: $
										{coin?.marketCap &&
											millify(coin?.marketCap)}
									</span>
								</div>
							</Link>
						))}
					</div>
				</>
			) : (
				<ErrorPage />
			)}
		</motion.div>
	);
};

export default CryptoList;
