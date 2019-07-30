autowatch = 1;
outlets = 12;

var MarkovLib= require('MarkovLib');



////////////create MultiMarkov instance
var multiMarkov= new MarkovLib.MultiMarkov();

function outputResult(multiMarkov){
	
    outlet(0, multiMarkov.getPitches(0));
    outlet(1, multiMarkov.getVelocities(0));
    outlet(2, multiMarkov.getDurations(0));
    outlet(3, multiMarkov.getPitches(1));
    outlet(4, multiMarkov.getVelocities(1));
    outlet(5, multiMarkov.getDurations(1));
    outlet(6, multiMarkov.getPitches(2));
    outlet(7, multiMarkov.getVelocities(2));
    outlet(8, multiMarkov.getDurations(2));
    outlet(9, multiMarkov.getPitches(3));
    outlet(10, multiMarkov.getVelocities(3));
    outlet(11, multiMarkov.getDurations(3));

}






var myval = [];
var seqtowrite;

function list() {
    var a = arrayfromargs(arguments);
    myval.push(a);


}


function clear() {

    myval = [];
    multiMarkov.clearAll();

}


function setnseq(x) {

    multiMarkov.setNSeq(x);

}

function setnstep(x) {

    multiMarkov.setNStep(x);
}


function callCreate() {

    multiMarkov.createMarkov(myval);


}

function callGenerateandOutput(){

    multiMarkov.generate();
    outputResult(multiMarkov);

}

function setMarkovLength(x){

    multiMarkov.markovLength= x;

}









