/**
 * @typedef {PlaneProperties}
 * @property {number} x0 - top of render square
 * @property {number} y0 - left of render square
 * @property {number} k - number of pixels in one percent of size of current square
 */

/**
 * Takes clientHeight and clientWidth of document's body and calculates start coordinates and pixel coefficient
 * @returns {PlaneProperties}
 */
export const getPlaneProperties = () => {
    const height = document.body.clientHeight;
    const width = document.body.clientWidth;

    const isPortrait = height > width;

    const planeSize = isPortrait ? width : height;

    const x0 = (width - planeSize) / 2;
    const y0 = (height - planeSize) / 2;
    const k = planeSize / 100;

    const size = planeSize / 6;

    return {
        x0,
        y0,
        k,
        size
    }
}