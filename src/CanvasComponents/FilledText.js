import { h, Fragment } from 'preact';
import { useContext, useLayoutEffect } from 'preact/hooks';
import { CanvasContext, AnimationFrameContext } from '../contexts';

export const FilledText = ({ x = 0, y = 0, fontSize = 16, children }) => {
    const { frame } = useContext(AnimationFrameContext);
    const ctx = useContext(CanvasContext);

    useLayoutEffect(() => {
        ctx.font = `${fontSize}px monospace`;
        ctx.fillText(children, x, y);
    }, [ctx, x, y, fontSize, children, frame])

    return (
        <Fragment>
        </Fragment>
    );
};