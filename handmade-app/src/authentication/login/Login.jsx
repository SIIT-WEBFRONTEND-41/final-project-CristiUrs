import { useContext, useEffect, useState } from "react";
import "./Login.css";
import { UserContext } from "../../UserContext";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState(null);
    const [error, setError] = useState("");
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    function register(event) {
        event.preventDefault();
        const body = {
            email,
            password,
        };

        setError(null);
        fetch("http://localhost:3004/login", {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                if (!response.ok) {
                    setError(response);
                    throw new Error("Date de autentificare incorecte");
                }
                return response.json();
            })
            .then((response) => {
                localStorage.setItem("access_token", JSON.stringify(response));
                setUser(response);
                navigate("/");
            })
            .catch((error) => {
                console.error("erroare de autentificare", error);
            });
    }

    useEffect(() => {
        function validatePassword(password) {
            const specialCharacters = ["*", "#", "!", "@"];

            if (password.length < 8) {
                setPasswordError(
                    "Your password must contain at least 7 characters and a symbol."
                );
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
        <main className="login">
            <div className="loginTitle">
                <h1>Login</h1>
            </div>
            <div>
                <p>Please enter your e-mail and password:</p>
            </div>
            <form onSubmit={register} className="formLogin">
                <fieldset className="box">
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        aria-describedby="emailHelp"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                    <label htmlFor="email" className="form-label">
                        Email
                    </label>
                </fieldset>
                <fieldset className="box">
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    <label htmlFor="password" className="form-label">
                        Password
                    </label>
                </fieldset>
                {error ? (
                    <div>
                        <p>Incorrect email or password. Please try again.</p>
                    </div>
                ) : (
                    ""
                )}
                {password ? (
                    <div className="passError">
                        <p className="passError">{passwordError}</p>
                    </div>
                ) : (
                    ""
                )}

                <button type="submit" className="btn btn-primary box">
                    Login
                </button>
            </form>
            <div>
                <p>
                    Don't have an account?{" "}
                    <Link to="/register">Create one</Link>
                </p>
            </div>
        </main>
    );
}
