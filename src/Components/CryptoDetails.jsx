import React from 'react';
import { motion } from 'framer-motion';
import LineChart from './LineChart';
import millify from 'millify';
import HTMLReactParser from 'html-react-parser';
import {
	AiOutlineDollarCircle,
	AiOutlineNumber,
	AiOutlineThunderbolt,
	AiOutlineTrophy,
	AiOutlineFundProjectionScreen,
	AiOutlineMoneyCollect,
	AiOutlineCheck,
	AiOutlineStop,
	AiOutlineExclamationCircle
} from 'react-icons/ai';
import Loader from './Loader';
import ErrorPage from './ErrorPage';
import { useParams } from 'react-router-dom';
import { useGetCoinQuery } from '../services/cryptoApi';

const cryptoDetailsContainerVariant = {
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

const CryptoDetails = () => {
	const { coinId } = useParams();
	const { data, isFetching } = useGetCoinQuery(coinId);
	const coinDetails = data?.data?.coin;

	if (isFetching) return <Loader />;

	const coinStats = [
		{
			title: 'Rank',
			value: coinDetails?.rank,
			icon: <AiOutlineNumber />
		},
		{
			title: 'Price to USD',
			value: `$${
				coinDetails?.price && millify(coinDetails?.price)
			}`,
			icon: <AiOutlineDollarCircle />
		},
		{
			title: 'Market Cap',
			value: `$${
				coinDetails?.marketCap &&
				millify(coinDetails?.marketCap)
			}`,
			icon: <AiOutlineDollarCircle />
		},
		{
			title: '24H Volume',
			value: `$${
				coinDetails?.volume && millify(coinDetails?.volume)
			}`,
			icon: <AiOutlineThunderbolt />
		},
		{
			title: 'All Time High Price',
			value: `$${
				coinDetails?.allTimeHigh?.price &&
				millify(coinDetails?.allTimeHigh?.price)
			}`,
			icon: <AiOutlineTrophy />
		}
	];

	const genericStats = [
		{
			title: 'Number Of Markets',
			value: coinDetails?.numberOfMarkets,
			icon: <AiOutlineFundProjectionScreen />
		},
		{
			title: 'Number Of Exchanges',
			value: coinDetails?.numberOfExchanges,
			icon: <AiOutlineMoneyCollect />
		},
		{
			title: 'Aprroved Supply',
			value: coinDetails?.approvedSupply ? (
				<AiOutlineCheck />
			) : (
				<AiOutlineStop />
			),
			icon: <AiOutlineExclamationCircle />
		},
		{
			title: 'Total Supply',
			value: `$${
				coinDetails?.totalSupply &&
				millify(coinDetails?.totalSupply)
			}`,
			icon: <AiOutlineExclamationCircle />
		},
		{
			title: 'Circulating Supply',
			value: `$${
				coinDetails?.circulatingSupply &&
				millify(coinDetails?.circulatingSupply)
			}`,
			icon: <AiOutlineExclamationCircle />
		}
	];

	return (
		<motion.div
			variants={cryptoDetailsContainerVariant}
			initial='initial'
			animate='animate'
			exit='exit'>
			{coinDetails !== undefined ? (
				<>
					<div className='flex justify-center my-3 font-bold text-lg md:font-bold md:text-2xl lg:font-extrabold lg:text-2xl'>
						{coinDetails.name} ({coinDetails.symbol}) Details
					</div>
					<hr className='m-4 border-secondary' />
					<LineChart
						coinId={coinDetails.uuid}
						coinName={coinDetails.name}
						coinPrice={millify(coinDetails.price)}
					/>
					<div className='grid grid-cols-1 gap-4 lg:grid-cols-2 my-5'>
						<div className='w-4/5 m-auto'>
							<div>
								<div className='font-bold mb-2'>
									{coinDetails.name} Value Stats
								</div>
								{coinStats.map((coinstat) => (
									<div
										className='bg-gray-200 bg-opacity-20'
										key={coinstat.title}>
										<div className='flex justify-between items-center p-3'>
											<div className='flex flex-row items-center'>
												<span className='mr-1 text-primary'>
													{coinstat.icon}
												</span>
												<span>{coinstat.title}</span>
											</div>
											<span>{coinstat.value}</span>
										</div>
										<hr className='border-secondary' />
									</div>
								))}
							</div>
						</div>
						<div className='w-4/5 m-auto'>
							<div>
								<div className='font-bold mb-2'>
									Other Stats
								</div>
								{genericStats.map((genericstat) => (
									<div
										className='bg-gray-200 bg-opacity-20'
										key={genericstat.title}>
										<div className='flex justify-between items-center p-3'>
											<div className='flex flex-row items-center'>
												<span className='mr-1 text-primary'>
													{genericstat.icon}
												</span>
												<span>{genericstat.title}</span>
											</div>
											<span>{genericstat.value}</span>
										</div>
										<hr className='border-secondary' />
									</div>
								))}
							</div>
						</div>
					</div>
					<div className='grid grid-cols-1 gap-4 lg:grid-cols-2 my-6'>
						<div className='w-4/5 m-auto'>
							<span className='flex justify-start mb-3 font-bold'>
								What is {coinDetails.name} ?
							</span>
							{HTMLReactParser(coinDetails.description)}
						</div>
						<div className=' w-4/5 mx-auto lg:w-3/5'>
							<span className='flex justify-start mb-3 font-bold'>
								{coinDetails.name} Links
							</span>
							{coinDetails.links.map((link) => (
								<div key={link.url}>
									<div className='flex flex-wrap justify-between p-4 font-medium bg-gray-200 bg-opacity-20'>
										<span className='capitalize mr-2'>
											{link.type}
										</span>
										<a
											href={link.url}
											target='_blank'
											rel='noreferrer'
											className=' text-primary'>
											{link.name}
										</a>
									</div>
									<hr className='border-secondary' />
								</div>
							))}
						</div>
					</div>
				</>
			) : (
				<ErrorPage />
			)}
		</motion.div>
	);
};

export default CryptoDetails;
