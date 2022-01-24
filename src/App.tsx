import { useState } from "react";
import Button from "react-bootstrap/Button";

import { StyledContainer, StyledStack, H1, Grid } from "./App.styles";
import BudgetCard from "./components/BudgetCard";
import AddBudgetModal from "./components/AddBudgetModal";

function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState<boolean>(false);
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
          <BudgetCard name="Entertainment" amount={1200} max={1000} />
        </Grid>
      </StyledContainer>
      <AddBudgetModal
        show={showAddBudgetModal}
        handleClose={() => setShowAddBudgetModal(false)}
      />
    </>
  );
}

export default App;
