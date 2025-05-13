/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, type FormEvent, type ChangeEvent, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import type { LostFoundItem } from "../types/LostFoundItem";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/contextProvider";

export default function ReportFormPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [navigate, user]);

  const apiUrl = import.meta.env.VITE_LOST_FOUND_API as string;

  const [form, setForm] = useState<{
    type: "LOST" | "FOUND";
    category: string;
    name: string;
    lostFoundDate: string;
    lostFoundLocation: string;
    description: string;
  }>({
    type: "LOST",
    category: "",
    name: "",
    lostFoundDate: "",
    lostFoundLocation: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    // Ensure the date is in the correct format (yyyy-MM-dd)
    const formattedDate = new Date(form.lostFoundDate).toISOString().split("T")[0];  // Format to yyyy-MM-dd

    const updatedForm = {
      name: form.name,
      date: formattedDate,  // Use 'date' instead of 'lostFoundDate'
      location: form.lostFoundLocation,
      category: form.category,
      description: form.description,
    };

    try {
      // Make the API call with updated form data, including the userId in the query params
      await axios.post<LostFoundItem>(`${apiUrl}?userId=${user?.id}`, updatedForm);
      setSuccess(true);
      setForm({
        category: "",
        name: "",
        lostFoundDate: "",
        lostFoundLocation: "",
        description: "",
      });
    } catch (err: any) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex">
      <Sidebar username={user?.username} role={user?.role} />

      <div className="col px-4 py-3 w-100">
        <h5 className="text-center p-2 m-3">Report Form</h5>
        <div className="d-flex flex-column align-items-center mb-3">
          <div className="card p-3" style={{ width: "30rem" }}>
            <div className="card-body">
              {/* Success & Error Alerts */}
              {success && (
                <div className="alert alert-success">Report submitted! 🎉</div>
              )}
              {error && <div className="alert alert-danger">{error}</div>}

              <form className="needs-validation" noValidate onSubmit={handleSubmit}>
                <h6>Item Information</h6>

                {/* Category Select */}
                <div className="mb-3">
                  <select
                    name="category"
                    className="form-select form-select-sm"
                    value={form.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Category</option>
                    <option value="ELECTRONIC">Electronics</option>
                    <option value="DOCUMENT">Document</option>
                    <option value="ACCESSORIES">Accessories</option>
                    <option value="CLOTHING">Clothes</option>
                    <option value="JEWELLERY">Jewellery</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>

                {/* Title */}
                <div className="mb-3">
                  <input
                    type="text"
                    name="name"
                    className="form-control form-control-sm"
                    placeholder="Title"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Date */}
                <div className="mb-3">
                  <div className="input-group input-group-sm">
                    <input
                      type="date"
                      name="lostFoundDate"
                      className="form-control"
                      value={form.lostFoundDate}
                      onChange={handleChange}
                      required
                    />
                    <span className="input-group-text">
                      <i className="bi bi-calendar-event" />
                    </span>
                  </div>
                </div>

                {/* Location */}
                <div className="mb-3">
                  <div className="input-group input-group-sm">
                    <input
                      type="text"
                      name="lostFoundLocation"
                      className="form-control"
                      placeholder="Lost/Found Location"
                      value={form.lostFoundLocation}
                      onChange={handleChange}
                      required
                    />
                    <span className="input-group-text">
                      <i className="bi bi-geo-alt" />
                    </span>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-3">
                  <textarea
                    name="description"
                    className="form-control form-control-sm"
                    placeholder="Detail Description"
                    rows={3}
                    value={form.description}
                    onChange={handleChange}
                  />
                </div>

                {/* Submit */}
                <div className="col">
                  <button
                    className="btn btn-primary btn-sm w-100"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Saving…" : "Save"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
