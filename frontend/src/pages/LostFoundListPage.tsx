/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import type { LostFoundItem } from "../types/LostFoundItem";
import { useAuth } from "../context/contextProvider";

export default function LostFoundListPage() {
	const navigate = useNavigate();
	const { user } = useAuth();
	useEffect(() => {
		if (!user) {
			navigate("/login");
		}
		if (user?.role !== "ADMIN") {
			navigate("/");
		}
	}, [navigate, user]);

	const apiUrl = import.meta.env.VITE_LOST_FOUND_API as string;
	const [items, setItems] = useState<LostFoundItem[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState<string>("");

	useEffect(() => {
		const fetchItems = async () => {
			try {
				const resp = await axios.get<LostFoundItem[]>(`${apiUrl}/pending`);
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

	const onApproveOrReject = async (id: number, isApproved: boolean) => {
		try {
			const { data } = await axios.patch(`${apiUrl}/${id}`, {
				isApproved,
			});
			setItems((prev) => prev.filter((item) => item.id !== id));
			setSuccess(data);
		} catch (err: any) {
			alert(
				err.response?.data?.message || err.message || "Failed to delete item"
			);
		}
	};

	return (
		<div className="d-flex">
			<Sidebar username={user?.username} role={user?.role} />

			<div className="col px-4 py-3 w-100">
				<h5 className="text-center p-2 m-3">
					All Lost/Found Pending Reported Items
				</h5>
				<div className="pb-4">
					<Link to="/report" className="btn btn-sm me-2">
						Report New Item
					</Link>
				</div>

				{loading && <p className="text-center">Loading items…</p>}
				{error && <div className="alert alert-danger text-center">{error}</div>}
				{success && (
					<div className="alert alert-success text-center">{success}</div>
				)}

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
												<button
													onClick={() => onApproveOrReject(item.id, true)}>
													Approve
												</button>
												<button
													onClick={() => onApproveOrReject(item.id, false)}>
													Reject
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
