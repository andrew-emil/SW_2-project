/* eslint-disable @typescript-eslint/no-explicit-any */
import  { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import type { LostFoundItem } from "../types/LostFoundItem";
import { useAuth } from "../context/contextProvider";

export default function MyItemsPage(){
	const navigate = useNavigate();
	const { user } = useAuth();
		useEffect(() => {
			if (!user) {
				navigate("/login");
			}
		}, [navigate, user]);

    const apiUrl = import.meta.env.VITE_LOST_FOUND_API as string;

	const [items, setItems] = useState<LostFoundItem[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchItems = async () => {
			try {
				const resp = await axios.get<LostFoundItem[]>(
					`${apiUrl}/${user?.id}`
				);
				setItems(resp.data);
			} catch (err: any) {
				setError(
					err.response?.data?.message || err.message || "Failed to load items"
				);
			} finally {
				setLoading(false);
			}
		};
		fetchItems();
	}, [apiUrl, user?.id]);

	const handleDelete = async (id: number) => {
		if (!window.confirm("Are you sure you want to delete this item?")) return;
		try {
			await axios.delete(`${apiUrl}/${id}`);
			setItems((prev) => prev.filter((item) => item.id !== id));
		} catch (err: any) {
			alert(
				err.response?.data?.message || err.message || "Failed to delete item"
			);
		}
	};

	const handleMarkFound = async (id: number) => {
		try {
			await axios.put(`${apiUrl}/${id}`);
			setItems((prev) =>
				prev.map((item) => (item.id === id ? { ...item, type: "FOUND" } : item))
			);
		} catch (err: any) {
			alert(
				err.response?.data?.message ||
					err.message ||
					"Failed to mark item as found"
			);
		}
	};

	return (
		<div className="d-flex">
			<Sidebar username={user?.username} role={user?.role} />

			<div className="col px-4 py-3 w-100">
				<h4 className="text-center p-2 m-3">My Items</h4>
				{loading && <p className="text-center">Loading items…</p>}
				{error && <div className="alert alert-danger text-center">{error}</div>}

				{!loading && !error && (
					<div className="table-responsive">
						<table className="table table-hover text-wrap">
							<thead>
								<tr>
									<th>Type</th>
									<th>Title</th>
									<th>Date</th>
									<th>Location</th>
									<th className="text-center">Actions</th>
								</tr>
							</thead>
							<tbody>
								{items.length > 0 ? (
									items.map((item) => (
										<tr key={item.id}>
											<td>{item.type}</td>
											<td>{item.name}</td>
											<td>
												{new Date(item.lostFoundDate).toLocaleDateString()}
											</td>
											<td>{item.lostFoundLocation}</td>
											<td className="d-flex justify-content-center gap-2">
												<button
													className="btn btn-sm btn-danger"
													onClick={() => handleDelete(item.id)}>
													Delete
												</button>
												{item.type === "LOST" && (
													<button
														className="btn btn-sm btn-success"
														onClick={() => handleMarkFound(item.id)}>
														Mark as Found
													</button>
												)}
											</td>
										</tr>
									))
								) : (
									<tr>
										<td colSpan={5} className="text-center">
											You have no reported items.
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
