autowatch = 1;
outlets = 9;


var myval = [];
var markObj = {};
var currentGram = [];
var result = [];
var pitches = [];
var velocities = [];
var durations = [];
var newnotelist = [];
var nseq;
var nstep;
var seqtowrite;

function list() {
    var a = arrayfromargs(arguments);
    myval.push(a);
}


function clear() {
    markObj = {};
    myval = [];
    result = [];
    pitches = [];
    velocities = [];
    durations = [];
    newnotelist = [];

}


function setnseq(x) {

    nseq = x;

}

function setnstep(x) {

    nstep = x;
}


function callCreate() {

    createMarkov(myval);

}


function createMarkov(noteList) {


    post("notelist : " + noteList.toString());
    post();
    post("nseq: " + nseq);
    post();
    post("nstep " + nstep);
    post();


    for (var j = 0; j < noteList.length; j++) {
        //fold the total index by the number of sequences
        if (typeof (newnotelist[j % nstep]) === 'undefined') {


            newnotelist[j % nstep] = (noteList[j].slice(1, noteList[j].length));
            post("newnotelist" + [j % nstep] + ": " + newnotelist[j % nstep]);
            post();
        } else {


            newnotelist[j % nstep] = noteList[j].slice(1, noteList[j].length).concat(newnotelist[j % nstep]);

        }
    }


    for (var key in newnotelist) {
        if (newnotelist.hasOwnProperty(key)) {
            post("key nnl: " + key + " " + "value: " + newnotelist[key] + " ");
            post();
        }
    }
    for (var i = 0; i < newnotelist.length; i++) {


        if (!markObj[newnotelist[i].toString()]) {
            markObj[newnotelist[i].toString()] = [];

        }
        //push first element after last to create a loop
        if (i === newnotelist.length - 1) {

            markObj[newnotelist[i].toString()].push(newnotelist[0]);
        } else {
            markObj[newnotelist[i].toString()].push(newnotelist[i + 1]);

        }

    }

}


function generate() {

    for (var u = 0; u < nseq; u++) {


        //first add another dimension if we are dealing with nseq > 1
        pitches[u] = new Array(nstep);
        velocities[u] = new Array(nstep);
        durations[u] = new Array(nstep);


        for (var z = 0; z < 64; z++) {

            pitches[u][z] = 0;
            velocities[u][z] = 0;
            durations[u][z] = 0;
        }
    }

    currentGram = newnotelist[0];
    result.push(currentGram);


    for (var i = 0; i < 64; i++) {
        //get all possible succesors given an index
        var possibilities = markObj[currentGram];
        //pick a value from all possible values and add it to the result string
        var next = possibilities[Math.floor(Math.random() * possibilities.length)];


        result.push(next);
        currentGram = result[result.length - 1];


    }

    for (var u = 0; u < nseq; u ++) {
      for(var i= 0; i< 64; i++) {

           pitches[u][i] = result[i][(u* 3)];
           velocities[u][i] = result[i][(u*3 + 1)];
           durations[u][i] = result[i][(u*3 + 2)];
       }
   }




pitches.toString().replace(',' , ' ');
velocities.toString().replace(',' , ' ');
durations.toString().replace(',' , ' ');

outlet(0, pitches[0]);
outlet(1, velocities[0]);
outlet(2, durations[0]);
outlet(3, pitches[1]);
outlet(4, velocities[1]);
outlet(5, durations[1]);
outlet(6, pitches[2]);
outlet(7, velocities[2]);
outlet(8, durations[2]);





}
















