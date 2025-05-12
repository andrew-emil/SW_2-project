import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import logo from "../assets/logo.png";
import axios from "axios";
import Cookies from "js-cookie";

function Login() {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [errorMsg, setErrorMsg] = useState<string>("");
	const navigate = useNavigate();

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setErrorMsg("");
		const apiUrl = import.meta.env.VITE_USER_API as string;

		try {
			const payload = {
				email,
				password,
			};
			const { data } = await axios.post(`${apiUrl}/auth/login`, payload);

			Cookies.set("user", data);

			navigate("/")
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			setErrorMsg(err.message || "Error in login");
		}
	};

	return (
		<div className="d-flex">
			<Sidebar />

			<div className="d-flex flex-column align-items-center justify-content-center p-2 vh-100 w-100">
				<div className="m-2 p-2 d-flex align-items-center">
					<img
						className="img-fluid"
						src={logo}
						alt="Logo"
						width={45}
						height={25}
					/>
					<span className="fs-5 fw-bold d-none d-sm-inline ms-2">
						Lost &amp; Found System
					</span>
				</div>

				<div className="card px-0" style={{ width: "20rem" }}>
					<div className="card-body">
						<h5 className="card-title text-center mb-3">Log In</h5>

						{errorMsg && (
							<div className="alert alert-danger text-center">{errorMsg}</div>
						)}
						

						<form onSubmit={handleSubmit}>
							<div className="mb-3">
								<div className="input-group input-group-sm">
									<input
										type="text"
										name="username"
										className="form-control"
										placeholder="Username"
										aria-label="Username"
										required
										value={email}
										onChange={(e) => setEmail(e.target.value)}
									/>
								</div>
							</div>

							<div className="mb-3">
								<div className="input-group input-group-sm">
									<input
										type="password"
										name="password"
										className="form-control"
										placeholder="Password"
										aria-label="Password"
										required
										value={password}
										onChange={(e) => setPassword(e.target.value)}
									/>
								</div>
							</div>

							<div className="mb-3">
								<button className="btn btn-primary btn-sm w-100" type="submit">
									Login
								</button>
							</div>
						</form>

						<div className="fs-15px text-center">
							Don’t have an account? <Link to="/register">Register Here</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Login;
