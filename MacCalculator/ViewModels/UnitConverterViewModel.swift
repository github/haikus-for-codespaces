import Foundation
import Combine

class UnitConverterViewModel: ObservableObject {
    // The category of units to convert (e.g., Length, Weight)
    @Published var selectedCategory: UnitConverter.Category = .length {
        didSet {
            // When the category changes, update the list of available units.
            updateAvailableUnits()
        }
    }

    // The list of units available for the selected category.
    @Published var availableUnits: [Dimension] = []

    // The unit to convert from.
    @Published var fromUnit: Dimension = UnitLength.meters {
        didSet { convert() }
    }

    // The unit to convert to.
    @Published var toUnit: Dimension = UnitLength.feet {
        didSet { convert() }
    }

    // The value entered by the user.
    @Published var inputValue: String = "1" {
        didSet { convert() }
    }

    // The calculated result of the conversion.
    @Published var outputValue: String = ""

    init() {
        // Initialize the available units and perform an initial conversion.
        updateAvailableUnits()
        convert()
    }

    /// Updates the list of `availableUnits` based on the `selectedCategory`.
    private func updateAvailableUnits() {
        availableUnits = UnitConverter.units(for: selectedCategory)

        // Reset the selected units to sensible defaults when the category changes.
        if let firstUnit = availableUnits.first {
            fromUnit = firstUnit
            toUnit = availableUnits.count > 1 ? availableUnits[1] : firstUnit
        }
    }

    /// Swaps the from and to units and recalculates the conversion.
    func swapUnits() {
        let temp = fromUnit
        fromUnit = toUnit
        toUnit = temp
    }

    /// Performs the unit conversion and updates the `outputValue`.
    private func convert() {
        guard let value = Double(inputValue) else {
            outputValue = ""
            return
        }

        let result = UnitConverter.convert(value, from: fromUnit, to: toUnit)

        let formatter = NumberFormatter()
        formatter.numberStyle = .decimal
        formatter.maximumFractionDigits = 5
        outputValue = formatter.string(from: NSNumber(value: result)) ?? ""
    }
}
