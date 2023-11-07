import { useEffect, useState } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [passwordError, setPasswordError] = useState(null);
    const navigate = useNavigate();
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    function register(event) {
        event.preventDefault();
        const body = {
            email,
            password,
            firstName,
            lastName,
        };

        fetch("http://localhost:3004/register", {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "content-type": "application/json",
            },
        }).then((response) => {
            if (response.ok) {
                setShowSuccessMessage(true);
                setTimeout(() => {
                    setShowSuccessMessage(false);
                    navigate("/login");
                }, 3000);
            }
        });
    }

    useEffect(() => {
        function validatePassword(password) {
            const specialCharacters = ["*", "#", "!", "@"];

            if (password <= 8) {
                setPasswordError("Password must be at least 8 characters.");
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
                    "Your password must have at least one character.",
                    specialCharacters
                );
            } else {
                setPasswordError(null);
            }
        }

        validatePassword(password);
    }, [password]);

    return (
        <main className="createAccount">
            <div className="">
                <h3>Register</h3>
            </div>
            <div>
                <p>Please fill in the information below:</p>
            </div>
            <form onSubmit={register} className="formRegister">
                <fieldset className="form__input">
                    <label htmlFor="firstName">First Name:</label>
                    <input
                        type="text"
                        id="firstName"
                        placeholder="First name"
                        name="firstName"
                        value={firstName}
                        onChange={(event) => setFirstName(event.target.value)}
                    />
                </fieldset>
                <fieldset className="form__input">
                    <label htmlFor="lastName">Last Name:</label>
                    <input
                        type="text"
                        id="lastName"
                        placeholder="Last name"
                        name="lastName"
                        value={lastName}
                        onChange={(event) => setLastName(event.target.value)}
                    />
                </fieldset>
                <fieldset className="form__input">
                    <label htmlFor="email" className="form-label">
                        Email address
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        aria-describedby="emailHelp"
                        name="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </fieldset>
                <fieldset className="form__input">
                    <label htmlFor="password" className="form-label">
                        Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </fieldset>

                {passwordError && <p>{passwordError}</p>}

                <button type="submit" className="btn btn-primary form__input">
                    Create my account
                </button>
            </form>
            {showSuccessMessage && (
                <div>
                    <p>
                        The account was created successfully. You can login now.
                    </p>
                </div>
            )}
        </main>
    );
}
