import React, { useContext } from "react";
import { Text, View } from "react-native";
import ExpensesOutput from "../components/Expenses/ExpensesOutput";
import { ExpensesContext } from "../store/context/appContext";
import { getDataMinusDays } from "../utils/date";

const RecentExpensesScreen = () => {
  const { expenses } = useContext(ExpensesContext);

  const recentExpenses = expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDataMinusDays(today, 7);

    return expense.date > date7DaysAgo;
  });

  return (
    <ExpensesOutput expensesPeriod={"Last 7 days"} expenses={recentExpenses} />
  );
};

export default RecentExpensesScreen;
