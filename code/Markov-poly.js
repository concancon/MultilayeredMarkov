autowatch = 1;
outlets = 12;

var MarkovLib = require('MarkovLib');


////////////create MultiMarkov instance
var multiMarkov = new MarkovLib.MultiMarkov();

/**
 * outputs generated Markov chain
 * @function
 * @name outputResult
 *
 **/
function outputResult(multiMarkov) {

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

/**
 * holds incoming note data from UI object
 @name myval
 @type string
 *
 **/
var myval = [];


/**
 * function to pass data from UI object to myval array
 * @function
 * @name list
 *
 **/
function list() {
    var a = arrayfromargs(arguments);
    myval.push(a);


}

/**
 * clears the markov chain and internal storage for UI values
 * @function
 * @name clear
 *
 **/
function clear() {

    myval = [];
    multiMarkov.clearAll();

}

/**
 * setter for number of sequences
 * @function
 * @name setnseq
 *
 **/
function setnseq(x) {

    multiMarkov.setNSeq(x);

}

/**
 * setter for number of steps in input sequence
 * @function
 * @name setnstep
 *
 **/
function setnstep(x) {

    multiMarkov.setNStep(x);
}

/**
 * wrapper function for multiMarkov.createMarkov();
 * @function
 * @name callCreate
 *
 **/
function callCreate() {

    multiMarkov.createMarkov(myval);


}

/**
 * wrapper function for  multiMarkov.generate() and  outputResult()
 * @function
 * @name callGenerateandOutput()
 *
 **/
function callGenerateandOutput() {

    multiMarkov.generate();
    outputResult(multiMarkov);

}

/**
 * setter for desired number of steps in Markov chain
 * @function
 * @name setMarkovLength
 * @param {number} x the desired length
 **/
function setMarkovLength(x) {

    multiMarkov.markovLength = x;

}









