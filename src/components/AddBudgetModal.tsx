import { useRef } from "react";

import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

import { useBudgets } from "../contexts/BudgetsProvider";

interface Props {
  show: boolean;
  handleClose: Function | any;
}

export default function AddBudgetModal({ show, handleClose }: Props) {
  const nameRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const maxRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const { addBudget } = useBudgets();

  function handleSubmit(e: any) {
    e.preventDefault();
    addBudget({
      name: nameRef.current.value,
      max: parseFloat(maxRef.current.value),
    });
    handleClose();
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>New Budget</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <FormControl ref={nameRef} type="text" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="max">
            <Form.Label>Maximmum Spending</Form.Label>
            <FormControl
              ref={maxRef}
              type="text"
              required
              min={0}
              step={0.01}
            />
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
