const assert = require('assert');
const lib = require('..');

function test(input, expected, spec = "Test") {
    let got = lib.greet(input.name);
    try{
        assert.equal(got, expected);
        console.log(`\u001B[32mPASS -\u001B[39m ${spec}: got ${JSON.stringify(expected)} as expected`);
    }catch(err){
        console.log(`\x1b[31mFAIL - \u001B[39m ${spec}: got ${got} instead of ${JSON.stringify(expected)}`);
    }
}

module.exports = function buildTest(){
	console.log('\n Test lib.greet() from greet.spec.js:\n')
	test({}, "Hello World!", "It should return Hello World!");
	test({ name : "Rudy" }, "Hello Rudy!", "It should return Hello Rudy!");
	test({ name : "Francia" }, "Hello Francia!", "It should return Hello Francia!");
};