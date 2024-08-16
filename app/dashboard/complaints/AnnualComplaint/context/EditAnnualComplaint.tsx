

import React, { useEffect, useState } from "react";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import styles from '../../../dashboard.module.css'
import { AnnualComplaint } from "../AnnualComplaintData";




type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmitForm: (val: AnnualComplaint) => void;
  AnnualComplaints: AnnualComplaint | null;
};

const EditAnnualComplaint  = ({
  open,
  setOpen,
  handleSubmitForm,
  AnnualComplaints,
}: Props) => {
  const [formValues, setFormValues] = useState<AnnualComplaint | null>(null);

  useEffect(() => {
    if (open && AnnualComplaints) {
      setFormValues(AnnualComplaints);
    } else {
      setFormValues(null);
    }
  }, [open, AnnualComplaints]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues!,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      handleSubmitForm(formValues!);
      setOpen(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Drawer open={open} onClose={() => setOpen(false)} anchor={"right"}>
      <div style={{ width: "600px"}}>
        <div className={styles.DrawerHeaderContainer}>
          <div>
            <div>Edit ClientComplaint</div>
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
                    value={formValues?.ReceivedFrom??""}
                    onChange={handleInputChange}
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="CarriedFromPrevMonth">CarriedFromPrevMonth</Label>
                  <Input
                    className={styles.InputStyle}
                    id="CarriedFromPrevMonth"
                    name="CarriedFromPrevMonth"
                    placeholder="Enter CarriedFromPrevMonth "
                    type="text"
                    value={formValues?.CarriedFromPrevMonth??""}
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
                    value={formValues?.Received??""}
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
                    value={formValues?.Resolved??""}
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
                    value={formValues?.Pending??""}
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
                      onClick={() => setOpen(false)}
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

export default EditAnnualComplaint;
