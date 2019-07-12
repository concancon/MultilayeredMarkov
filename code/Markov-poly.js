autowatch = 1;
outlets = 12;

var MarkovLib= require('MarkovLib');


//this function encapsulates the stuff that is specific to Max and which cannot be tested
MarkovLib.MultiMarkov.prototype.outputResult = function() {

    outlet(0, multiMarkov.pitches[0]);
    outlet(1, multiMarkov.velocities[0]);
    outlet(2, multiMarkov.durations[0]);
    outlet(3, multiMarkov.pitches[1]);
    outlet(4, multiMarkov.velocities[1]);
    outlet(5, multiMarkov.durations[1]);
    outlet(6, multiMarkov.pitches[2]);
    outlet(7, multiMarkov.velocities[2]);
    outlet(8, multiMarkov.durations[2]);
    outlet(9, multiMarkov.pitches[3]);
    outlet(10, multiMarkov.velocities[3]);
    outlet(11, multiMarkov.durations[3]);

}

////////////create MultiMarkov instance
var multiMarkov= new MarkovLib.MultiMarkov();




var myval = [];
var seqtowrite;

function list() {
    var a = arrayfromargs(arguments);
    myval.push(a);
	post(myval.toString());
	post();

}


function clear() {
    multiMarkov.markObj = {};
    myval = [];
    multiMarkov.result = [];
    multiMarkov.pitches = [];
    multiMarkov.velocities = [];
    multiMarkov.durations = [];
    multiMarkov.newnotelist = [];

}


function setnseq(x) {

    multiMarkov.nseq = x;

}

function setnstep(x) {

    multiMarkov.nstep=x;
}


function callCreate() {

    multiMarkov.createMarkov(myval);


}

function callGenerateandOutput(){

    multiMarkov.generate();
    multiMarkov.outputResult();

}

function setMarkovLength(x){

    multiMarkov.markovLength= x;

}









