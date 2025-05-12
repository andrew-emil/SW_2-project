/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Sidebar from "../components/Sidebar";
import type { LostFoundItem } from "../types/LostFoundItem";

export default function LostFoundListPage() {
	const navigate = useNavigate();
	const user = Cookies.get("user");
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
				const resp = await axios.get<LostFoundItem[]>(apiUrl);
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
	}, [apiUrl]);

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

	return (
		<div className="d-flex">
			<Sidebar />

			<div className="col px-4 py-3 w-100">
				<h5 className="text-center p-2 m-3">All Lost/Found Reported Items</h5>
				<div className="pb-4">
					<Link to="/report" className="btn btn-sm me-2">
						Report New Item
					</Link>
				</div>

				{loading && <p className="text-center">Loading items…</p>}
				{error && <div className="alert alert-danger text-center">{error}</div>}

				{!loading && !error && (
					<div className="table-responsive">
						<table className="table table-hover text-wrap">
							<thead>
								<tr>
									<th className="col-1">Type</th>
									<th className="col-2">Category</th>
									<th className="col-4">Title</th>
									<th className="col-2">Date</th>
									<th className="col-2">Location</th>
									<th className="text-center">Action</th>
								</tr>
							</thead>
							<tbody>
								{items.length > 0 ? (
									items.map((item) => (
										<tr key={item.id}>
											<td>{item.type}</td>
											<td>{item.category || "—"}</td>
											<td>{item.name}</td>
											<td>
												{new Date(item.lostFoundDate).toLocaleDateString()}
											</td>
											<td>{item.lostFoundLocation}</td>
											<td className="d-flex justify-content-center">
												<Link
													to={`/items/${item.id}`}
													className="btn-sm icons me-2">
													<i className="bi bi-eye text-primary" />
												</Link>
												<button
													className="btn-sm icons border-0 bg-transparent"
													onClick={() => handleDelete(item.id)}>
													<i className="bi bi-trash3 text-danger" />
												</button>
											</td>
										</tr>
									))
								) : (
									<tr>
										<td colSpan={6} className="text-center">
											No items reported.
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
