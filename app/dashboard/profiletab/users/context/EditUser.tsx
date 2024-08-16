// EditUser.tsx

import React, { useEffect, useState } from "react";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { ButtonDropdown, Col, DropdownItem, DropdownMenu, DropdownToggle, Form, FormGroup, Input, Label, Row } from "reactstrap";
import Select, { SingleValue } from "react-select";
import { IOptions } from "@/utils/utils";
import styles from '../../../dashboard.module.css'
import { User } from "../userData";

type Props = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    rolesOptions: IOptions[] | null;
    handleSubmitForm: (val: User) => void;
    user: User | null;
};

const EditUser: React.FC<Props> = ({
    open,
    setOpen,
    rolesOptions,
    handleSubmitForm,
    user,
}) => {

    const initialFormValues: User = {
        name: "",
        email: "",
        phone: "",
        role: "",
        password: '',
        status: true,
    };


    const [formValues, setFormValues] = useState<User>(initialFormValues);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);



    useEffect(() => {
        if (open && user) {
            setFormValues(user);
        } else {
            setFormValues(initialFormValues);
        }
    }, [open, user]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues!,
            [name]: value,
        });
    };

    const handleRoleChange = (selectedOption: SingleValue<IOptions>) => {
        setFormValues({
            ...formValues!,
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
            ...formValues,
            status,
        });
    };

    return (
        <Drawer open={open} onClose={() => setOpen(false)} anchor={"right"}>
            <div style={{ width: "500px" }}>
                <div className={styles.DrawerHeaderContainer}>
                    <div >
                        <div>Edit User</div>
                    </div>
                    <div >
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
                                        value={formValues?.name ?? ""}
                                        onChange={handleInputChange}
                                    />
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label className={styles.LabelStyle} for="exampleEmail">Email</Label>
                                    <Input
                                        className={styles.InputStyle}
                                        id="exampleEmail"
                                        name="email"
                                        placeholder="Enter Email"
                                        type="email"
                                        value={formValues?.email ?? ""}
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
                                        type="number"
                                        value={formValues?.phone ?? ""}
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
                            <Col>
                                <FormGroup>
                                    <Label sm="2">Status</Label>
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

export default EditUser;