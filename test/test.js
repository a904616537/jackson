const assert = require('assert');

describe('app', () => {
    it('mocha', done => {
        return new Promise(resolve => {
            assert.ok(true);
            resolve();
        })
        .then(done);
    });
})
    

  

