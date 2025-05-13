import { useState, type ChangeEvent, type FormEvent } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import logo from "../assets/logo.png";

interface FormState {
  username: string;
  password: string;
  confirmedPassword: string;
  email: string;
}

function Register() {
  const [form, setForm] = useState<FormState>({
    username: "",
    password: "",
    confirmedPassword: "",
    email: "",
  });
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Check if passwords match
    if (form.password !== form.confirmedPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const apiUrl = import.meta.env.VITE_USER_API as string;
      const payload = {
        username: form.username,
        email: form.email,
        password: form.password,
      };

      await axios.post(`${apiUrl}/auth/register`, payload);
      setSuccess("Registration successful! Please login to access all features.");
    } catch (err: any) {
      setError(err.message || "Unknown Error");
      console.log(err);
    }
  };

  return (
    <div className="d-flex">
      <div className="d-flex flex-column align-items-center justify-content-center p-2 vh-100 w-100">
        <div className="m-2 p-2 d-flex align-items-center">
          <img className="img-fluid" src={logo} alt="Logo" width={45} height={25} />
          <span className="fs-5 fw-bold d-none d-sm-inline ms-2">Lost &amp; Found System</span>
        </div>

        <div className="card px-0" style={{ width: "24rem" }}>
          <div className="card-body">
            <h5 className="card-title text-center mb-3">Registration Form</h5>

            {error && <div className="alert alert-danger text-center">{error}</div>}
            {success && <div className="alert alert-success text-center" dangerouslySetInnerHTML={{ __html: success }} />}

            <form className="needs-validation px-3" noValidate onSubmit={handleSubmit}>
              {[
                { name: "username", type: "text", placeholder: "Username" },
                { name: "password", type: "password", placeholder: "Password" },
                { name: "confirmedPassword", type: "password", placeholder: "Confirm Password" },
                { name: "email", type: "email", placeholder: "E-mail" },
              ].map((field) => (
                <div className="row mb-3" key={field.name}>
                  <div className="col input-group input-group-sm">
                    <input
                      className="form-control"
                      type={field.type}
                      name={field.name}
                      placeholder={field.placeholder}
                      aria-label={field.placeholder}
                      required
                      value={form[field.name as keyof FormState]}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              ))}

              <div className="row mb-3">
                <div className="col">
                  <button className="btn btn-success btn-sm w-100" type="submit">
                    Create Account
                  </button>
                </div>
              </div>
            </form>

            <div className="fs-15px text-center">
              Already have an account? <Link to="/login">Login Here</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
