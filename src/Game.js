import { h, Fragment } from 'preact';
import { useContext, useLayoutEffect, useState } from 'preact/hooks';
import inputs from './inputs';
import { FilledText } from './CanvasComponents/FilledText';
import { Rect } from './CanvasComponents/Rect';
import { HEIGHT, WIDTH } from './constants';
import { AnimationFrameContext } from './contexts';
import { Midfield } from './Midfield';
import { isIntersect, rotate , toAngle} from './utils';

const SPEED_FACTOR = 12;
const BAR_WIDTH = 25;
const BAR_HEIGHT = BAR_WIDTH * 4;
const TOP_BOTTOM_PADDING = 0;
const BALL_SIZE = 16;
const BALL_SPEED = 12;

const randomAngle = (dir) => {
    if(dir) {
        if(Math.abs(Math.tan(toAngle(dir))) < 0.5) {
            return Math.PI * 0.25 + (Math.random() - 0.5) * 0.1;
        }
        return Math.PI * (Math.floor(Math.random() * 5) * 0.02 + 0.46);
    }

    return Math.PI;
};

const randomBallStart = () => {
    const direction = rotate({ x: Math.random() > 0.5 ? 1 : -1, y: 0 }, randomAngle() * Math.random() > 0.5 ? 1 : -1)
    return {
        x: WIDTH / 2,
        y: HEIGHT / 2,
        dirX: direction.x,
        dirY: direction.y,
    }
}

export const Game = () => {
    const { frame } = useContext(AnimationFrameContext);
    const [leftBarY, setLeftBarY] = useState(100);
    const [rightBarY, setRightBarY] = useState(HEIGHT - 100);
    const [score, setScore] = useState(0);

    const [ballPosition, setBallPosition] = useState(randomBallStart());

    useLayoutEffect(() => {
        setLeftBarY((_leftBarY) => {
            return Math.max(Math.min(_leftBarY + (inputs.actions.vertical * SPEED_FACTOR), HEIGHT - (BAR_HEIGHT + TOP_BOTTOM_PADDING)), TOP_BOTTOM_PADDING);
        });

        setRightBarY((_rightBarY) => {
            return Math.max(Math.min(_rightBarY + (-inputs.actions.vertical * SPEED_FACTOR), HEIGHT - (BAR_HEIGHT + TOP_BOTTOM_PADDING)), TOP_BOTTOM_PADDING);
        });

        setBallPosition(({ x, y, lastPong, dirX, dirY }) => {
            const nextPos = {
                x: x + dirX * BALL_SPEED,
                y: y + dirY * BALL_SPEED,
            };

            if (nextPos.x < 0 || nextPos.x > WIDTH + BALL_SIZE) {
                setScore(0);
                return randomBallStart();
            }

            const isIntersectLeft = dirX <= 0 && isIntersect(
                nextPos,
                { x: BAR_WIDTH, y: leftBarY - BALL_SIZE, width: BAR_WIDTH, height: BAR_HEIGHT + BALL_SIZE },
            )

            const isIntersectRight = !isIntersectLeft && dirX >= 0 && isIntersect(
                nextPos,
                { x: WIDTH - (BAR_WIDTH * 2) - BALL_SIZE, y: rightBarY - BALL_SIZE, width: BAR_WIDTH, height: BAR_HEIGHT + BALL_SIZE },
            )

            const isIntersectTop = nextPos.y < 0 && dirY <= 0;

            const isIntersectBottom = nextPos.y > HEIGHT - BALL_SIZE && dirY >= 0;

            if (isIntersectLeft || isIntersectRight) {
                setScore(_score => _score + 1)
            }

            const dirFix = (isIntersectLeft || isIntersectRight) ? -1 : 1;
            const angleFix = (dirX * dirY) > 0 ? -1 : 1;
            
            const angle = randomAngle({x: dirX, y: dirY}) * dirFix * angleFix;

            const newDir = (isIntersectLeft || isIntersectRight || isIntersectTop || isIntersectBottom) ? rotate({ x: dirX, y: dirY }, angle) : { x: dirX, y: dirY }

            return {
                ...nextPos,
                dirX: newDir.x,
                dirY: newDir.y,
            };


        })
    }, [frame]);

    return <Fragment>
        <Midfield />
        <FilledText x={WIDTH / 2 + 64} y={128} fontSize={128}>{score}</FilledText>
        <FilledText x={WIDTH / 2 - 350} y={54} fontSize={14}>Use W/S keys to control the paddles</FilledText>
        <Rect x={ballPosition.x} y={ballPosition.y} width={BALL_SIZE} height={BALL_SIZE} />
        <Rect x={BAR_WIDTH} y={leftBarY} width={BAR_WIDTH} height={BAR_HEIGHT} />
        <Rect x={WIDTH - (BAR_WIDTH * 2)} y={rightBarY} width={BAR_WIDTH} height={BAR_HEIGHT} />
    </Fragment >
}