import SwiftUI

struct ContentView: View {
    // Enum to define the different calculator modes
    enum CalculatorMode: String, CaseIterable, Identifiable {
        case standard = "Standard"
        case scientific = "Scientific"
        case date = "Date Calculation"
        case converter = "Unit Converter"

        var id: String { self.rawValue }
    }

    // State variable to keep track of the selected mode
    @State private var selectedMode: CalculatorMode = .standard

    var body: some View {
        NavigationView {
            // Sidebar for mode selection
            List(CalculatorMode.allCases) { mode in
                NavigationLink(destination: viewForMode(mode), tag: mode, selection: $selectedMode) {
                    Text(mode.rawValue)
                }
            }
            .listStyle(SidebarListStyle())
            .frame(minWidth: 180)

            // The content view for the selected mode
            viewForMode(selectedMode)
        }
        .frame(minWidth: 600, minHeight: 400)
    }

    // Helper function to return the correct view for the selected mode
    @ViewBuilder
    private func viewForMode(_ mode: CalculatorMode) -> some View {
        switch mode {
        case .standard:
            StandardCalculatorView()
        case .scientific:
            ScientificCalculatorView()
        case .date:
            DateCalculationView()
        case .converter:
            UnitConverterView()
        }
    }
}
