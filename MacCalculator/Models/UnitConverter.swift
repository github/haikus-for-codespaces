import Foundation

struct UnitConverter {
    enum Category: String, CaseIterable, Identifiable {
        case length = "Length"
        case volume = "Volume"
        case weight = "Weight"
        var id: String { self.rawValue }
    }

    static func units(for category: Category) -> [Dimension] {
        switch category {
        case .length:
            return [UnitLength.meters, UnitLength.kilometers, UnitLength.feet, UnitLength.yards, UnitLength.miles, UnitLength.nauticalMiles, UnitLength.inches]
        case .volume:
            return [UnitVolume.liters, UnitVolume.milliliters, UnitVolume.gallons, UnitVolume.pints, UnitVolume.cups, UnitVolume.fluidOunces]
        case .weight:
            return [UnitMass.kilograms, UnitMass.grams, UnitMass.pounds, UnitMass.ounces, UnitMass.stones]
        }
    }

    static func convert(_ value: Double, from fromUnit: Dimension, to toUnit: Dimension) -> Double {
        // Create a Measurement object with the input value and unit.
        let measurement = Measurement(value: value, unit: fromUnit)
        // Convert it to the target unit.
        return measurement.converted(to: toUnit).value
    }
}

// Extension to make Dimension identifiable and hashable for use in SwiftUI Pickers.
extension Dimension: Identifiable, Hashable {
    public var id: String {
        self.symbol
    }

    public static func == (lhs: Dimension, rhs: Dimension) -> Bool {
        lhs.symbol == rhs.symbol
    }

    public func hash(into hasher: inout Hasher) {
        hasher.combine(symbol)
    }
}
