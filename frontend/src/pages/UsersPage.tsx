/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/contextProvider";

interface User {
  id: number;
  username: string;
  password: string;
  email: string;
  role: string;
}

export default function UsersPage() {
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const apiUrl = import.meta.env.VITE_USER_API;

  // Redirect if not authenticated or not an admin
  useEffect(() => {
    if (user === null) {
      navigate("/login");
    } else if (user?.role !== "ADMIN") {
      navigate("/");
    }
  }, [navigate, user]);

  // Fetch users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get<User[]>(`${apiUrl}/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data);
      } catch (err: any) {
        setError(handleError(err));
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [apiUrl, token]);

  const handleError = (err: any) => {
    return err.response?.data?.message || err.message || "Something went wrong!";
  };

  // Handle user deletion
  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete this user?")) return;

    try {
      await axios.delete(`${apiUrl}/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers((prev) => prev.filter((u) => u.id !== id)); // Remove deleted user from the list
    } catch (err: any) {
      alert(handleError(err));
    }
  };

  return (
    <div className="d-flex">
      <Sidebar username={user?.username} role={user?.role} />

      <div className="col px-4 py-3 w-100">
        <h4 className="text-center p-2 m-3 h-color">User Management</h4>

        {loading ? (
          <p className="text-center">Loading users…</p>
        ) : error ? (
          <div className="alert alert-danger text-center">{error}</div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover text-wrap">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>E-mail</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDelete(user.id)} // Trigger delete on click
                        >
						  Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="text-center">
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
