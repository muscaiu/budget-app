import {
  Expense,
  UNCATEGORIZED_BUDGET_ID,
  useBudgets,
} from "../contexts/BudgetsContext";
import BudgetCard, { BudgetCardProps } from "./BudgetCard";

export default function UncategorizedBudgetCard(props: BudgetCardProps) {
  const { getBudgetExpenses } = useBudgets();

  const amount = getBudgetExpenses(UNCATEGORIZED_BUDGET_ID).reduce(
    (total: number, expense: Expense) => total + expense.amount,
    0
  );

  if (amount === 0) return null;

  return <BudgetCard {...props} amount={amount} name="Uncategorized" gray />;
}
