export const isIntersect = (A, B, C, D) => {
    const BA = {
        x: B.x - A.x,
        y: B.y - A.y
    };
    const CA = {
        x: C.x - A.x,
        y: C.y - A.y
    };
    const DC = {
        x: D.x - C.x,
        y: D.y - C.y
    };

    const numerator = (DC.y * CA.x) - (CA.y * DC.x);
    const denominator = (DC.y * BA.x) - (BA.y * DC.x);
    const t = numerator / denominator;

    const numerator2 = (BA.y * -CA.x) - (-CA.y * BA.x);
    const denominator2 = (BA.y * DC.x) - (DC.y * BA.x);
    const t2 = numerator2 / denominator2;

    return t >= 0 && t <= 1 && t2 >= 0 && t2 <= 1;
}

const fromAngle = angle => ({ x: Math.cos(angle), y: Math.sin(angle) });

const toAngle = vec => Math.atan2(vec.y, vec.x);

export const rotate = (vec, angle) => fromAngle(toAngle(vec) + angle);