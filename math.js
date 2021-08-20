const Decimal = require('decimal.js')

module.exports = function math(s) {

    const dictOfСonformity = {
        '+': 'plus',
        '-': 'minus',
        '*': 'times',
        '/': 'dividedBy',
    }
    const normalizedStr = s.replaceAll(',', '.').replaceAll(' ', '')

    const regexpForDigits = /((?<!\d)-)?[\d\.]+/g
    const regexpForMathOperations = /(?<=\d)[+*\/-]/g

    const arrayOfDigits = normalizedStr.match(regexpForDigits)
    const arrayOfMathOperations = normalizedStr.match(regexpForMathOperations)

    return calculate(arrayOfDigits, arrayOfMathOperations, dictOfСonformity)
}

function calculate(digits, mathOperations, dictionary) {
    while (mathOperations.length) {
        let operatorIndex = mathOperations.findIndex(op => '/*'.includes(op))
        if (operatorIndex == -1) operatorIndex = 0
        const operator = mathOperations[operatorIndex]
        mathOperations.splice(operatorIndex, 1)
        let res = new Decimal(digits[operatorIndex])[dictionary[operator]](new Decimal(digits[operatorIndex + 1]))
        digits.splice(operatorIndex, 2, res)
    }
    return digits[0].toString()
}
