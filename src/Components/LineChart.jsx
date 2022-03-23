import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import { useGetCoinHistoryQuery } from '../services/cryptoApi';

const lineChartContainerVariant = {
	initial: {
		x: '100vw',
		opacity: 0.5
	},
	animate: {
		x: 0,
		opacity: 1,
		transition: {
			duration: 0.2
		}
	}
};

const LineChart = ({ coinId, coinName, coinPrice }) => {
	const timePeriod = [
		'3h',
		'24h',
		'7d',
		'30d',
		'3m',
		'1y',
		'3y',
		'5y'
	];
	const [timeperiod, setTimeperiod] = useState('30d');
	const { data: coinHistory, isFetching } =
		useGetCoinHistoryQuery({ coinId, timeperiod });

	if (isFetching)
		return (
			<div className='flex justify-center items-center font-loadingText tracking-widest sm:font-bold sm:text-5xl h-80'>
				{`Loading ${coinName} Price Chart ...`}
			</div>
		);

	const coinHistoryData = coinHistory?.data?.history;

	const timeStamp = [];
	const pricing = [];

	coinHistoryData.forEach((coin) => {
		const formatedDate = new Date(
			coin.timestamp
		).toLocaleDateString();
		pricing.push(coin.price);
		timeStamp.push(formatedDate);
	});

	const onOptionChange = (e) => {
		setTimeperiod(e.target.value);
	};

	const data = {
		labels: timeStamp,
		datasets: [
			{
				label: `Price of ${coinName}`,
				data: pricing,
				backgroundColor: '#ff003f',
				borderColor: '#ff003f',
				pointBackgroundColor: '#ff003f',
				pointBorderColor: '#ff003f',
				fill: false
			}
		]
	};

	const options = {
		scales: {
			yAxis: {
				ticks: {
					beginAtZero: true
				}
			}
		},
		maintainAspectRatio: false
	};

	return (
		<motion.div
			variants={lineChartContainerVariant}
			initial='initial'
			animate='animate'>
			<div className='flex gap-4 mb-3 items-center justify-between mx-4 sm:mx-10'>
				<select
					className='w-2/6 sm:w-1/5 outline-none'
					value={timeperiod}
					onChange={onOptionChange}>
					{timePeriod.map((t, i) => (
						<option value={t} key={i}>
							{t}
						</option>
					))}
				</select>
				<span className='font-semibold text-base sm:text-lg lg:font-bold lg:text-lg'>
					Current Price: ${coinPrice}
				</span>
			</div>
			<div className='relative m-auto w-11/12 h-80  sm:h-70'>
				<Line data={data} options={options} />
			</div>
			<span className='flex justify-center mt-3 font-semibold text-base'>
				{coinName} Price Chart
			</span>
		</motion.div>
	);
};

export default LineChart;
