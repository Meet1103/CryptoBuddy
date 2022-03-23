import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CgMenuGridO, CgClose } from 'react-icons/cg';

const hamburgerMenuOpenContainerVariant = {
	open: {
		rotate: 90,
		scale: 1.3,
		transition: {
			duration: 0.3
		}
	}
};

const hamburgerMenuCloseContainerVariant = {
	close: {
		rotate: -90,
		scale: 1,
		transition: {
			duration: 0.3
		}
	}
};

const Navbar = () => {
	const [clicked, setClicked] = useState(false);

	const handleClick = () => {
		setClicked(!clicked);
	};

	return (
		<div className='flex items-center gap-4 bg-primary h-16 text-white justify-between px-4 py-3 sm:px-8'>
			<div className=' text-xl tracking-wide font-bold sm:text-2xl sm:font-extrabold sm:tracking-wider lg:tracking-widest'>
				<NavLink exact to='/'>
					CryptoBuddy
				</NavLink>
			</div>
			<div
				className='sm:block md:hidden cursor-pointer text-2xl'
				onClick={handleClick}>
				{clicked ? (
					<motion.div
						variants={hamburgerMenuOpenContainerVariant}
						animate='open'>
						<CgClose />
					</motion.div>
				) : (
					<motion.div
						variants={hamburgerMenuCloseContainerVariant}
						animate='close'>
						<CgMenuGridO />
					</motion.div>
				)}
			</div>
			<div
				className={`${
					clicked === false
						? 'hidden'
						: 'w-full bg-primary tracking-widest absolute pt-10 top-16 right-0 flex flex-col h-screen items-center'
				} font-bold text-lg md:tracking-wide md:pt-0 md:bg-opacity-0 md:top-0 md:flex md:flex-row md:h-16 md:justify-end md:right-8 md:items-center lg:tracking-widest`}
				onClick={handleClick}>
				<NavLink
					exact
					className='mx-1 my-3 hover:bg-white px-4 py-1 rounded-full hover:text-primary md:my-0'
					activeStyle={{
						backgroundColor: 'white',
						color: '#ff003f'
					}}
					to='/'>
					Home
				</NavLink>
				<NavLink
					exact
					className='mx-1 my-3 hover:bg-white  px-4 py-1 rounded-full hover:text-primary md:my-0'
					activeStyle={{
						backgroundColor: 'white',
						color: '#ff003f'
					}}
					to='/crypto'>
					CryptoCurrencies
				</NavLink>
				<NavLink
					exact
					className='mx-1 my-3 hover:bg-white  px-4 py-1 rounded-full hover:text-primary md:my-0'
					activeStyle={{
						backgroundColor: 'white',
						color: '#ff003f'
					}}
					to='/news'>
					News
				</NavLink>
				<NavLink
					exact
					className='mx-1 my-3 hover:bg-white  px-4 py-1 rounded-full hover:text-primary md:my-0'
					activeStyle={{
						backgroundColor: 'white',
						color: '#ff003f'
					}}
					to='/exchange'>
					Exchange
				</NavLink>
			</div>
		</div>
	);
};

export default Navbar;
