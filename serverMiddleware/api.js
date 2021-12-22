const express = require('express')
const etherflow = require('etherflow')

const app = express()

app.get('/:method(crawler|http|sdk)/getBlockNumber', (req, res) => {
    etherflow[req.params.method].getBlockNumber().then((blockNumber) => {
        res.json(blockNumber)
    })
})

app.get('/:method(crawler|http|sdk)/getTxsStatus/:txsHash', (req, res) => {
    etherflow[req.params.method]
        .getTxsStatus(req.params.txsHash)
        .then((result) => {
            res.json({
                method: req.params.method,
                ...result,
            })
        })
})

module.exports = app
