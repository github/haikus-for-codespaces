import Foundation

// In a real project, this would be an XCTestCase subclass.
// import XCTest
// @testable import MacCalculator

// This file serves as documentation for the tests that should be run
// to ensure the CalculationEngine is working correctly.

class CalculationEngineTests {

    let engine = CalculationEngine()

    // A helper to run all tests and print the status.
    func runAll() {
        print("Running CalculationEngineTests...")
        testBasicArithmetic()
        testOperatorPrecedence()
        testUnaryOperations()
        testFactorial()
        testTrigonometryDegrees()
        testTrigonometryRadians()
        testInverseTrigonometry()
        print("CalculationEngineTests completed.")
    }

    private func assertEqual<T: Equatable>(_ received: T?, _ expected: T, _ message: String) {
        if let received = received, received == expected {
            print("  ✅ PASS: \(message)")
        } else {
            print("  ❌ FAIL: \(message) (Expected: \(expected), Received: \(String(describing: received)))")
        }
    }

    private func assertNil<T>(_ received: T?, _ message: String) {
        if received == nil {
            print("  ✅ PASS: \(message)")
        } else {
            print("  ❌ FAIL: \(message) (Expected: nil, Received: \(String(describing: received)))")
        }
    }

    private func assertApproxEqual(_ received: Double?, _ expected: Double, _ message: String) {
        let tolerance = 0.00001
        if let received = received, abs(received - expected) < tolerance {
            print("  ✅ PASS: \(message)")
        } else {
            print("  ❌ FAIL: \(message) (Expected: \(expected), Received: \(String(describing: received)))")
        }
    }

    func testBasicArithmetic() {
        assertEqual(engine.evaluate(expression: "2 + 3"), 5.0, "Addition")
        assertEqual(engine.evaluate(expression: "10 - 5.5"), 4.5, "Subtraction")
        assertEqual(engine.evaluate(expression: "4 * 8"), 32.0, "Multiplication")
        assertEqual(engine.evaluate(expression: "20 / 4"), 5.0, "Division")
    }

    func testOperatorPrecedence() {
        assertEqual(engine.evaluate(expression: "2 + 3 * 4"), 14.0, "Precedence: 2 + 3 * 4")
        assertEqual(engine.evaluate(expression: "(2 + 3) * 4"), 20.0, "Precedence: (2 + 3) * 4")
    }

    func testUnaryOperations() {
        assertEqual(engine.calculateUnaryOperation(operand: 5, operation: "x^2"), 25.0, "Square")
        assertEqual(engine.calculateUnaryOperation(operand: 4, operation: "1/x"), 0.25, "Reciprocal")
        assertEqual(engine.calculateUnaryOperation(operand: 16, operation: "sqrt"), 4.0, "Square Root")
    }

    func testFactorial() {
        assertEqual(engine.calculateFactorial(of: 5), 120.0, "Factorial of 5")
        assertEqual(engine.calculateFactorial(of: 0), 1.0, "Factorial of 0")
        assertNil(engine.calculateFactorial(of: -1), "Factorial of negative number")
        assertNil(engine.calculateFactorial(of: 21), "Factorial of number > 20")
    }

    func testTrigonometryDegrees() {
        engine.angleMode = .degrees
        assertApproxEqual(engine.calculateUnaryOperation(operand: 30, operation: "sin"), 0.5, "sin(30 deg)")
        assertApproxEqual(engine.calculateUnaryOperation(operand: 60, operation: "cos"), 0.5, "cos(60 deg)")
        assertApproxEqual(engine.calculateUnaryOperation(operand: 45, operation: "tan"), 1.0, "tan(45 deg)")
    }

    func testTrigonometryRadians() {
        engine.angleMode = .radians
        assertApproxEqual(engine.calculateUnaryOperation(operand: .pi / 6, operation: "sin"), 0.5, "sin(pi/6 rad)")
        assertApproxEqual(engine.calculateUnaryOperation(operand: .pi / 3, operation: "cos"), 0.5, "cos(pi/3 rad)")
    }

    func testInverseTrigonometry() {
        engine.angleMode = .degrees
        assertApproxEqual(engine.calculateUnaryOperation(operand: 0.5, operation: "asin"), 30.0, "asin(0.5) to degrees")

        engine.angleMode = .radians
        assertApproxEqual(engine.calculateUnaryOperation(operand: 0.5, operation: "asin"), .pi / 6, "asin(0.5) to radians")
    }
}
