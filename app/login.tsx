"use client"
import React, { useState } from 'react'
import styles from './login.module.css'
import { Container } from 'reactstrap'
import { Form, Row, Col, FormGroup, Label, Input, Button } from 'reactstrap'
import Link from 'next/link'
import Image from 'next/image'
import { ErrorType } from '@/utils/utils'
import { useRouter } from "next/navigation";

const LoginPage = () => {

    const router = useRouter();

    const [errorWarning, setErrorWarning] = useState<ErrorType>({
        type: "success",
        message: "",
        open: false,
    });
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const payload = {
            email: data.get("email"),
            password: data.get("password"),
        };

        try {
            const url = process.env.NEXT_PUBLIC_API_URL
            const response = await fetch(`${url}/users/userLogin`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials:"include",
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error("Login failed");
            }

            const result = await response.json();
            console.log('✌️result --->', result);
            
            setErrorWarning({
                ...errorWarning,
                open: true,
                message: "Login successful!",
                type: "success",
            });

            const cookieURL = `/api/cookies`;
            const token = result.token;
            const cookieURLOptions = {
                method: "POST",
                credentials: "include",
                headers: {
                    authorization: token as string,
                    "Content-Type": "application/json",
                },
            } as RequestInit;
            const res = await fetch(cookieURL, cookieURLOptions);
            const cookieURLBody = await res.json();
            if (cookieURLBody.success) {
                router.push("/dashboard");
            }


        } catch (err) {
            console.error(err);

            setErrorWarning({
                ...errorWarning,
                open: true,
                message: "Login failed. Please check your email and password",
                type: "error",
            });
        }
    };

    return (
        <div className={styles.loginPageArea}>
            <div className={styles.logoSection}>
                <Image src={"/dark_logo.svg"} height={50} width={175} alt='' />
            </div>
            <div className='main-banner-area' style={{ flex: 1 }}>
                <div className={styles.loginFlexSection} >
                    <div className={styles.loginLeft}>
                        <Image src={"/images/login/login_banner.svg"} height={600} width={800} alt='' />
                    </div>
                    <div className={styles.loginForm}>
                        <Form onSubmit={handleSubmit}>
                            <div >
                                <div className={styles.LoginHeading}>Finvia Dashboard Login!</div>
                            </div>

                            <Row>

                                <Col lg={12} md={12} sm={12}>
                                    <FormGroup>
                                        <Label className={styles.LabelStyle}>Enter Email</Label>
                                        <Input className={styles.InputStyle}
                                            id='email'
                                            name='email'
                                            placeholder='Email'
                                            type='email' />
                                    </FormGroup>
                                </Col>

                                <Col lg={12} md={12} sm={12}>
                                    <FormGroup>
                                        <Label className={styles.LabelStyle}>Enter Password</Label>
                                        <Input className={styles.InputStyle}
                                            id='password'
                                            name='password'
                                            placeholder='Password' type='password' />
                                    </FormGroup>
                                </Col>

                                <Col className='text-center' lg={12} md={12} sm={12}>
                                    <Button type="submit" className={styles.BlueBtn}>Login</Button>
                                </Col>

                            </Row>
                        </Form>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default LoginPage