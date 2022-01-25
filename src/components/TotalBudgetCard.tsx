import {
  Budget,
  Expense,
  UNCATEGORIZED_BUDGET_ID,
  useBudgets,
} from "../contexts/BudgetsContext";
import BudgetCard, { BudgetCardProps } from "./BudgetCard";

export default function TotalBudgetCard(props: BudgetCardProps) {
  const { expenses, budgets } = useBudgets();

  const amount = expenses.reduce(
    (total: number, expense: Expense) => total + expense.amount,
    0
  );
  const max = budgets.reduce(
    (total: number, budget: Budget) => total + budget.max,
    0
  );

  if (max === 0) return null;

  return <BudgetCard max={max} amount={amount} name="Total" gray hideButtons />;
}
