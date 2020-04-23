import { getPlaneProperties } from './util';

describe('Correct positioning', () => {
    it('returns result with defined values', () => {
        const actualResult = getPlaneProperties();

        // jest.spyOn(document.body, 'clientHeight', 'get')
        //     .mockImplementation(() => 100);

        expect(actualResult.x0).not.toBe(void 0);
        expect(actualResult.y0).not.toBe(void 0);
        expect(actualResult.k).not.toBe(void 0);
    });

    describe.each([
    //  width,  height, x0,     y0,     k           size
    [   1024,   768,    128,    0,      768/100,    128],
    [   768,    1024,   0,      128,    768/100,    128]
    ])('should return correct results', (testWidth, testHeight, expectedX0, expectedY0, expectedK, expectedSize) => {
        it(`height=${testHeight}, width=${testWidth} => ` +
            `x0=${expectedX0}, y0=${expectedY0}, k=${expectedK}, size=${expectedSize}`,
        () => {
            const clientHeightSpy = jest.spyOn(document.body, 'clientHeight', 'get');
            const clientWidthSpy = jest.spyOn(document.body, 'clientWidth', 'get');

            clientHeightSpy.mockImplementation(() => testHeight);
            clientWidthSpy.mockImplementation(() => testWidth);

            const { x0, y0, k, size } = getPlaneProperties();

            expect(x0).toEqual(expectedX0);
            expect(y0).toEqual(expectedY0);
            expect(k).toEqual(expectedK);
            expect(size).toEqual(expectedSize);

            clientHeightSpy.mockRestore();
            clientWidthSpy.mockRestore();
        });
    })
});
