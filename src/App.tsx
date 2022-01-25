import { useState } from "react";
import Button from "react-bootstrap/Button";

import { StyledContainer, StyledStack, H1, Grid } from "./App.styles";
import BudgetCard from "./components/BudgetCard";
import UncategorizedBudgetCard from "./components/UncategorizedBudgetCard";
import TotalBudgetCard from "./components/TotalBudgetCard";
import AddBudgetModal from "./components/AddBudgetModal";
import AddExpenseModal from "./components/AddExpenseModal";
import ViewExpensesModal from "./components/ViewExpensesModal";
import {
  Budget,
  Expense,
  UNCATEGORIZED_BUDGET_ID,
  useBudgets,
} from "./contexts/BudgetsContext";

function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState<boolean>(false);
  const [showAddExpenseModal, setShowAddExpenseModal] =
    useState<boolean>(false);
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState("");
  const [viewExpenseModalBudgetId, setViewExpenseModalBudgetId] =
    useState<string>("");

  const { budgets, getBudgetExpenses } = useBudgets();

  function openAddExpenseModal(budgetId: string) {
    setShowAddExpenseModal(true);
    setAddExpenseModalBudgetId(budgetId);
  }

  return (
    <>
      <StyledContainer>
        <StyledStack>
          <H1>Budgets</H1>

          <Button onClick={() => setShowAddBudgetModal(true)} variant="primary">
            Add Budget
          </Button>
          <Button onClick={() => openAddExpenseModal} variant="outline-primary">
            Add Expense
          </Button>
        </StyledStack>
        <Grid>
          {budgets.map((budget: Budget) => {
            const amount = getBudgetExpenses(budget.id).reduce(
              (total: number, expense: Expense) => total + expense.amount,
              0
            );
            return (
              <BudgetCard
                key={budget.id}
                amount={amount}
                name={budget.name}
                max={budget.max}
                onAddExpenseClick={() => openAddExpenseModal(budget.id)}
                onViewExpenseClick={() =>
                  setViewExpenseModalBudgetId(budget.id)
                }
              />
            );
          })}
          <UncategorizedBudgetCard
            onAddExpenseClick={() =>
              openAddExpenseModal(UNCATEGORIZED_BUDGET_ID)
            }
            onViewExpenseClick={() =>
              setViewExpenseModalBudgetId(UNCATEGORIZED_BUDGET_ID)
            }
          />
          <TotalBudgetCard hideButtons />
        </Grid>
      </StyledContainer>
      <AddBudgetModal
        show={showAddBudgetModal}
        handleClose={() => setShowAddBudgetModal(false)}
      />
      <AddExpenseModal
        defaultBudgetId={addExpenseModalBudgetId}
        show={showAddExpenseModal}
        handleClose={() => setShowAddExpenseModal(false)}
      />
      <ViewExpensesModal
        budgetId={viewExpenseModalBudgetId}
        handleClose={() => setViewExpenseModalBudgetId("")}
      />
    </>
  );
}

export default App;
