// AddUser.tsx

import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import Select, { SingleValue } from "react-select";
import { ButtonDropdown, Col, DropdownItem, DropdownMenu, DropdownToggle, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { User } from "../userData";
import styles from '../../../dashboard.module.css'
import { IOptions } from "@/utils/utils";

type Props = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    handleSubmitForm: (val: User) => void;
    rolesOptions: IOptions[] | null;
};

const AddUser: React.FC<Props> = ({ open, setOpen, rolesOptions, handleSubmitForm }) => {
    const initialFormValues: User = {
        name: "",
        email: "",
        phone: '',
        status: false,
        password: "",
        role: ""
    };

    const [formValues, setFormValues] = useState<User>(initialFormValues);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, type, checked, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleRoleChange = (selectedOption: SingleValue<IOptions>) => {
        setFormValues({
            ...formValues,
            role: selectedOption?.value || "",
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

    const handleStatusChange = (status: boolean) => {
        setFormValues({
            ...formValues!,
            status,
        });
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
                                    <Label className={styles.LabelStyle} for="password">Password</Label>
                                    <Input
                                        className={styles.InputStyle}
                                        id="password"
                                        name="password"
                                        placeholder="Enter Password"
                                        type="password"
                                        value={formValues.password}
                                        onChange={handleInputChange}
                                    />
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label className={styles.LabelStyle} for="role">Role</Label>
                                    <Select
                                        name="role"
                                        options={rolesOptions ?? []}
                                        value={
                                            rolesOptions
                                                ? rolesOptions.find((option) => option.value === formValues.role)
                                                : null
                                        }
                                        onChange={handleRoleChange}
                                    />
                                </FormGroup>
                            </Col>
                            <Col >
                                <FormGroup>
                                    <Label className={styles.LabelStyle} sm="2">Status</Label>
                                    <ButtonDropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                                        <DropdownToggle caret className={styles.DropdownButton}>
                                            {formValues?.status ? "Active" : "Inactive"}
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            <DropdownItem onClick={() => handleStatusChange(true)}>
                                                Active
                                            </DropdownItem>
                                            <DropdownItem onClick={() => handleStatusChange(false)}>
                                                Inactive
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </ButtonDropdown>
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

export default AddUser;