function MultiMarkov() {




    this.markObj = {};
    this.currentGram = [];
    this.result = [];
    this.newnotelist=[];
    this.nstep = 0 ;
    this.nseq = 0;
    this.markovLength= 0;
    this.pitches = [];
    this.velocities = [];
    this.durations = [];



    //parses input from live.step object and creates a markov object out of it.
    //every unique value is a key whose values are its possible succesors
    //code adapted from Dan Schiffman's tutorial: github.com/codepadawan93/Text-Generator
    this.createMarkov = function(noteList) {




        for (var j = 0; j < noteList.length; j++) {
            //fold the total index by the number of sequences

            if (typeof (this.newnotelist[j % this.nstep]) === 'undefined') {

                this.newnotelist[j % this.nstep] = (noteList[j].slice(1, noteList[j].length));
               
            } else {


                this.newnotelist[j % this.nstep] = noteList[j].slice(1, noteList[j].length).concat(this.newnotelist[j % this.nstep]);

            }
        }


        for (var key in this.newnotelist) {
            if (this.newnotelist.hasOwnProperty(key)) {
            }
        }
        for (var i = 0; i < this.newnotelist.length; i++) {


            if (!this.markObj[this.newnotelist[i].toString()]) {
                this.markObj[this.newnotelist[i].toString()] = [];

            }
            //push first element after last to create a loop
            if (i === this.newnotelist.length - 1) {

                this.markObj[this.newnotelist[i].toString()].push(this.newnotelist[0]);

            } else {
                this.markObj[this.newnotelist[i].toString()].push(this.newnotelist[i + 1]);

            }

        }







    };



    //creates a Markov chain according to the order of notes input by the user and of length specified by markovLength variable.
     this.generate= function() {

        for (var u = 0; u < this.nseq; u++) {


            //first add another dimension if we are dealing with this.nseq > 1

            this.pitches[u] = new Array(this.nstep);
            this.velocities[u] = new Array(this.nstep);
            this.durations[u] = new Array(this.nstep);


            for (var z = 0; z < 64; z++) {

                this.pitches[u][z] = 0;
                this.velocities[u][z] = 0;
                this.durations[u][z] = 0;
            }
        }

        this.currentGram = this.newnotelist[0];
        this.result.push(this.currentGram);


        for (var i = 0; i < this.markovLength; i++) {
            //get all possible succesors given an index
            var possibilities = this.markObj[this.currentGram];
            //pick a value from all possible values and add it to the this.result string
            var next = possibilities[Math.floor(Math.random() * possibilities.length)];


            this.result.push(next);
            this.currentGram = this.result[this.result.length - 1];


        }

        for (var u = 0; u < this.nseq; u++) {
            for (var i = 0; i < this.markovLength; i++) {

                this.pitches[u][i] = this.result[i][(u * 3)];
                this.velocities[u][i] = this.result[i][(u * 3 + 1)];
                this.durations[u][i] = this.result[i][(u * 3 + 2)];
            }
        }


        this.pitches.toString().replace(',', ' ');
        this.velocities.toString().replace(',', ' ');
        this.durations.toString().replace(',', ' ');




    };

    this.getNewNoteListLength= function () {

        return this.newnotelist.length;
    };

    this.getMarkObjLength= function () {

        return Object.keys(this.markObj).length;
    };

    this.getPitches = function (index) {
        return this.pitches[index];
    };

    this.getVelocities = function(index) {

        return this.velocities[index];

    };
    this.getDurations = function(index){

        return this.durations[index];
    };

    this.setNSeq= function (x){

        this.nseq= x;
    };
    this.setNStep= function (x) {
        this.nstep = x;
    }


    this.clearAll = function () {

        this.markObj = {};
        this.result = [];
        this.pitches = [];
        this.velocities = [];
        this.durations = [];
        this.newnotelist = [];
    };





}
exports.MultiMarkov= MultiMarkov;