import Foundation

class CalculationEngine {

    enum AngleMode {
        case degrees, radians
    }
    var angleMode: AngleMode = .degrees

    private let constants: [String: NSNumber] = [
        "pi": NSNumber(value: Double.pi),
        "e": NSNumber(value: M_E)
    ]

    private var context: NSMutableDictionary {
        let context = NSMutableDictionary()
        context.addEntries(from: constants)
        return context
    }

    func evaluate(expression: String) -> Double? {
        let sanitizedExpression = expression
            .replacingOccurrences(of: "×", with: "*")
            .replacingOccurrences(of: "÷", with: "/")

        let expressionObject = NSExpression(format: sanitizedExpression)
        if let result = expressionObject.expressionValue(with: nil, context: self.context) as? NSNumber {
            return result.doubleValue
        }

        return nil
    }

    func calculateUnaryOperation(operand: Double, operation: String) -> Double? {
        switch operation {
        case "x^2":
            return pow(operand, 2)
        case "x^3":
            return pow(operand, 3)
        case "e^x":
            return exp(operand)
        case "10^x":
            return pow(10, operand)
        case "1/x":
            return 1 / operand
        case "%":
            return operand / 100.0
        case "sin", "cos", "tan":
            let operandInRadians = angleMode == .degrees ? operand * .pi / 180 : operand
            switch operation {
            case "sin": return sin(operandInRadians)
            case "cos": return cos(operandInRadians)
            case "tan": return tan(operandInRadians)
            default: return nil
            }
        case "asin", "acos", "atan":
             // Inverse trig functions return radians
            let resultInRadians: Double? = {
                switch operation {
                case "asin": return asin(operand)
                case "acos": return acos(operand)
                case "atan": return atan(operand)
                default: return nil
                }
            }()
            guard let result = resultInRadians else { return nil }
            return angleMode == .degrees ? result * 180 / .pi : result
        case "ln":
            return log(operand)
        case "log10":
            return log10(operand)
        case "sqrt":
            return sqrt(operand)
        default:
            return nil
        }
    }

    func calculateFactorial(of number: Double) -> Double? {
        guard number >= 0, number.truncatingRemainder(dividingBy: 1) == 0, number <= 20 else { return nil } // Factorial grows fast
        if number == 0 { return 1 }
        var result: Double = 1
        for i in 1...Int(number) {
            result *= Double(i)
        }
        return result
    }
}
