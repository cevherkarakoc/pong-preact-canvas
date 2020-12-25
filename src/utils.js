export const isIntersect = (point, rect) => {
    const horizontal = point.x >= rect.x && point.x <= rect.x + rect.width
    const vertical = point.y >= rect.y && point.y <= rect.y + rect.height

    return horizontal && vertical
}

const fromAngle = angle => ({ x: Math.cos(angle), y: Math.sin(angle) });

const toAngle = vec => Math.atan2(vec.y, vec.x);

export const rotate = (vec, angle) => fromAngle(toAngle(vec) + angle);