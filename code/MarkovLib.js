/**
* a constructor for a multi layered Markov Chain
* @constructor
* @name MultiMarkov
*
**/
function MultiMarkov() {


    /**
     * Object used to build a mMrkov chain
     @name markObj
     @type object
     *
     **/
    this.markObj = {};
    /**
     * entry in Markov Object used to find possible successors
     @name currentGram
     @type string
     *
     **/
    this.currentGram = [];
    /**
     * result after applying markov chain
     @name result
     @type string
     *
     **/
    this.result = [];
    /**
     * helper list used for formatting input
     @name newnotelist
     @type string
     *
     **/
    this.newnotelist = [];
    /**
     * number of steps in input sequence
     @name nstep
     @type number
     *
     **/
    this.nstep = 0;
    /**
     * number of sequences in input
     @name nseq
     @type number
     *
     **/
    this.nseq = 0;
    /**
     * desired length for generated markov chain
     @name markovLength
     @type number
     *
     **/
    this.markovLength = 0;
    /**
     * holds pitch data
     @name pitches
     @type string
     *
     **/
    this.pitches = [];
    /**
     * holds velocity data
     @name velocities
     @type string
     *
     **/
    this.velocities = [];
    /**
     * holds duration data
     @name durations
     @type string 
     *
     **/
    this.durations = [];


    /**
     * parses input from live.step object and creates a markov object out of it.
     * every unique value is a key whose values are its possible succesors
     * code adapted from Dan Schiffman's tutorial: github.com/codepadawan93/Text-Generator
     * @function
     * @name createMarkov
     * @param {array} noteList a list of notes to use as input for the Markov Chain
     **/
    this.createMarkov = function (noteList) {


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


    /**
     * creates a Markov chain according to the order of notes input by the user and of length specified by markovLength variable.
     * @function
     * @name generate
     *
     **/
    this.generate = function () {

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
    /**
     * a getter function for the length of newnotelist
     * @function
     * @name getNewNoteListLength
     * @returns {number} the length of the new note list.
     **/
    this.getNewNoteListLength = function () {

        return this.newnotelist.length;
    };
    /**
     * a getter function for the length or number of entries in markovObj
     * @function
     * @name getMarkObjLength
     * @returns {number} the length of the markov Object.
     **/
    this.getMarkObjLength = function () {

        return Object.keys(this.markObj).length;
    };
    /**
     * a getter function for an entry in the pitches array
     * @function
     * @name getPitches
     * @param {number} index of desired entry in pitches
     * @returns {string} desired entry in pitches
     **/
    this.getPitches = function (index) {
        return this.pitches[index];
    };
    /**
     * a getter function for an entry in the velocity array
     * @function
     * @name getVelocities
     * @param {number} index of desired entry in velocities
     * @returns {string} desired entry in velocities
     **/
    this.getVelocities = function (index) {

        return this.velocities[index];

    };
    /**
     * a getter function for an entry in the duration array
     * @function
     * @name getDurations
     * @param {number} index of desired entry in durations
     * @returns {string} desired entry in durations
     **/
    this.getDurations = function (index) {

        return this.durations[index];
    };
    /**
     * a setter function for the number of sequences to be fed into Markov Chain
     * @function
     * @name setNSeq
     * @param {number} x number of sequences to be fed into Markov Chain
     **/
    this.setNSeq = function (x) {

        this.nseq = x;
    };
    /**
     * a setter function for the number of steps to be fed into Markov Chain
     * @function
     * @name setNStep
     * @param {number} x number of steps to be fed into Markov Chain
     **/
    this.setNStep = function (x) {
        this.nstep = x;
    };

    /**
     * clears all markov chains contents and properties
     * @function
     * @name clearAll
     *
     **/
    this.clearAll = function () {

        this.markObj = {};
        this.result = [];
        this.pitches = [];
        this.velocities = [];
        this.durations = [];
        this.newnotelist = [];
    };


}

exports.MultiMarkov = MultiMarkov;