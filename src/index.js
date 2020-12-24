import Eylem from 'eylem';
import { h, render, Fragment } from 'preact';
import { useEffect, useContext } from 'preact/hooks';
import { Canvas } from './CanvasComponents/Canvas';
import { Game } from './Game';
import { ActionContext, AnimationFrameContext, CanvasContext } from './contexts';
import { HEIGHT, WIDTH } from './constants';

const inputs = new Eylem(document, ['horizantal', 'vertical', "click"]);
inputs.bindInputMap(Eylem.KEY_DOWN, {
    83: { action: 'vertical', value: +1 },
    87: { action: 'vertical', value: -1 },
});

inputs.bindInputMap(Eylem.KEY_UP, {
    83: { action: 'vertical', value: 0 },
    87: { action: 'vertical', value: 0 },
});

inputs.bindInputMap(Eylem.MOUSE_DOWN, {
    0: { action: 'click', value: 1 }
});

inputs.bindInputMap(Eylem.MOUSE_UP, {
    0: { action: 'click', value: 0 }
});

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
            <ActionContext.Provider value={inputs}>
                <CanvasClear />
                <Game />
            </ActionContext.Provider>
        </Canvas>
    </div>;
}

render(<App />, document.body);