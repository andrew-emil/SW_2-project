/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import type { LostFoundItem } from "../types/LostFoundItem";
import { useAuth } from "../context/contextProvider";

export default function ItemDetailPage() {
	const navigate = useNavigate();
		const { user } = useAuth();
		useEffect(() => {
			if (!user) {
				navigate("/login");
			}
		}, [navigate, user]);

	const { id } = useParams<{ id: string }>();
	const [item, setItem] = useState<LostFoundItem | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!id) {
			setError("No item ID provided");
			setLoading(false);
			return;
		}

		const fetchItem = async () => {
			try {
				const resp = await axios.get<LostFoundItem>(`/api/lostfound/${id}`);
				setItem(resp.data);
			} catch (err: any) {
				setError(
					err.response?.data?.message || err.message || "Failed to load item"
				);
			} finally {
				setLoading(false);
			}
		};

		fetchItem();
	}, [id]);

	return (
		<div className="d-flex">
			<Sidebar username={user?.username} role={user?.role} />

			<div className="col px-4 py-3 w-100">
				{loading && <p className="text-center">Loading item…</p>}
				{error && <div className="alert alert-danger text-center">{error}</div>}

				{item && !loading && !error && (
					<>
						<h5 className="text-center p-2 m-3">Item Details</h5>
						<div className="card mx-auto" style={{ maxWidth: "30rem" }}>
							<div className="card-body">
								<h4 className="card-title">{item.name}</h4>
								<p className="card-text">
									<strong>Type: </strong> {item.type}
									<br />
									<strong>Category: </strong> {item.category || "—"}
									<br />
									<strong>Date: </strong>{" "}
									{new Date(item.lostFoundDate).toLocaleDateString()}
									<br />
									<strong>Location: </strong> {item.lostFoundLocation}
									<br />
									{item.description && (
										<>
											<strong>Description: </strong>
											<br />
											<span className="ms-3">{item.description}</span>
										</>
									)}
								</p>
								<div className="d-flex justify-content-between">
									<Link to="/items" className="btn btn-secondary btn-sm">
										Back to List
									</Link>
								</div>
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	);
}
