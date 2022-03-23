import React from 'react';
import { motion } from 'framer-motion';
import logo from '../assets/images/Cryptocurrency_Logo.svg';

const loaderContainerVariant = {
	animate: {
		x: [0, 60],
		transition: {
			x: {
				repeat: Infinity,
				repeatType: 'reverse',
				duration: 0.5,
				delay: 0
			}
		}
	}
};

const Loader = () => {
	return (
		<div className='flex h-80 justify-center items-center'>
			<div className='flex justify-start m-10 items-center w-28 h-12 bg-primary rounded-full'>
				<motion.div
					variants={loaderContainerVariant}
					animate='animate'
					className='w-8 m-2 h-8 p-1 bg-white rounded-full'>
					<img src={logo} alt='crypto' />
				</motion.div>
			</div>
		</div>
	);
};

export default Loader;
