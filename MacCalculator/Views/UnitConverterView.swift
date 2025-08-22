import SwiftUI

struct UnitConverterView: View {
    @StateObject private var viewModel = UnitConverterViewModel()

    var body: some View {
        VStack(alignment: .leading, spacing: 20) {
            Picker("Category", selection: $viewModel.selectedCategory) {
                ForEach(UnitConverter.Category.allCases) { category in
                    Text(category.rawValue).tag(category)
                }
            }
            .pickerStyle(SegmentedPickerStyle())
            .padding()

            Form {
                HStack(spacing: 20) {
                    // Input Side
                    VStack {
                        Text("From").font(.headline)
                        Picker("From Unit", selection: $viewModel.fromUnit) {
                            ForEach(viewModel.availableUnits) { unit in
                                Text(unit.symbol).tag(unit)
                            }
                        }
                        .labelsHidden()

                        TextField("Value", text: $viewModel.inputValue)
                            .font(.system(size: 24))
                            .multilineTextAlignment(.center)
                            .keyboardType(.decimalPad)
                            .textFieldStyle(RoundedBorderTextFieldStyle())
                    }

                    // Swap Button
                    Button(action: {
                        viewModel.swapUnits()
                    }) {
                        Image(systemName: "arrow.left.arrow.right")
                            .font(.title)
                    }
                    .buttonStyle(PlainButtonStyle())

                    // Output Side
                    VStack {
                        Text("To").font(.headline)
                        Picker("To Unit", selection: $viewModel.toUnit) {
                            ForEach(viewModel.availableUnits) { unit in
                                Text(unit.symbol).tag(unit)
                            }
                        }
                        .labelsHidden()

                        Text(viewModel.outputValue)
                            .font(.system(size: 24))
                            .frame(maxWidth: .infinity, minHeight: 36)
                            .background(Color(NSColor.windowBackgroundColor))
                            .cornerRadius(5)
                    }
                }
            }
            .padding()
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
    }
}
