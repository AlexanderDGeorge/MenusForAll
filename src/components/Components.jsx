import React, { useState } from 'react';
import { useSpring, useTransition, animated } from 'react-spring';

export function Toggle({ toggle, setToggle, size = 30 }) {
	const [background, setBackground] = useSpring(() => ({
		backgroundColor: 'var(--light)',
		height: size,
		width: size * 2,
		borderRadius: size,
	}));
	const [button, setButton] = useSpring(() => ({
		left: -1,
		height: size,
		width: size,
	}));

	function handleClick() {
		setToggle(!toggle);
		setBackground({
			backgroundColor: toggle ? 'var(--light)' : 'var(--lightgreen)',
		});
		setButton({ left: toggle ? -1 : size });
	}

	return (
		<animated.div
			style={background}
			className="Toggle"
			onClick={handleClick}
		>
			<animated.div style={button} className="Toggle-button" />
		</animated.div>
	);
}

export function Message({ message, onClick }) {
	const [toggle, setToggle] = useState(false);
	const [box, setBox] = useSpring(() => ({
		opacity: 1,
	}));
	const transitions = useTransition(toggle, null, {
		from: {
			position: 'absolute',
			bottom: -1,
			left: -1,
			height: 5,
			width: 0,
			background: 'var(--lightgreen)',
		},
		enter: { width: 0 },
		leave: { width: 300 },
	});

	function handleHover() {
		setBox({ scale: 1.1, shadow: 15 });
		setToggle(true);
		setTimeout(() => setBox({ opacity: 0 }), 1000);
	}

	return (
		<animated.div
			className="Message"
			style={box}
			onClick={onClick}
			onMouseEnter={handleHover}
		>
			{message}
			{transitions.map(({ key, item, props }) => (
				<animated.div style={props} />
			))}
		</animated.div>
	);
}
