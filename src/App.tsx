import { useState } from "react";
import Button from "react-bootstrap/Button";

import { StyledContainer, StyledStack, H1, Grid } from "./App.styles";
import BudgetCard from "./components/BudgetCard";
import AddBudgetModal from "./components/AddBudgetModal";
import AddExpenseModal from "./components/AddExpenseModal";
import { useBudgets } from "./contexts/BudgetsContext";

function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState<boolean>(false);
  const [showAddExpenseModal, setShowAddExpenseModal] =
    useState<boolean>(false);
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState();
  const { budgets, getBudgetExpenses } = useBudgets();

  function openAddExpenseModal(budgetId: any) {
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
          <Button onClick={openAddExpenseModal} variant="outline-primary">
            Add Expense
          </Button>
        </StyledStack>
        <Grid>
          {budgets.map((budget) => {
            const amount = getBudgetExpenses(budget.id).reduce(
              (total: any, expense: any) => total + expense.amount,
              0
            );
            return (
              <BudgetCard
                key={budget.id}
                amount={amount}
                name={budget.name}
                max={budget.max}
                onAddExpenseClick={() => openAddExpenseModal(budget.id)}
              />
            );
          })}
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
    </>
  );
}

export default App;
