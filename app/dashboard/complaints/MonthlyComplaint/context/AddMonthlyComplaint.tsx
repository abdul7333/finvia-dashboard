
import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import styles from '../../../dashboard.module.css'
import { MonthlyComplaint } from "../MonthlyComplaintData";


type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmitForm: (val: MonthlyComplaint) => void;
};

const AddMonthlyComplaint  = ({ open, setOpen, handleSubmitForm }:Props ) => {
  const initialFormValues: MonthlyComplaint = {
    ReceivedFrom: "",
    CarriedForwardFromPreviousMonth:"",
    Received:"",
    Resolved:"",
    Pending:"",
  };

  const [formValues, setFormValues] = useState<MonthlyComplaint>(initialFormValues);

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
            <div> Add MonthlyComplaint</div>
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
                  <Label for="CarriedForwardFromPreviousMonth">CarriedForwardFromPreviousMonth</Label>
                  <Input
                    className={styles.InputStyle}
                    id="CarriedForwardFromPreviousMonth"
                    name="CarriedForwardFromPreviousMonth"
                    placeholder="Enter CarriedForwardFromPreviousMonth "
                    type="text"
                    value={formValues.CarriedForwardFromPreviousMonth}
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
                  <Label for="Pending">Pending</Label>
                  <Input
                    className={styles.InputStyle}
                    id="Pending"
                    name="Pending"
                    placeholder="Enter Pending "
                    type="text"
                    value={formValues.Pending}
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

export default AddMonthlyComplaint;
