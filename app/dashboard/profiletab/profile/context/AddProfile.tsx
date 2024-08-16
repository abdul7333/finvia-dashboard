// AddUser.tsx
import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { ButtonDropdown, Col, DropdownItem, DropdownMenu, DropdownToggle, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { PermissionSchema, Profile } from "../profileData";
import styles from '../../../dashboard.module.css'
type Props = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    handleSubmitForm: (val: Profile) => void;
};
const defaultPermissions: PermissionSchema = {
    create: false,
    view: false,
    edit: false,
};
const initializePermissions = () => ({
    leads: { ...defaultPermissions },
    users: { ...defaultPermissions },
    calls: { ...defaultPermissions },
    profile: { ...defaultPermissions },
    Complaint: { ...defaultPermissions },
});
const AddProfile: React.FC<Props> = ({ open, setOpen, handleSubmitForm }) => {
    const initialFormValues: Profile = {
        profileName: "",
        status: true,
        permission: initializePermissions()
    };
    const [formValues, setFormValues] = useState<Profile>(initialFormValues);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
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
    const handlePermissionChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        key: keyof Profile["permission"],
        perm: keyof PermissionSchema
    ) => {
        const { checked } = e.target;
        setFormValues({
            ...formValues,
            permission: {
                ...formValues.permission!,
                [key]: {
                    ...formValues.permission![key],
                    [perm]: checked,
                },
            },
        });
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
                        <div>Add Profile</div>
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
                                    <Label className={styles.LabelStyle} for="profileName">Profile Name</Label>
                                    <Input
                                        className={styles.InputStyle}
                                        id="profileName"
                                        name="profileName"
                                        placeholder="Enter Name"
                                        type="text"
                                        value={formValues.profileName}
                                        onChange={handleInputChange}
                                    />
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label className={styles.LabelStyle} sm="2">Status:</Label>
                                    <ButtonDropdown isOpen={dropdownOpen} toggle={toggleDropdown} >
                                        <DropdownToggle caret className={styles.DropdownButton}>
                                            {formValues.status ? "Active" : "Inactive"}
                                        </DropdownToggle>
                                        <DropdownMenu >
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
                            {formValues.permission &&
                                Object.keys(formValues.permission).map((key) => (
                                    <Row key={key} className={styles.ProfileCheckboxContainer}>
                                        <Col>
                                            <FormGroup>
                                                <Label className={styles.LabelStyle}>
                                                    {key.charAt(0).toUpperCase() + key.slice(1)}{" "}
                                                    Permissions
                                                </Label>
                                                <Row>
                                                    {Object.keys(defaultPermissions).map((perm) => (
                                                        <Col key={perm}>
                                                            <FormGroup check>
                                                                <Label className={styles.ProfileCheckboxLabel} check for={`permission_${key}_${perm}`}>
                                                                    <Input
                                                                        className={styles.ProfileCheckbox}
                                                                        id={`permission_${key}_${perm}`}
                                                                        name={`permission_${key}_${perm}`}
                                                                        type="checkbox"
                                                                        checked={
                                                                            (formValues.permission as any)[key][
                                                                            perm as keyof PermissionSchema
                                                                            ]
                                                                        }
                                                                        onChange={(e) =>
                                                                            handlePermissionChange(
                                                                                e,
                                                                                key as keyof Profile["permission"],
                                                                                perm as keyof PermissionSchema
                                                                            )
                                                                        }
                                                                    />
                                                                    {perm.charAt(0).toUpperCase() + perm.slice(1)}
                                                                </Label>
                                                            </FormGroup>
                                                        </Col>
                                                    ))}
                                                </Row>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                ))}
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
export default AddProfile;