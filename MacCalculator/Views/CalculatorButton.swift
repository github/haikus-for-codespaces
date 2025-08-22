import SwiftUI

struct CalculatorButton: View {

    enum ButtonColor {
        case number
        case operation
        case function
        case scientificFunction

        var backgroundColor: Color {
            switch self {
            case .number: return Color(white: 0.2)
            case .operation: return .orange
            case .function: return Color(white: 0.65)
            case .scientificFunction: return Color(white: 0.35)
            }
        }

        var foregroundColor: Color {
            switch self {
            case .function: return .black
            default: return .white
            }
        }
    }

    let label: String
    let color: ButtonColor
    var width: CGFloat = 80
    let action: () -> Void

    var body: some View {
        Button(action: action) {
            Text(label)
                .font(.system(size: 32).weight(.medium))
                .frame(maxWidth: .infinity, maxHeight: .infinity)
                .frame(width: width, height: 80)
                .background(color.backgroundColor)
                .foregroundColor(color.foregroundColor)
                .cornerRadius(40)
        }
    }
}
