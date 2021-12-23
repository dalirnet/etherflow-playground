const express = require('express')
const etherflow = require('etherflow')

const app = express()

app.get('/:method(crawler|http|sdk)/getBlockNumber', (req, res) => {
    etherflow[req.params.method].getBlockNumber().then((blockNumber) => {
        res.json(blockNumber)
    })
})

app.get('/:method(crawler|http|sdk)/getTxnStatus/:txnHash', (req, res) => {
    etherflow[req.params.method]
        .getTxnStatus(req.params.txnHash)
        .then((result) => {
            res.json({
                method: req.params.method,
                ...result,
            })
        })
})

module.exports = app
