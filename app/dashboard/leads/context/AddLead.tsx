// AddUser.tsx

import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { Lead } from "../leadData";
import styles from '../../dashboard.module.css'

type Props = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    handleSubmitForm: (val: Lead) => void;
};

const AddLead: React.FC<Props> = ({ open, setOpen, handleSubmitForm }) => {
    const initialFormValues: Lead = {
        name: "",
        email: "",
        phone: '',
        language: "",
        message: "",
    };

    const [formValues, setFormValues] = useState<Lead>(initialFormValues);

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
        <Drawer open={open} onClose={() => setOpen(false)} anchor={"right"}>
            <div style={{ width: "500px" }}>
                <div className={styles.DrawerHeaderContainer}>
                    <div>
                        <div>Add Lead</div>
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
                                    <Label className={styles.LabelStyle} for="name">Name</Label>
                                    <Input
                                        className={styles.InputStyle}
                                        id="name"
                                        name="name"
                                        placeholder="Enter Name"
                                        type="text"
                                        value={formValues.name}
                                        onChange={handleInputChange}
                                    />
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label className={styles.LabelStyle} for="email">Email</Label>
                                    <Input
                                        className={styles.InputStyle}
                                        id="email"
                                        name="email"
                                        placeholder="Enter Email"
                                        type="email"
                                        value={formValues.email}
                                        onChange={handleInputChange}
                                    />
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label className={styles.LabelStyle} for="phone">Phone</Label>
                                    <Input
                                        className={styles.InputStyle}
                                        id="phone"
                                        name="phone"
                                        placeholder="Enter Phone Number"
                                        type="text"
                                        value={formValues.phone}
                                        onChange={handleInputChange}
                                    />
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label className={styles.LabelStyle} for="language">Language</Label>
                                    <Input
                                        className={styles.InputStyle}
                                        id="language"
                                        name="language"
                                        placeholder="Enter Language"
                                        type="text"
                                        value={formValues.language}
                                        onChange={handleInputChange}
                                    />
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label className={styles.LabelStyle} for="message">Message</Label>
                                    <Input
                                        className={styles.InputStyle}
                                        id="message"
                                        name="message"
                                        placeholder="Enter Message"
                                        type="text"
                                        value={formValues.message}
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
                                        <Button type="submit" variant="contained" className={styles.BlueButton}>
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

export default AddLead;
