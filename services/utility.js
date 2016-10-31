"use strict";

module.exports = {
    nameToUrlParam : NameToUrlParam,
    checkIfIntro: CheckIfIntro
}

function NameToUrlParam(name)
{
    return name.toLowerCase().split(' ').join('-');
}

function CheckIfIntroLink(title)
{
    return title.toLowerCase().contains('introduction');
}