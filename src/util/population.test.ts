import { colonyPopulationGrowth } from './population';

const _100M = 100000000;
const _100k = 100000;

test.skip('Home colony reaches max pop after a certain number of years', () => {
    const initialPop = _100M;
    const limitPop = 1.2 * _100M;

    let counter = 0;
    let pop = initialPop;

    while (pop <= limitPop - 1) {
        counter++;
        pop = colonyPopulationGrowth(pop, limitPop);
        console.log(`${counter}: ${Math.round(pop)}`);
    }

    expect(counter).toBe(57);
});

test('Home colony population increases after 1 period with limit of 200M', () => {
    const initialPop = _100M;
    const limitPop = 1.2 * _100M;

    const pop = colonyPopulationGrowth(initialPop, limitPop);

    expect(pop).toBe(104514718);
});

test('New colony initial population increases after 1 period with max of 100M', () => {
    const initialPop = _100k;
    const limitPop = _100M;

    const pop = colonyPopulationGrowth(initialPop, limitPop);

    expect(pop).toBe(134939);
});
