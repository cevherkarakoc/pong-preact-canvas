import { h, Fragment } from 'preact';
import { useContext, useLayoutEffect } from 'preact/hooks';
import { CanvasContext, AnimationFrameContext } from '../contexts';

export const Rect = ({ x = 0, y = 0, width = 10, height = 10 }) => {
    const { frame } = useContext(AnimationFrameContext);
    const ctx = useContext(CanvasContext);

    useLayoutEffect(() => {
        ctx.beginPath();
        ctx.rect(x, y, width, height);
        ctx.fill();
    }, [frame])

    return (
        <Fragment>
        </Fragment>
    );
};