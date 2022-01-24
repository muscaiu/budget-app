import React, { useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import useLocalStorage from "../hooks/useLocalStorage";

interface AppContextInterface {
  budgets: Budget[];
  expenses: Expense[];
  getBudgetxpenses: Function;
  addExpense: Function;
  addBudget: Function;
  getBudgetExpenses: Function;
  deleteBudget: Function;
  deleteExpense: Function;
}
const BudgetsContext = React.createContext({} as AppContextInterface);

export const UNCATEGORIZED_BUDGET_ID = "Uncategorized";

export function useBudgets() {
  return useContext(BudgetsContext);
}

interface BudgetsProviderProps {
  children: any;
}

export interface Budget {
  name: string;
  max: number;
  amount: number;
  id: string;
}
export interface Expense {
  budgetId: number;
  description: string;
  amount: number;
  id: string; // this is not sure
}

export const BudgetsProvider = ({ children }: BudgetsProviderProps) => {
  const [budgets, setBudgets] = useLocalStorage("budgets", []);
  const [expenses, setExpenses] = useLocalStorage("expenses", []);

  function getBudgetxpenses(budgetId: number) {
    return expenses.filter((expense: Expense) => expense.budgetId === budgetId);
  }

  function addExpense({ description, amount, budgetId }: Expense) {
    setExpenses((prevExpenses: any) => {
      return [...prevExpenses, { id: uuidv4(), description, amount, budgetId }];
    });
  }

  function addBudget({ name, max }: Budget) {
    setBudgets((prevBudgets: any) => {
      if (prevBudgets.find((budget: Budget) => budget.name === name)) {
        return prevBudgets;
      }
      return [...prevBudgets, { id: uuidv4(), name, max }];
    });
  }

  function getBudgetExpenses(budgetId: number) {
    return expenses.filter((expense: Expense) => expense.budgetId === budgetId);
  }

  function deleteBudget({ id }: any) {
    // TOD: Deal with uncategorized expenses
    setBudgets((prevBudgets: any) => {
      return prevBudgets.filter((budget: Budget) => budget.id !== id);
    });
  }

  function deleteExpense({ id }: any) {
    setExpenses((prevExpenses: any) => {
      return prevExpenses.filter((expense: Expense) => expense.id !== id);
    });
  }

  return (
    <BudgetsContext.Provider
      value={{
        budgets,
        expenses,
        getBudgetxpenses,
        addExpense,
        addBudget,
        getBudgetExpenses,
        deleteBudget,
        deleteExpense,
      }}
    >
      {children}
    </BudgetsContext.Provider>
  );
};
