class Calculator {
    constructor(prevOperandText, curOperandText) {
        this.prevOperandText = prevOperandText
        this.curOperandText = curOperandText
        this.clear()
    }

    clear() {
        this.curOperand = ""
        this.prevOperand = ""
        this.operation = undefined
    }

    delete() {
        this.curOperand = this.curOperand.toString().slice(0, -1)
    }

    appendNumber(number) {
        if (number === '.' && this.curOperand.includes('.')) return
        this.curOperand = this.curOperand.toString() + number.toString()
    }

    chooseOperation(operation) {
        if (this.curOperand === '') return
        if (this.prevOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.prevOperand = this.curOperand
        this.curOperand = ""
    }

    compute() {
        let computation
        const prev = parseFloat(this.prevOperand)
        const current = parseFloat(this.curOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '/':
                computation = prev / current
                break
            case '*':
                computation = prev * current
                break
            default:
                return
        }
        this.curOperand = computation
        this.operation = undefined
        this.prevOperand = ''
    }

    getDisplay(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay

        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            })
        }
        if (decimalDigits != null) {
            return String(`${integerDisplay}.${String(decimalDigits).slice(0, 6)}`)
        } else {
            return integerDisplay
        }
    }

    updateDisplay() {
        this.curOperandText.innerText = this.getDisplay(this.curOperand)
        if (this.operation != null) {
            this.prevOperandText.innerText = `${this.getDisplay(this.prevOperand)} ${this.operation}`
        } else {
            this.prevOperandText.innerText = ''
        }
    }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const prevOperandText = document.querySelector('[data-prev-operand]')
const curOperandText = document.querySelector('[data-cur-operand]')

const calc = new Calculator(prevOperandText, curOperandText)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calc.appendNumber(button.innerText)
        calc.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calc.chooseOperation(button.innerText)
        calc.updateDisplay()
    })
})

equalsButton.addEventListener('click', () => {
    calc.compute()
    calc.updateDisplay()
})

allClearButton.addEventListener('click', () => {
    calc.clear()
    calc.updateDisplay()
})

deleteButton.addEventListener('click', () => {
    calc.delete()
    calc.updateDisplay()
})
