import { h } from 'preact';
import { useRef, useCallback, useState, useEffect } from 'preact/hooks';
import { AnimationFrameContext } from '../contexts';

export const AnimationFrame = ({ children }) => {
    const [value, setValue] = useState({
        frame: 0,
        delta: 0,
        time: 0,
    });

    const requestRef = useRef();

    const animate = useCallback((currentTime) => {
        setValue(({ frame, time }) => {
            const newTime = currentTime * 0.001;
            const delta = newTime - time;

            return {
                frame: frame + 1,
                time: newTime,
                delta,
            };
        });

        requestRef.current = requestAnimationFrame(animate);
    }, []);

    useEffect(() => {
        requestRef.current = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(requestRef.current);
    }, [animate]);

    return <AnimationFrameContext.Provider value={value}>{children}</AnimationFrameContext.Provider>;
};
