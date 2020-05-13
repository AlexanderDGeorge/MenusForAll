import React from 'react';
import { useSpring, animated } from 'react-spring';

export function Toggle({ toggle, setToggle, size = 30 }) {

    const [background, setBackground] = useSpring(() => ({ 
        backgroundColor: 'var(--light)', height: size, width: size * 2, borderRadius: size 
    }))
    const [button, setButton] = useSpring(() => ({ 
        left: -1, height: size, width: size 
    }))

    function handleClick() {
        setToggle(!toggle);
        setBackground({ backgroundColor: toggle ? 'var(--light)' : 'var(--lightgreen)' })
        setButton({ left: toggle ? -1 : size })
    }

    return (
        <animated.div style={background} className='Toggle' onClick={handleClick}>
            <animated.div style={button} className='Toggle-button'/>
        </animated.div>
    )
}