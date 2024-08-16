
import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import styles from '../../../dashboard.module.css'
import { ClientComplaint } from "../clientComplaintData";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmitForm: (val: ClientComplaint) => void;
};

const AddClientComplaint  = ({ open, setOpen, handleSubmitForm }:Props ) => {
  const initialFormValues: ClientComplaint = {
    ReceivedFrom: "",
    PendingAtTheEndOfLastMonth:"",
    Received:"",
    Resolved:"",
    TotalPending:"",
    PendingMoreThanThreeMonths:"",
    AverageResolutionTime:"",
  };

  const [formValues, setFormValues] = useState<ClientComplaint>(initialFormValues);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      handleSubmitForm(formValues);
      setFormValues(initialFormValues);
      setOpen(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Drawer  open={open} onClose={() => setOpen(false)} anchor={"right"}>
      <div style={{ width: "600px"} }>
        <div className={styles.DrawerHeaderContainer}>
          <div>
            <div> Add ClientComplaint</div>
          </div>
          <div>
            <Button onClick={() => setOpen(false)} className="btn-close" />
          </div>
        </div>
        <div className={styles.DrawerContainer}>
          <Form onSubmit={handleFormSubmit}>
            <Row md="1" sm="1" xs="1">
              <Col>
                <FormGroup>
                  <Label for="ReceivedFrom">ReceivedFrom</Label>
                  <Input
                    className={styles.InputStyle}
                    id="ReceivedFrom"
                    name="ReceivedFrom"
                    placeholder="Enter ReceivedFrom "
                    type="text"
                    value={formValues.ReceivedFrom}
                    onChange={handleInputChange}
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="PendingAtTheEndOfLastMonth">PendingAtTheEndOfLastMonth</Label>
                  <Input
                    className={styles.InputStyle}
                    id="PendingAtTheEndOfLastMonth"
                    name="PendingAtTheEndOfLastMonth"
                    placeholder="Enter PendingAtTheEndOfLastMonth "
                    type="text"
                    value={formValues.PendingAtTheEndOfLastMonth}
                    onChange={handleInputChange}
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="Received">Received</Label>
                  <Input
                    className={styles.InputStyle}
                    id="Received"
                    name="Received"
                    placeholder="Enter Received "
                    type="text"
                    value={formValues.Received}
                    onChange={handleInputChange}
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="Resolved">Resolved</Label>
                  <Input
                    className={styles.InputStyle}
                    id="Resolved"
                    name="Resolved"
                    placeholder="Enter Resolved "
                    type="text"
                    value={formValues.Resolved}
                    onChange={handleInputChange}
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="TotalPending">TotalPending</Label>
                  <Input
                    className={styles.InputStyle}
                    id="TotalPending"
                    name="TotalPending"
                    placeholder="Enter TotalPending "
                    type="text"
                    value={formValues.TotalPending}
                    onChange={handleInputChange}
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="PendingMoreThanThreeMonths">PendingMoreThanThreeMonths</Label>
                  <Input
                    className={styles.InputStyle}
                    id="PendingMoreThanThreeMonths"
                    name="PendingMoreThanThreeMonths"
                    placeholder="Enter PendingMoreThanThreeMonths "
                    type="text"
                    value={formValues.PendingMoreThanThreeMonths}
                    onChange={handleInputChange}
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="AverageResolutionTime">AverageResolutionTime</Label>
                  <Input
                    className={styles.InputStyle}
                    id="AverageResolutionTime"
                    name="AverageResolutionTime"
                    placeholder="Enter AverageResolutionTime "
                    type="text"
                    value={formValues.AverageResolutionTime}
                    onChange={handleInputChange}
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <div className={styles.DrawerButtonContainer}>
                    <Button
                      type="button"
                      variant="outlined"
                      className={styles.DrawerCancelButton}
                      onClick={() => {
                        setFormValues(initialFormValues);
                        setOpen(false);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" variant="contained" className={styles.DrawerSubmitButton}>
                      Submit
                    </Button>
                  </div>
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </Drawer>
  );
};

export default AddClientComplaint;
