import SwiftUI

struct DateCalculationView: View {
    @StateObject private var viewModel = DateCalculatorViewModel()

    var body: some View {
        VStack(alignment: .leading, spacing: 20) {
            Picker("Calculation Mode", selection: $viewModel.mode) {
                ForEach(DateCalculatorViewModel.Mode.allCases) { mode in
                    Text(mode.rawValue).tag(mode)
                }
            }
            .pickerStyle(SegmentedPickerStyle())
            .padding(.horizontal)
            .padding(.top)

            if viewModel.mode == .difference {
                DifferenceView(viewModel: viewModel)
            } else {
                AddSubtractView(viewModel: viewModel)
            }

            Spacer()
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
    }
}

struct DifferenceView: View {
    @ObservedObject var viewModel: DateCalculatorViewModel

    var body: some View {
        Form {
            DatePicker("From:", selection: $viewModel.fromDate, displayedComponents: .date)
            DatePicker("To:", selection: $viewModel.toDate, displayedComponents: .date)

            Divider().padding(.vertical)

            HStack {
                Text("Difference:")
                    .font(.headline)
                Spacer()
                Text(viewModel.differenceResult)
                    .font(.headline)
                    .fontWeight(.semibold)
            }
        }
        .padding()
    }
}

struct AddSubtractView: View {
    @ObservedObject var viewModel: DateCalculatorViewModel

    var body: some View {
        Form {
            Picker("Operation", selection: $viewModel.operation) {
                Text("Add").tag(DateCalculatorViewModel.Operation.add)
                Text("Subtract").tag(DateCalculatorViewModel.Operation.subtract)
            }
            .pickerStyle(SegmentedPickerStyle())

            DatePicker("From:", selection: $viewModel.startDate, displayedComponents: .date)

            Section(header: Text("Duration").font(.headline)) {
                Stepper("Years: \(viewModel.yearsToAdd)", value: $viewModel.yearsToAdd, in: 0...1000)
                Stepper("Months: \(viewModel.monthsToAdd)", value: $viewModel.monthsToAdd, in: 0...1000)
                Stepper("Days: \(viewModel.daysToAdd)", value: $viewModel.daysToAdd, in: 0...1000)
            }

            Divider().padding(.vertical)

            HStack {
                Text("Result:")
                    .font(.headline)
                Spacer()
                Text(viewModel.addSubtractResult)
                    .font(.headline)
                    .fontWeight(.semibold)
            }
        }
        .padding()
    }
}
