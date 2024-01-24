import React from "react";
import { StyleSheet, View } from "react-native";
import ExpensesList from "./ExpensesList";
import ExpensesSummary from "./ExpensesSummary";
import GlobalStyles from "../../utils/styles";

const DUMMY_DATA = [
  {
    id: "e1",
    description: "Food",
    amount: 59.99,
    date: new Date("2023-12-11"),
  },
  {
    id: "e2",
    description: "Bananas",
    amount: 2.99,
    date: new Date("2023-12-10"),
  },
  {
    id: "e3",
    description: "Coke",
    amount: 1.99,
    date: new Date("2023-12-09"),
  },
  {
    id: "e4",
    description: "Water",
    amount: 0.99,
    date: new Date("2023-12-08"),
  },
  {
    id: "e5",
    description: "Pepsi",
    amount: 3.99,
    date: new Date("2023-12-07"),
  },
];

const ExpensesOutput = ({ expenses, expensesPeriod }) => {
  return (
    <View style={styles.container}>
      <ExpensesSummary periodName={expensesPeriod} expenses={expenses} />
      <ExpensesList expenses={expenses} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
    flex: 1,
  },
});

export default ExpensesOutput;
