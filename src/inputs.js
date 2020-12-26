import Eylem from 'eylem';

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

export default inputs;
