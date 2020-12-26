import { h, render, Fragment } from 'preact';
import { useEffect, useContext } from 'preact/hooks';
import { Canvas } from './CanvasComponents/Canvas';
import { Game } from './Game';
import { ActionContext, AnimationFrameContext, CanvasContext } from './contexts';
import { HEIGHT, WIDTH } from './constants';

const CanvasClear = () => {
    const { frame } = useContext(AnimationFrameContext)
    const ctx = useContext(CanvasContext)

    useEffect(() => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.rect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.fillStyle = "white";
    }, [frame])

    return <Fragment></Fragment>
}

const App = () => {
    return <div className="canvas-container">
        <Canvas width={WIDTH} height={HEIGHT} className="canvas">
                <CanvasClear />
                <Game />
        </Canvas>
    </div>;
}

render(<App />, document.body);