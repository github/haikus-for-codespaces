import Foundation

class DateCalculatorViewModel: ObservableObject {
    enum Mode: String, CaseIterable, Identifiable {
        case difference = "Difference Between Dates"
        case addSubtract = "Add / Subtract"
        var id: String { self.rawValue }
    }

    @Published var mode: Mode = .difference

    // Properties for Difference mode
    @Published var fromDate = Date() { didSet { calculateDifference() } }
    @Published var toDate = Date() { didSet { calculateDifference() } }
    @Published var differenceResult = ""

    // Properties for Add/Subtract mode
    @Published var startDate = Date() { didSet { calculateAddSubtract() } }
    @Published var yearsToAdd: Int = 0 { didSet { calculateAddSubtract() } }
    @Published var monthsToAdd: Int = 0 { didSet { calculateAddSubtract() } }
    @Published var daysToAdd: Int = 0 { didSet { calculateAddSubtract() } }
    @Published var addSubtractResult = ""
    @Published var operation: Operation = .add { didSet { calculateAddSubtract() } }

    enum Operation {
        case add, subtract
    }

    init() {
        calculateDifference()
        calculateAddSubtract()
    }

    func calculateDifference() {
        let components = Calendar.current.dateComponents([.year, .month, .day], from: fromDate, to: toDate)

        var parts: [String] = []
        if let years = components.year, years != 0 {
            parts.append("\(abs(years)) year" + (abs(years) == 1 ? "" : "s"))
        }
        if let months = components.month, months != 0 {
            parts.append("\(abs(months)) month" + (abs(months) == 1 ? "" : "s"))
        }
        if let days = components.day, days != 0 {
            parts.append("\(abs(days)) day" + (abs(days) == 1 ? "" : "s"))
        }

        if parts.isEmpty {
            differenceResult = "Same dates"
        } else {
            differenceResult = parts.joined(separator: ", ")
        }
    }

    func calculateAddSubtract() {
        let sign = operation == .add ? 1 : -1
        var dateComponent = DateComponents()
        dateComponent.year = yearsToAdd * sign
        dateComponent.month = monthsToAdd * sign
        dateComponent.day = daysToAdd * sign

        if let futureDate = Calendar.current.date(byAdding: dateComponent, to: startDate) {
            let formatter = DateFormatter()
            formatter.dateStyle = .full
            addSubtractResult = formatter.string(from: futureDate)
        } else {
            addSubtractResult = "Calculation Error"
        }
    }
}
