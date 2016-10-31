"use strict";

const request = require("request");
const cheerio = require("cheerio");
const config = require("../config");
const fs = require('fs');
const path = require('path');
const utility = require('./utility');

module.exports = {
    getAllDataStructures: GetAllDataStructures,
    getDataStructureFullDetail: GetDataStructureFullDetail,
    getDataStructureInfo: GetDataStructureInfo
}

// Return all the sub topics and the corresponding links
function GetDataStructureFullDetail(dataStructure, cb)
{
    // var p = path.join(__dirname, '../server/ll.html');
    // fs.readFile(p, (err, data)=> {
    //     let subTopics = HandleSingleDataStructureResponse(err, {}, data);
    //     cb(subTopics);
    // });
    let param = utility.nameToUrlParam(dataStructure);
    request(config.geekyDataStructuresUrl+'/'+param, HandleSingleDataStructureResponse)
}

// Return just the introduction to the data structure
function GetDataStructureInfo(dataStructure, cb)
{
    // var p = path.join(__dirname, '../server/ds.html');
    // fs.readFile(p, (err, data)=> {
    //     var subTopics = HandleSingleDataStructureResponse(err, {}, data);
    //     cb(subTopics);
    // }); 

}

function GetAllDataStructures(cb)
{
    var p = path.join(__dirname, '../server/ds.html');
    fs.readFile(p, (err, data)=> {
        var ds = HandleDataStructureResponse(err,{},data);
        cb(ds);
    });

    // request(config.geekyDataStructuresUrl, HandleDataStructureResponse);
}

function HandleDataStructureResponse(err, res, body)
{
    if(err) return console.log(err);
    let $ = cheerio.load(body);
    
    let dsArray = [];

    $('.entry-content').find('ol').first().find('li').each((i, el) => {
       let name = $(el).children().first().text();
       let link = $(el).children().first().attr('href');

       dsArray.push({
           name: name,
           link: link
       });
    });

    return dsArray;
}


function HandleSingleDataStructureResponse(err, res, body)
{
    let subTopics = [];

    let $ = cheerio.load(body);
    $('.entry-content').find('p').each((i, el) => {
        console.log(i);
        if($(el).find('strong').length > 0) {
            let entries = [];
            let topic = $(el).find('strong').first().text();
            console.log(topic);
            $(el).next().children().each((i, li) => {
                let anchor =  $(li).children().first();
                
                let name = anchor.text();
                let link = anchor.attr('href');
                let intro  = false; //If the link contains the introduction for the data structure

                if(IsIntroLink(name)) intro = true; 

                entries.push({ title: name, link: link, intro: intro });
            });

            subTopics.push({ topic: topic, entries: entries });
        }
    });

    return subTopics;
}

function FetchDataStructureInfo(err, res, body)
{

}