import { h, Fragment } from 'preact';
import { useCallback, useState } from 'preact/hooks';
import { CanvasContext } from '../contexts';
import { AnimationFrame } from './AnimationFrame';

export const Canvas = ({ children, className, width = 128, height = 128 }) => {
    const [ctx, setCtx] = useState(null);

    const ctxRef = useCallback((node) => {
        if (node !== null) {
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