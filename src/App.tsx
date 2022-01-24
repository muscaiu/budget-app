import { useState } from "react";
import Button from "react-bootstrap/Button";

import { StyledContainer, StyledStack, H1, Grid } from "./App.styles";
import BudgetCard from "./components/BudgetCard";
import AddBudgetModal from "./components/AddBudgetModal";
import AddExpenseModal from "./components/AddExpenseModal";
import { useBudgets } from "./contexts/BudgetsContext";

function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState<boolean>(false);
  const { budgets, getBudgetExpenses } = useBudgets();

  return (
    <>
      <StyledContainer>
        <StyledStack>
          <H1>Budgets</H1>

          <Button onClick={() => setShowAddBudgetModal(true)} variant="primary">
            Add Budget
          </Button>
          <Button variant="outline-primary">Add Expense</Button>
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
        defaultBudgetId={1}
        show={true}
        handleClose={() => setShowAddBudgetModal(false)}
      />
    </>
  );
}

export default App;
