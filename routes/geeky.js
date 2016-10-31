"use strict";

var express = require('express');
var router = express.Router();
const geekyParse = require("../services/geekyParse");
const config = require("../config");

router.get("/data-structures", (req, res) => {
    geekyParse.getAllDataStructures((ds)=> { res.json(ds) });
});

router.get('/data-structures/:ds', (req, res)=> {
    let ds = req.params.ds;
    geekyParse.getDataStructureFullDetail(ds, (topics) => {
        if(topics.length == 0) return res.status(204).json({ message: "No result found" });

        res.json(ds);
    });
});

router.get('/data-structures/:ds/info', (req, res) => {
    let ds = req.params.ds;

    geekyParse.getDataStructureInfo(ds, (info) => {
        if(info == "") return res.status(204).json({ message: "No result found" });

        res.send(info); 
    });
});

module.exports = router;