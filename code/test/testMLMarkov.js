var MarkovLib = require('../MarkovLib');
var assert = require('assert');


describe('Markov_Algorithm', function () {
    describe('Initialization', function () {
        describe('new note list ', function () {


            const markov = new MarkovLib.MultiMarkov();
            before(function () {

                var notelist = [];
                notelist.push("1,57,16,120");
                notelist.push("2,57,16,30");
                notelist.push("3,57,16,30");


                markov.nstep = notelist.length;
                markov.nseq = 1;
                markov.createMarkov(notelist);

            });


            it('has correct length given single sequence', function () {


                assert.equal(markov.getNewNoteListLength(), 3);

            });

        });


        describe('createMarkov ', function () {


            const markov = new MarkovLib.MultiMarkov();
            before(function () {

                var notelist = [];
                notelist.push("1,57,16,120");
                notelist.push("2,57,16,30");
                notelist.push("3,57,16,30");


                markov.nstep = notelist.length;
                markov.nseq = 1;
                markov.createMarkov(notelist);

            });


            it('puts values that are equal under the same key name', function () {


                assert.equal(markov.getMarkObjLength(), 2);

            });

        });
        describe('createMarkov ', function () {


            const markov = new MarkovLib.MultiMarkov();
            before(function () {

                var notelist = [];
                notelist.push("1,57,16,120");
                notelist.push("2,57,16,30");
                notelist.push("3,57,16,10");
                notelist.push("4,57,16,120");
                notelist.push("5,57,16,30");
                notelist.push("6,57,16,10");

                markov.nstep = notelist.length;
                markov.nseq = 2;
                markov.createMarkov(notelist);

            });


            it(' creates Markov object of the correct length given several simultaneous sequences  ', function () {


                assert.equal(markov.getMarkObjLength(), 3);

            });
        });

            describe('createMarkov ', function () {


                const markov = new MarkovLib.MultiMarkov();
                before(function () {

                    var notelist = [];
                    notelist.push("1,57,16,120");
                    notelist.push("2,57,16,30");
                    notelist.push("3,57,16,10");

                    markov.nstep = notelist.length;
                    markov.nseq = 1;
                    markov.createMarkov(notelist);

                });


                it(' creates Markov object where the last note is a key whose value is the first element ', function () {


                    assert.equal( markov.markObj[',57,16,10'], ',57,16,120');

                });

            });
        });

    describe('Markov Chain Generation', function () {
        describe('generate ', function () {
            const markov = new MarkovLib.MultiMarkov();
            before(function () {

                var notelist = [];
                notelist.push("1,57,16,120");
                notelist.push("2,57,16,30");
                notelist.push("3,57,16,10");

                markov.nstep = notelist.length;
                markov.nseq = 1;
                markov.markovLength= 64;
                markov.createMarkov(notelist);
                markov.generate();

            });


            it(' generates Markov chain according to ruleset ', function () {

                assert.equal( markov.result[0] , ',57,16,120');
                assert.equal( markov.result[1] , ',57,16,30');
                assert.equal( markov.result[2] , ',57,16,10');
                assert.equal( markov.result[3] , ',57,16,120');
            });






        });

        describe('generate ', function () {
            const markov = new MarkovLib.MultiMarkov();
            before(function () {

                var notelist = [];
                notelist.push("1,57,16,120");
                notelist.push("2,57,16,30");
                notelist.push("3,57,16,10");

                markov.nstep = notelist.length;
                markov.nseq = 1;
                markov.markovLength= 32;
                markov.createMarkov(notelist);
                markov.generate();

            });


            it(' generates Markov chain according to length defined by user ', function () {

                assert( markov.result.length , 32);

            });






        });

    });


});