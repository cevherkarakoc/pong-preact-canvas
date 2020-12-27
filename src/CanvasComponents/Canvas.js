import { h, Fragment } from 'preact';
import { useCallback, useState } from 'preact/hooks';
import { ASPECT_RATIO } from '../constants';
import { CanvasContext } from '../contexts';
import { AnimationFrame } from './AnimationFrame';

const resize = (node) => {
    const isH = window.innerWidth / window.innerHeight >= ASPECT_RATIO;
    const size = isH ? window.innerHeight : window.innerWidth;

    const width = isH ? size * ASPECT_RATIO : size;
    const height = isH ? size : size * (1 / ASPECT_RATIO);

    node.style.width = width + 'px';
    node.style.height = height + 'px';
}

export const Canvas = ({ children, className, width = 128, height = 128 }) => {
    const [ctx, setCtx] = useState(null);

    const ctxRef = useCallback((node) => {
        if (node !== null) {
            resize(node);
            window.addEventListener('resize', () => resize(node));

            const context = node.getContext('2d');
            context.fillStyle = 'white';
            setCtx(context);
        }
    }, []);

    return (
        <Fragment>
            <canvas className={className} ref={ctxRef} width={width} height={height}></canvas>
            <CanvasContext.Provider value={ctx}>
                {ctx && (
                    <AnimationFrame>
                        {children}
                    </AnimationFrame>
                )}
            </CanvasContext.Provider>
        </Fragment>
    );
};