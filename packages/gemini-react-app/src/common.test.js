const common = require('./common');
const _ = require('lodash');
const us = require('microseconds');

describe('Deep Filter and Find', () => {
    let defaultObject;
    let testObject;
    let startTime;
    let endTime;
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
        startTime = us.now();
    });
    afterEach(() => {
        endTime = us.now();
        console.log(`Execution time: ${((endTime - startTime) / 1000000).toFixed(8)} sec.`);
    })
    it ('should have cloned properties', () => {
        Object.keys(defaultObject).forEach((k) => expect(testObject[k]).toStrictEqual(defaultObject[k]));
    });
    it('should filter an object deeply', () => {
        const x = common.deepFilterAssoc(testObject, [
            'hello'
        ]);

        expect(x).toBe('world');
        expect(x.test).toBeUndefined();
    });
    it('should obey specific constraints for constructing a filtered object', () => {
        const y = common.deepFilterAssoc(testObject, [
            'test'
        ]);

        expect(y).toStrictEqual({
            hey: 'there',
            exclude: 'blah'
        });
    });
    it('should resolve a deep value', () => {
        const z = common.deepFilterAssoc(testObject, [
            'test.hey'
        ]);

        expect(z).toBe('there');
    });
});