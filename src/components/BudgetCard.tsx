import styled from "styled-components";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/esm/Button";
import Stack from "react-bootstrap/esm/Stack";
import ProgressBar from "react-bootstrap/ProgressBar";

import { currencyFormatter } from "../utils";

interface Props {
  name: string;
  amount: number;
  max: number;
  gray?: string;
  onAddExpenseClick: any;
}

function BudgetCard({ name, amount, max, gray, onAddExpenseClick }: Props) {
  const cardBackground = () => {
    const classNames = [];
    if (amount > max) {
      classNames.push("bg-danger", "bg-opacity-10");
    } else if (gray) {
      classNames.push("bg-light");
    }
    return classNames;
  };

  return (
    <StyledCard className={cardBackground()}>
      <Card.Body>
        <Card.Title className="d-flex justify-content-between align-items-baseline fw-normal mb-3">
          <div className="me-2">{name}</div>
          <div className="d-flex align-items-baseline">
            {currencyFormatter.format(amount)}
            <span className="text-muted fs-6 ms-1">
              / {currencyFormatter.format(max)}
            </span>
          </div>
        </Card.Title>
        <ProgressBar
          className="rounded-pill"
          variant={getProgressBarVariant(amount, max)}
          min={0}
          max={max}
          now={amount}
        />
        <Stack direction="horizontal" gap={2} className="mt-4">
          <Button
            onClick={onAddExpenseClick}
            variant="outline-primary"
            className="ms-auto"
          >
            Add Expense
          </Button>
          <Button variant="outline-secondary">View Expenses</Button>
        </Stack>
      </Card.Body>
    </StyledCard>
  );
}

export default BudgetCard;

interface CardProps {
  background: string;
}

const StyledCard = styled(Card).attrs(({ background }) => ({
  className: background,
}))<CardProps>``;

const getProgressBarVariant = (amount: number, max: number) => {
  const ratio = amount / max;
  if (ratio < 0.5) return "primary";
  if (ratio < 0.75) return "warning";
  return "danger";
};
