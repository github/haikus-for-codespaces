import SwiftUI

struct ScientificCalculatorView: View {
    @StateObject private var viewModel = CalculatorViewModel()

    // This layout reflects the functions that are actually implemented in the ViewModel.
    let buttonLayout: [[String]] = [
        ["x^2", "x^3", "e^x", "AC", "+/-", "%", "÷"],
        ["sin", "cos", "tan", "7", "8", "9", "×"],
        ["asin", "acos", "atan", "4", "5", "6", "−"],
        ["ln", "log10", "sqrt", "1", "2", "3", "+"],
        ["!", "π", "e", "Rad", "0", ".", "="]
    ]

    var body: some View {
        ZStack {
            Color.black.ignoresSafeArea()
            VStack(spacing: 8) {
                Spacer()
                // Display
                HStack {
                    Text(viewModel.angleMode == .degrees ? "Deg" : "Rad")
                        .font(.subheadline)
                        .foregroundColor(.white)
                        .padding(.horizontal)
                    Spacer()
                    Text(viewModel.displayText)
                        .foregroundColor(.white)
                        .font(.system(size: 80, weight: .light))
                        .lineLimit(1)
                        .minimumScaleFactor(0.4)
                }
                .padding(.horizontal)

                // Buttons
                VStack(spacing: 8) {
                    ForEach(buttonLayout, id: \.self) { row in
                        HStack(spacing: 8) {
                            ForEach(row, id: \.self) { label in
                                CalculatorButton(
                                    label: getDisplayLabel(for: label),
                                    color: buttonColorType(for: label)
                                ) {
                                    viewModel.buttonPressed(label: label)
                                }
                            }
                        }
                    }
                }
            }
            .padding(8)
        }
    }

    private func getDisplayLabel(for label: String) -> String {
        if label == "Rad" {
            return viewModel.angleMode == .degrees ? "Rad" : "Deg"
        }
        return label
    }

    private func buttonColorType(for label: String) -> CalculatorButton.ButtonColor {
        if "0123456789.".contains(label) {
            return .number
        }
        if ["÷", "×", "−", "+", "="].contains(label) {
            return .operation
        }
        if ["AC", "+/-", "%"].contains(label) {
            return .function
        }
        // All other buttons in the new layout are scientific functions.
        return .scientificFunction
    }
}
