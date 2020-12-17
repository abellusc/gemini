const common = require('./common');
const _ = require('lodash');

describe('Deep Filter and Find', () => {
    let defaultObject;
    let testObject;
    beforeAll(() => {
        defaultObject = {
            hello: 'world',
            test: {
                hey: 'there',
                exclude: 'blah'
            }
        };
    })
    beforeEach(() => {
        testObject = _.cloneDeep(defaultObject);
    });
    it ('should have cloned properties', () => {
        Object.keys(defaultObject).forEach((k) => expect(testObject[k]).toStrictEqual(defaultObject[k]));
    });
    it('should filter an object deeply', () => {
        const x = common.deepFilter(testObject, [
            'hello'
        ]);

        expect(x).toBe('world');
        expect(x.test).toBeUndefined();
    });
});