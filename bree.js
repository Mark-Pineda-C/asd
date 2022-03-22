'use strict'
const Bree = require('bree');
const bree = new Bree({
    jobs: [
        {
            name: 'worker-1',
            //interval: '1m',
            interval: 'every 2 hours',
            closeWorkerAfterMs: 10000
        }
    ]
});

module.exports = bree;