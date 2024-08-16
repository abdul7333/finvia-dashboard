// EditCalls.tsx

import React, { useEffect, useState } from "react";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import styles from '../../dashboard.module.css'
import { Calls } from "../callsData";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmitForm: (val: Calls) => void;
  Calls: Calls | null;
};

const EditCalls  = ({
  open,
  setOpen,
  handleSubmitForm,
  Calls,
}: Props) => {
  const [formValues, setFormValues] = useState<Calls | null>(null);

  useEffect(() => {
    if (open && Calls) {
      setFormValues(Calls);
    } else {
      setFormValues(null);
    }
  }, [open, Calls]);

  const calculateROI = () => {
    if(formValues!==null){
      const a = formValues.booked * formValues.quantity;
      const b = formValues.quantity * formValues.entry;
      
      const roi = ((a-b)/b)*100
      return +roi.toFixed(2)
    }
  }
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
      const ROI = calculateROI() ?? 0
      const newPayload = {
        ...formValues,
        PandL: +((formValues!.booked-formValues!.entry)*formValues!.quantity).toFixed(0),
        roi: ROI 
      } as Calls

      handleSubmitForm(newPayload!);
      setOpen(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  
 
  return (
    <Drawer open={open} onClose={() => setOpen(false)} anchor={"right"}>
      <div style={{ width: "600px", overflow: "hidden", display: "flex", flexDirection: "column", paddingBottom: "5rem" }}>
        <div className={styles.DrawerHeaderContainer}>
          <div>
            <div>Edit Call</div>
          </div>
          <div>
            <Button onClick={() => setOpen(false)} className="btn-close" />
          </div>
        </div>
        <div className={styles.DrawerContainer}>
          <Form onSubmit={handleFormSubmit}>
            <Row md="2" sm="2" xs="2">
              <Col>
                <FormGroup>
                  <Label for="stock">Stock</Label>
                  <Input
                    className={styles.InputStyle}
                    id="stock"
                    name="stock"
                    placeholder="Enter stock Name"
                    type="text"
                    value={formValues?.stock ?? ""}
                    onChange={handleInputChange}
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="action">Action</Label>
                  <Input
                    className={styles.InputStyle}
                    id="action"
                    name="action"
                    type="select"
                    value={formValues?.action ?? ""}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Action</option>
                    <option value="buy">Buy</option>
                    <option value="sell">Sell</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="type">Type</Label>
                  <Input
                    className={styles.InputStyle}
                    id="type"
                    name="type"
                    type="select"
                    value={formValues?.type ?? ""}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Type</option>
                    <option value="intraday">Intraday</option>
                    <option value="Swing">Swing</option>
                    <option value="positional">Positional</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="quantity">Quantity</Label>
                  <Input
                    className={styles.InputStyle}
                    id="quantity"
                    name="quantity"
                    placeholder="Enter quantity"
                    type="number"
                    value={formValues?.quantity ?? ""}
                    onChange={handleInputChange}
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="entry">Entry</Label>
                  <Input
                    className={styles.InputStyle}
                    id="entry"
                    name="entry"
                    placeholder="Enter entry"
                    type="number"
                    value={formValues?.entry ?? ""}
                    onChange={handleInputChange}
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="target1">Target1</Label>
                  <Input
                    className={styles.InputStyle}
                    id="target1"
                    name="target1"
                    placeholder="Enter target1"
                    type="number"
                    value={formValues?.target1 ?? ""}
                    onChange={handleInputChange}
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="target2">Target2</Label>
                  <Input
                    className={styles.InputStyle}
                    id="target2"
                    name="target2"
                    placeholder="Enter target2"
                    type="number"
                    value={formValues?.target2 ?? ""}
                    onChange={handleInputChange}
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="stopLoss">StopLoss</Label>
                  <Input
                    className={styles.InputStyle}
                    id="stopLoss"
                    name="stopLoss"
                    placeholder="Enter StopLoss"
                    type="number"
                    value={formValues?.stopLoss ?? ""}
                    onChange={handleInputChange}
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="booked">Booked</Label>
                  <Input
                    className={styles.InputStyle}
                    id="booked"
                    name="booked"
                    placeholder="Enter booked"
                    type="number"
                    value={formValues?.booked ?? ""}
                    onChange={handleInputChange}
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="roi">ROI</Label>
                  <Input
                    className={styles.InputStyle}
                    id="roi"
                    name="roi"
                    placeholder="Enter roi"
                    type="number"
                    disabled
                    value={calculateROI() ?? 0}
                    onChange={handleInputChange}
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="PandL">P&L</Label>
                  <Input
                    className={styles.InputStyle}
                    id="PandL"
                    name="PandL"
                    placeholder="Enter P&L"
                    type="number"
                    disabled
                    value={formValues?((formValues.booked-formValues.entry)*formValues.quantity).toFixed(0):0}
                    onChange={handleInputChange}
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="status">Status</Label>
                  <Input
                    className={styles.InputStyle}
                    id="status"
                    name="status"
                    type="select"
                    value={formValues?.status ?? ""}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Status</option>
                    <option value="target hit 1">Target Hit 1</option>
                    <option value="target hit 2">Target Hit 2</option>
                    <option value="stoploss hit">Stoploss Hit</option>
                  </Input>
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

export default EditCalls;
