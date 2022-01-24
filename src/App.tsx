import Button from "react-bootstrap/Button";

import { StyledContainer, StyledStack, H1 } from "./App.styles";

function App() {
  return (
    <StyledContainer>
      <StyledStack>
        <H1>Budgets</H1>

        <Button variant="primary">Add Budget</Button>
        <Button variant="outline-primary">Add Expense</Button>
      </StyledStack>
    </StyledContainer>
  );
}

export default App;
