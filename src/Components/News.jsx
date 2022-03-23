import React from 'react';
import { motion } from 'framer-motion';
import Loader from './Loader';
import ErrorPage from './ErrorPage';
import { useGetNewsQuery } from '../services/cryptoNewsApi';
import logo from '../assets/images/Cryptocurrency_Logo.svg';

const newsContainerVariant = {
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

const News = ({ topNews }) => {
	const newsCategory = 'cryptocurrencies';
	const count = topNews === true ? 4 : 20;
	let { data, isFetching } = useGetNewsQuery({
		newsCategory,
		count
	});

	if (isFetching) return <Loader />;

	const newsData = data?.value;

	return (
		<motion.div
			variants={newsContainerVariant}
			initial='initial'
			animate='animate'
			exit='exit'>
			<div className='grid grid-cols-1 m-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
				{newsData !== undefined ? (
					<>
						{newsData?.map((news, i) => (
							<a
								href={news.url}
								target='_blank'
								rel='noreferrer'
								key={i}
								className='transition duration-100 relative p-2 rounded-md shadow-lg hover:shadow-2xl transform hover:scale-103 bg-white text-black'>
								<div className='flex flex-col mb-2'>
									<span>
										<img
											src={
												news?.image?.thumbnail
													?.contentUrl || logo
											}
											alt='news'
											className='w-full h-44 sm:h-36 mb-1 rounded-md'
										/>
									</span>
									<span className='font-semibold'>
										{news?.name}
									</span>
								</div>
								<hr className='border-secondary' />
								<div className='mt-2 mb-5 flex'>
									<span className='max-h-24 leading-6 overflow-hidden'>
										{news?.description}
									</span>
								</div>
								<div className='absolute mt-2 bottom-1 font-semibold w-32 truncate ...'>
									<span>{news.provider[0].name}</span>
									<span className='fixed right-2'>
										{new Date(
											news?.datePublished
										).toLocaleDateString()}
									</span>
								</div>
								<div>
									<img
										src={
											news?.provider[0]?.image?.thumbnail
												?.contentUrl || logo
										}
										alt='news'
										className='absolute top-4 left-4 w-8 h-8'
									/>
								</div>
							</a>
						))}
					</>
				) : (
					<ErrorPage />
				)}
			</div>
		</motion.div>
	);
};

export default News;
