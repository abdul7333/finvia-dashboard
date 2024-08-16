// EditPassword.tsx

import React, { useEffect, useState } from "react";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import styles from '../../../dashboard.module.css'
import { User } from "../userData";

type Props = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    handleSubmitForm: (val: User) => void;
    user: User | null;
};

const EditPassword: React.FC<Props> = ({
    open,
    setOpen,
    handleSubmitForm,
    user,
}) => {
    const [formValues, setFormValues] = useState<User | null>(null);

    useEffect(() => {
        if (open && user) {
            setFormValues({
                ...user,
                password: ''
            });
        } else {
            setFormValues(null);
        }
    }, [open, user]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, type, value, checked } = e.target;
        setFormValues({
            ...formValues!,
            [name]: type === 'checkbox' ? checked : value,
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
            <div style={{ width: "500px" }}>
                <div className={styles.DrawerHeaderContainer}>
                    <div>
                        <div>Edit Password</div>
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
                                    <Label className={styles.LabelStyle} for="password">Password</Label>
                                    <Input
                                        className={styles.InputStyle}
                                        id="password"
                                        name="password"
                                        placeholder="Enter New Password"
                                        type="password"
                                        value={formValues?.password ?? ""}
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

export default EditPassword;
