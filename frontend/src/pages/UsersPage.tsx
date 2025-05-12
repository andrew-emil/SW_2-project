/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

interface User {
	id: number;
	username: string;
	password: string;
	email: string;
	role: string;
}

export default function UsersPage() {
	const navigate = useNavigate();
	const user = Cookies.get("user");
	useEffect(() => {
		if (!user) {
			navigate("/login");
		}
	}, [navigate, user]);

	const [users, setUsers] = useState<User[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const apiUrl = import.meta.env.VITE_USER_API;

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response = await axios.get<User[]>(`${apiUrl}/users`);
				setUsers(response.data);
			} catch (err: any) {
				setError(
					err.response?.data?.message || err.message || "Failed to load users"
				);
			} finally {
				setLoading(false);
			}
		};

		fetchUsers();
	}, [apiUrl]);

	const handleDelete = async (id: number) => {
		if (!window.confirm("Delete this user?")) return;
		try {
			await axios.delete(`${apiUrl}/users/${id}`);
			setUsers((prev) => prev.filter((u) => u.id !== id));
		} catch (err: any) {
			alert(
				err.response?.data?.message || err.message || "Failed to delete user"
			);
		}
	};

	return (
		<div className="d-flex">
			<Sidebar />

			<div className="col px-4 py-3 w-100">
				<h4 className="text-center p-2 m-3 h-color">User Management</h4>

				{loading && <p className="text-center">Loading users…</p>}
				{error && <div className="alert alert-danger text-center">{error}</div>}

				{!loading && !error && (
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
													className="btn-sm icons border-0 bg-transparent"
													onClick={() => handleDelete(user.id)}>
													<i className="bi bi-trash3 text-danger"></i>
												</button>
											</td>
										</tr>
									))
								) : (
									<tr>
										<td colSpan={4} className="text-center">
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
