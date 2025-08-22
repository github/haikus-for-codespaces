import Foundation
import Combine

class CalculatorViewModel: ObservableObject {
    @Published var displayText = "0"
    @Published var angleMode: CalculationEngine.AngleMode = .degrees {
        didSet {
            calculationEngine.angleMode = angleMode
        }
    }

    private var currentExpression = ""
    private let calculationEngine = CalculationEngine()
    private var hasResult = false
    private var isEnteringNumber = true

    func buttonPressed(label: String) {
        switch label {
        case "0"..."9":
            handleDigit(label)
        case ".":
            handleDecimalPoint()
        case "AC":
            reset()
        case "+/-":
            toggleSign()
        case "÷", "×", "−", "+":
            handleOperator(label)
        case "=":
            calculateResult()
        case "sin", "cos", "tan", "asin", "acos", "atan", "ln", "log10", "sqrt", "x^2", "x^3", "e^x", "10^x", "1/x", "%":
            handleUnaryOperation(label)
        case "!":
            handleFactorial()
        case "π":
            handleConstant(Double.pi)
        case "e":
            handleConstant(M_E)
        case "Deg", "Rad":
            toggleAngleMode()
        default:
            break
        }
    }

    private func handleDigit(_ digit: String) {
        if !isEnteringNumber || hasResult {
            displayText = "0"
            isEnteringNumber = true
            hasResult = false
        }

        if displayText == "0" {
            displayText = digit
        } else {
            displayText += digit
        }
    }

    private func handleDecimalPoint() {
        if isEnteringNumber && !displayText.contains(".") {
            displayText += "."
        }
    }

    private func reset() {
        displayText = "0"
        currentExpression = ""
        isEnteringNumber = true
        hasResult = false
    }

    private func toggleSign() {
        guard let number = Double(displayText) else { return }
        displayText = formatResult(-number)
    }

    private func handleOperator(_ op: String) {
        if isEnteringNumber {
            currentExpression += displayText
            isEnteringNumber = false
        }
        // Allow changing operator
        if !currentExpression.isEmpty && "+−×÷".contains(currentExpression.last!) {
            currentExpression.removeLast(3)
        }
        currentExpression += " \(op) "
    }

    private func calculateResult() {
        if isEnteringNumber {
            currentExpression += displayText
        }

        if let result = calculationEngine.evaluate(expression: currentExpression) {
            displayText = formatResult(result)
            currentExpression = ""
            hasResult = true
            isEnteringNumber = false
        } else {
            displayText = "Error"
            currentExpression = ""
            hasResult = true
            isEnteringNumber = false
        }
    }

    private func handleUnaryOperation(_ operation: String) {
        guard let operand = Double(displayText) else { return }
        if let result = calculationEngine.calculateUnaryOperation(operand: operand, operation: operation) {
            displayText = formatResult(result)
            isEnteringNumber = false
        } else {
            displayText = "Error"
        }
    }

    private func handleFactorial() {
        guard let operand = Double(displayText) else { return }
        if let result = calculationEngine.calculateFactorial(of: operand) {
            displayText = formatResult(result)
            isEnteringNumber = false
        } else {
            displayText = "Error"
        }
    }

    private func handleConstant(_ value: Double) {
        displayText = formatResult(value)
        isEnteringNumber = true
    }

    private func toggleAngleMode() {
        angleMode = (angleMode == .degrees) ? .radians : .degrees
    }

    private func formatResult(_ result: Double) -> String {
        if result.isInfinite || result.isNaN {
            return "Error"
        }
        if result.truncatingRemainder(dividingBy: 1) == 0 {
            return String(format: "%.0f", result)
        } else {
            let formatter = NumberFormatter()
            formatter.numberStyle = .decimal
            formatter.maximumFractionDigits = 8
            formatter.minimumFractionDigits = 0
            return formatter.string(from: NSNumber(value: result))?.trimmingCharacters(in: ["0"]) ?? "\(result)"
        }
    }
}
