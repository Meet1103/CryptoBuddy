import React, { useState } from 'react';
import { motion } from 'framer-motion';
import millify from 'millify';
import HTMLReactParser from 'html-react-parser';
import Loader from './Loader';
import ErrorPage from './ErrorPage';
import { useGetCoinExchangesQuery } from '../services/cryptoApi';

const exchangeContainerVariant = {
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

const expandedRowVariants = {
	collapsed: {
		y: '-10vh'
	},
	open: {
		y: 0,
		transition: {
			duration: 0.5
		}
	}
};

const Exchange = () => {
	const [isOpen, setIsOpen] = useState([]);
	const { data, isFetching } = useGetCoinExchangesQuery();

	const coinsExchange = data?.data?.exchanges;

	if (isFetching) return <Loader />;

	const toggleBtn = (key) => {
		const duplicatedIsOpenArray = isOpen.slice();
		const clickedRowKey = isOpen.indexOf(key);
		if (clickedRowKey !== -1) {
			duplicatedIsOpenArray.splice(clickedRowKey, 1);
			setIsOpen(duplicatedIsOpenArray);
		} else {
			duplicatedIsOpenArray.push(key);
			setIsOpen(duplicatedIsOpenArray);
		}
	};

	return (
		<motion.table
			variants={exchangeContainerVariant}
			initial='initial'
			animate='animate'
			exit='exit'
			className='m-auto table-fixed w-11/12 border-collapse p-2 my-4'>
			{coinsExchange !== undefined ? (
				<>
					<thead>
						<tr>
							<th className='p-2 text-left'>Exchange</th>
							<th className='p-2 text-left'>Markets</th>
							<th className='p-2 text-left'>
								Market Share
							</th>
							<th className='p-2 text-left'>Volume</th>
						</tr>
					</thead>
					<tbody>
						{coinsExchange?.map((coinExchange) => (
							<React.Fragment key={coinExchange?.uuid}>
								<tr
									onClick={() =>
										toggleBtn(coinExchange?.uuid)
									}
									className=' bg-white font-semibold cursor-pointer'>
									<td className='cursor-pointer p-3'>
										{coinExchange?.name}
									</td>
									<td className='cursor-pointer p-3 '>
										{millify(coinExchange?.numberOfMarkets)}
									</td>
									<td className='cursor-pointer p-3 '>
										{millify(coinExchange?.marketShare)}
									</td>
									<td className='cursor-pointer p-3 '>
										{millify(coinExchange?.volume)}
									</td>
								</tr>
								{isOpen.includes(coinExchange?.uuid) ? (
									<tr
										key={coinExchange?.uuid}
										className='bg-white font-semibold text-black border-t-1 border-solid border-secondary '>
										<motion.td
											variants={expandedRowVariants}
											initial='collapsed'
											animate='open'
											colSpan='4'
											className='p-3'>
											{HTMLReactParser(
												coinExchange?.description ||
													'Details Not Available'
											)}
										</motion.td>
									</tr>
								) : null}
								<tr className='bg-gray-500 h-4'></tr>
							</React.Fragment>
						))}
					</tbody>
				</>
			) : (
				<ErrorPage />
			)}
		</motion.table>
	);
};

export default Exchange;
