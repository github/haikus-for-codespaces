import SwiftUI

struct StandardCalculatorView: View {
    @StateObject private var viewModel = CalculatorViewModel()

    let buttonLayout: [[String]] = [
        ["AC", "+/-", "%", "÷"],
        ["7", "8", "9", "×"],
        ["4", "5", "6", "−"],
        ["1", "2", "3", "+"],
        ["0", ".", "="]
    ]

    var body: some View {
        ZStack {
            Color.black.ignoresSafeArea()
            VStack(spacing: 12) {
                Spacer()
                // Display
                HStack {
                    Spacer()
                    Text(viewModel.displayText)
                        .foregroundColor(.white)
                        .font(.system(size: 96, weight: .light))
                        .lineLimit(1)
                        .minimumScaleFactor(0.5)
                }
                .padding()

                // Buttons
                VStack(spacing: 12) {
                    ForEach(buttonLayout, id: \.self) { row in
                        HStack(spacing: 12) {
                            ForEach(row, id: \.self) { label in
                                if label == "0" {
                                    // TODO: Refactor to use GeometryReader for a more adaptive layout.
                                    // This hardcoded width for the zero button is functional but not robust.
                                    CalculatorButton(label: label, color: .number, width: (80 * 2) + 12) {
                                        viewModel.buttonPressed(label: label)
                                    }
                                } else {
                                    CalculatorButton(label: label, color: buttonColorType(for: label)) {
                                        viewModel.buttonPressed(label: label)
                                    }
                                }
                            }
                        }
                    }
                }
            }
            .padding(12)
        }
    }

    private func buttonColorType(for label: String) -> CalculatorButton.ButtonColor {
        switch label {
        case "AC", "+/-", "%":
            return .function
        case "÷", "×", "−", "+", "=":
            return .operation
        default:
            return .number
        }
    }
}
