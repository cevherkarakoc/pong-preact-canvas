import { h, Fragment } from 'preact';
import { Rect } from './CanvasComponents/Rect';
import { WIDTH } from './constants';

const RANGE = Array(16).fill(0);

export const Midfield = () => {
    return <Fragment>
        {
            RANGE.map((_, index) => <Rect x={WIDTH / 2 - 8} y={index * 48 - 16} width={16} height={32} />)
        }
    </Fragment>
}
