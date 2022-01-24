import { useRef } from "react";

import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

import {
  useBudgets,
  UNCATEGORIZED_BUDGET_ID,
} from "../contexts/BudgetsContext";

interface Props {
  show: boolean;
  handleClose: Function | any;
  defaultBudgetId: any;
}

export default function AddExpenseModal({
  show,
  handleClose,
  defaultBudgetId,
}: Props) {
  const descriptionRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const amountRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const budgetIdRef = useRef() as React.MutableRefObject<HTMLSelectElement>;

  const { addExpense, budgets } = useBudgets();

  function handleSubmit(e: any) {
    e.preventDefault();
    addExpense({
      descriptionRef: descriptionRef.current.value,
      amount: parseFloat(amountRef.current.value),
      budgetId: budgetIdRef.current.value,
    });
    handleClose();
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>New Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <FormControl ref={descriptionRef} type="text" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="amount">
            <Form.Label>Amount</Form.Label>
            <FormControl
              ref={amountRef}
              type="text"
              required
              min={0}
              step={0.01}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="budgetId">
            <Form.Label>Budget</Form.Label>
            <Form.Select defaultValue={defaultBudgetId} ref={budgetIdRef}>
              <option id={UNCATEGORIZED_BUDGET_ID}>Uncategorized</option>
              {budgets.map((budget) => (
                <option key={budget.id} value={budget.id}>
                  {budget.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="primary" type="submit">
              Add
            </Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
}
