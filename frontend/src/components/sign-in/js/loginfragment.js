import React, { useState } from "react";
import bgImage from '../images/bg-01.jpg';
import favicon from "../images/icons/favicon.ico";
import "../vendor/bootstrap/css/bootstrap.min.css";
import "../fonts/font-awesome-4.7.0/css/font-awesome.min.css";
import "../fonts/iconic/css/material-design-iconic-font.min.css";
import "../vendor/animate/animate.css";
import "../vendor/css-hamburgers/hamburgers.min.css";
import "../vendor/animsition/css/animsition.min.css";
import "../vendor/select2/select2.min.css";
import "../vendor/daterangepicker/daterangepicker.css";
import "../css/util.css";
import "../css/main.css";
const LoginForm = () => {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [validationErrors, setValidationErrors] = useState({ username: false, password: false });

    const handleBlur = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const validateInput = (name, value) => {
        if (name === "username" || name === "password") {
            return value.trim() !== "";
        }
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = {};
        let isValid = true;

        Object.keys(formData).forEach((key) => {
            const isValidField = validateInput(key, formData[key]);
            errors[key] = !isValidField;
            if (!isValidField) isValid = false;
        });

        setValidationErrors(errors);

        if (isValid) {
            console.log("Form submitted successfully:", formData);
            // Proceed with form submission logic (e.g., API call)
        }
    };

    const handleFocus = (name) => {
        setValidationErrors((prevErrors) => ({
            ...prevErrors,
            [name]: false,
        }));
    };

    return (
        <>
            <div className="limiter">
                <div
                    className="container-login100"
                    style={{ backgroundImage: `url(${bgImage})` }}
                >
                    <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
                        <form className="login100-form validate-form" onSubmit={handleSubmit}>
                            <span className="login100-form-title p-b-49">Login</span>

                            <div
                                className={`wrap-input100 validate-input m-b-23 ${
                                    validationErrors.username ? "alert-validate" : ""
                                }`}
                            >
                                <span className="label-input100">Username</span>
                                <input
                                    className="input100"
                                    type="text"
                                    name="username"
                                    placeholder="Type your username"
                                    value={formData.username}
                                    onBlur={handleBlur}
                                    onFocus={() => handleFocus("username")}
                                    onChange={(e) =>
                                        setFormData((prev) => ({ ...prev, username: e.target.value }))
                                    }
                                />
                                <span className="focus-input100" data-symbol="&#xf206;"></span>
                            </div>

                            <div
                                className={`wrap-input100 validate-input ${
                                    validationErrors.password ? "alert-validate" : ""
                                }`}
                            >
                                <span className="label-input100">Password</span>
                                <input
                                    className="input100"
                                    type="password"
                                    name="password"
                                    placeholder="Type your password"
                                    value={formData.password}
                                    onBlur={handleBlur}
                                    onFocus={() => handleFocus("password")}
                                    onChange={(e) =>
                                        setFormData((prev) => ({ ...prev, password: e.target.value }))
                                    }
                                />
                                <span className="focus-input100" data-symbol="&#xf190;"></span>
                            </div>

                            <div className="text-right p-t-8 p-b-31">
                                <a href="#">Forgot password?</a>
                            </div>

                            <div className="container-login100-form-btn">
                                <div className="wrap-login100-form-btn">
                                    <div className="login100-form-bgbtn"></div>
                                    <button className="login100-form-btn" type="submit">
                                        Login
                                    </button>
                                </div>
                            </div>

                            {/*<div className="txt1 text-center p-t-54 p-b-20">*/}
                            {/*    <span>Or Sign Up Using</span>*/}
                            {/*</div>*/}

                            <div className="flex-c-m">
                                <a href="#" className="login100-social-item bg1">
                                    <i className="fa fa-facebook"></i>
                                </a>
                                <a href="#" className="login100-social-item bg2">
                                    <i className="fa fa-twitter"></i>
                                </a>
                                <a href="#" className="login100-social-item bg3">
                                    <i className="fa fa-google"></i>
                                </a>
                            </div>

                            <div className="flex-col-c p-t-155">
                                <span className="txt1 p-b-17">Or Sign Up Using</span>
                                <a href="#" className="txt2">
                                    Sign Up
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginForm;
