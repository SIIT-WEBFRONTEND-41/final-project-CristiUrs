import React, { useContext, useEffect, useState } from "react";
import { ItemsContext } from "../../ItemContext";

export default function MyProfile() {
    const [userInfo, setUserInfo] = useState({
        firstName: "",
        lastName: "",
        email: "",
        address: "",
    });
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isPasswordConfirmed, setIsPasswordConfirmed] = useState(true); // Adăugare stare pentru verificarea în timp real
    const [confirmPasswordMessage, setConfirmPasswordMessage] = useState(""); // Adăugare stare pentru mesajul de confirmare a parolei
    const [successMessageInfo, setSuccessMessageInfo] = useState(null);
    const [successMessagePassword, setSuccessMessagePassword] = useState(null);
    const [passwordError, setPasswordError] = useState(null);

    const userDetails = localStorage.getItem("access_token");
    const userId = JSON.parse(userDetails).user?.id;
    const token = JSON.parse(userDetails).accessToken;

    const SuccessMessage = ({ message }) => (
        <div className="succesMesage">{message}</div>
    );

    useEffect(() => {
        fetch(`http://localhost:3004/users/${userId}`)
            .then((response) => response.json())
            .then((userInfo) => {
                const { firstName, lastName, email, address } = userInfo;
                setUserInfo({ firstName, lastName, email, address });
            });
    }, []);

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        const isMatching = newPassword === confirmPassword;
        setIsPasswordConfirmed(isMatching);
        setConfirmPasswordMessage(
            isMatching ? "" : "The passwords do not match!"
        );
        setPassword(newPassword);
    };

    const handleConfirmPasswordChange = (e) => {
        const newConfirmPassword = e.target.value;

        const isMatching = password === newConfirmPassword;
        setIsPasswordConfirmed(isMatching);
        setConfirmPasswordMessage(
            isMatching ? "" : "The passwords do not match!"
        );

        setConfirmPassword(newConfirmPassword);
    };

    const handleSubmitInfo = (e) => {
        e.preventDefault();
        fetch(`http://localhost:3004/users/${userId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(userInfo),
        }).then(() => {
            setSuccessMessageInfo("Update was successful!");
            setTimeout(() => {
                setSuccessMessageInfo(null);
            }, 3000);
        });
    };

    const handleSubmitPassword = (e) => {
        e.preventDefault();

        if (password === confirmPassword) {
            fetch(`http://localhost:3004/users/${userId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ password: password }),
            }).then(() => {
                setSuccessMessagePassword("Password changed successfully!");
                setTimeout(() => {
                    setSuccessMessagePassword(null);
                }, 3000);
            });
        } else {
            alert("The passwords do not match!");
        }
    };

    useEffect(() => {
        function validatePassword(password) {
            const specialCharacters = ["*", "#", "!", "@"];

            if (password.length <= 7) {
                setPasswordError("Your password must have 7 characters.");
                return;
            }

            let hasSpecialCharacters = false;

            for (let character of password) {
                const hasCharacter = specialCharacters.includes(character);

                if (hasCharacter) {
                    hasSpecialCharacters = true;
                }
            }

            if (!hasSpecialCharacters) {
                setPasswordError(
                    "Password must have at least one character.",
                    specialCharacters
                );
            } else {
                setPasswordError(null);
            }
        }

        validatePassword(password);
    }, [password, setPasswordError]);

    return (
        <main className="createAccount">
            <div className="createTitle">
                <h3>Update your profile</h3>
            </div>
            <div>
                <p>Please fill in the information below:</p>
            </div>
            <form className="updateInfo" onSubmit={handleSubmitInfo}>
                <fieldset className="box mb3">
                    <input
                        className="form-control"
                        id="firstName"
                        type="text"
                        onChange={(e) =>
                            setUserInfo({
                                ...userInfo,
                                firstName: e.target.value,
                            })
                        }
                        value={userInfo?.firstName}
                    />
                    <label htmlFor="firstName" className="form-label">
                        Name
                    </label>
                </fieldset>
                <fieldset className="box mb3">
                    <input
                        className="form-control"
                        id="lastName"
                        type="text"
                        onChange={(e) =>
                            setUserInfo({
                                ...userInfo,
                                lastName: e.target.value,
                            })
                        }
                        value={userInfo?.lastName}
                    />
                    <label htmlFor="lastName" className="form-label">
                        Last name
                    </label>
                </fieldset>
                <fieldset className="box mb3">
                    <input
                        className="form-control"
                        id="email"
                        type="text"
                        onChange={(e) =>
                            setUserInfo({ ...userInfo, email: e.target.value })
                        }
                        value={userInfo?.email}
                    />
                    <label htmlFor="email" className="form-label">
                        Email
                    </label>
                </fieldset>
                <fieldset className="box mb3">
                    <input
                        className="form-control"
                        id="address"
                        type="text"
                        onChange={(e) =>
                            setUserInfo({
                                ...userInfo,
                                address: e.target.value,
                            })
                        }
                        value={userInfo?.address}
                    />
                    <label htmlFor="address" className="form-label">
                        Address
                    </label>
                </fieldset>
                <button className="btn btn-primary box">Submit</button>
                {successMessageInfo && (
                    <SuccessMessage message={successMessageInfo} />
                )}
            </form>
            <form className="updatePass" onSubmit={handleSubmitPassword}>
                <h1 className="titleForm">Change Password</h1>
                <fieldset className="box mb3">
                    <input
                        className="form-control"
                        id="password"
                        type="password"
                        onChange={handlePasswordChange}
                        value={password}
                    />
                    <label htmlFor="password" className="form-label">
                        New password
                    </label>
                </fieldset>
                {password && <p className="passError">{passwordError}</p>}
                <fieldset className="box mb3">
                    <input
                        className="form-control"
                        id="confirmPassword"
                        type="password"
                        onChange={handleConfirmPasswordChange}
                        value={confirmPassword}
                    />
                    <label htmlFor="confirmPassword" className="form-label">
                        Repeat the new password
                    </label>
                    {!isPasswordConfirmed && (
                        <div className="confirmPass">
                            {confirmPasswordMessage}
                        </div>
                    )}
                </fieldset>

                <button
                    className="btn btn-primary box"
                    disabled={!isPasswordConfirmed}
                >
                    Submit
                </button>
                {successMessagePassword && (
                    <SuccessMessage message={successMessagePassword} />
                )}
            </form>
        </main>
    );
}
