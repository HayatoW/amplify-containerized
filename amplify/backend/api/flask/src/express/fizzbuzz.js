const fizzBuzz = (randomNumber) => {
    var fizzOrBuzz = '';
    
    if (randomNumber % 15 === 0) {
        fizzOrBuzz = 'FizzBuzz';
    }
    else if (randomNumber % 3 === 0) {
        fizzOrBuzz = 'Fizz'
    }
    else if (randomNumber % 5 === 0) {
        fizzOrBuzz = 'Buzz'
    }
    else {
        fizzOrBuzz = randomNumber
    }

    return fizzOrBuzz;
}

module.exports = { fizzBuzz };
