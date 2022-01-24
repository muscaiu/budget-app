import Button from "react-bootstrap/Button";

import { StyledContainer, StyledStack, H1, Grid } from "./App.styles";
import BudgetCard from "./components/BudgetCard";

function App() {
  return (
    <StyledContainer>
      <StyledStack>
        <H1>Budgets</H1>

        <Button variant="primary">Add Budget</Button>
        <Button variant="outline-primary">Add Expense</Button>
      </StyledStack>
      <Grid>
        <BudgetCard name="Entertainment" amount={1200} max={1000} />
      </Grid>
    </StyledContainer>
  );
}

export default App;
