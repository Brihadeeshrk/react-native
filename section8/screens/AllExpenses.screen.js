import React, { useContext } from "react";
import ExpensesOutput from "../components/Expenses/ExpensesOutput";
import { ExpensesContext } from "../store/context/appContext";

const AllExpensesScreen = () => {
  const { expenses } = useContext(ExpensesContext);
  return <ExpensesOutput expensesPeriod="Total" expenses={expenses} />;
};

export default AllExpensesScreen;
