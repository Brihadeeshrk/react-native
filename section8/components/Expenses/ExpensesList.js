import React from "react";
import { FlatList, View, Text } from "react-native";
import ExpenseItem from "./ExpenseItem";

const renderExpenseItem = ({ item }) => {
  return (
    <ExpenseItem
      amount={item.amount}
      description={item.description}
      date={item.date}
      id={item.id}
    />
  );
};

const ExpensesList = ({ expenses }) => {
  return (
    <View>
      <FlatList
        data={expenses}
        renderItem={renderExpenseItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default ExpensesList;
