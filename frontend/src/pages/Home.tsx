import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import type { LostFoundItem } from "../types/LostFoundItem";
import { useAuth } from "../context/contextProvider";

function Home() {
	const navigate = useNavigate();
	const { user } = useAuth();
	useEffect(() => {
		if (!user) {
			navigate("/login");
		}
	}, [navigate, user]);

	const [items, setItems] = useState<LostFoundItem[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchItems = async () => {
			const apiUrl = import.meta.env.VITE_LOST_FOUND_API as string;
			try {
				const res = await fetch(`${apiUrl}`);
				if (!res.ok) throw new Error(`Server error: ${res.status}`);
				const data: LostFoundItem[] = await res.json();
				setItems(data);

				// eslint-disable-next-line @typescript-eslint/no-explicit-any
			} catch (err: any) {
				setError(err.message || "Unknown error");
			} finally {
				setLoading(false);
			}
		};

		fetchItems();
	}, [user]);

	return (
		<div className="container-fluid">
			<div className="row flex-nowrap">
				<Sidebar username={user?.username} role={user?.role}/>

				<div className="container-fluid" id="main">
					<div className="row">
						<div className="col">
							<div className="d-flex flex-wrap justify-content-center p-4">
								<h1 className="align-center p-3 m-3">
									Your Lost &amp; Found Items
								</h1>
							</div>

							{loading && <p className="text-center">Loading items…</p>}
							{error && (
								<div className="alert alert-danger text-center">{error}</div>
							)}

							<div className="d-flex flex-wrap justify-content-center gap-4">
								{items.map((item) => (
									<div
										className="card border-dark"
										style={{ width: "18rem" }}
										key={item.id}>
										<div className="card-body">
											<h5 className="card-title">{item.name}</h5>
											<h6 className="card-subtitle mb-2 text-muted">
												{item.type === "LOST" ? "Lost on" : "Found on"}{" "}
												{new Date(item.lostFoundDate).toLocaleDateString()}
											</h6>
											<p className="card-text">
												<strong>Location:</strong> {item.lostFoundLocation}
												<br />
												{item.category && (
													<>
														<strong>Category:</strong> {item.category}
														<br />
													</>
												)}
												{item.description && (
													<>
														<strong>Description:</strong> {item.description}
													</>
												)}
											</p>
											<Link
												to={`/items/${item.id}`}
												className="btn btn-sm btn-primary">
												View Details
											</Link>{" "}
										</div>
									</div>
								))}
								{!loading && items.length === 0 && (
									<p className="text-center">No items to display.</p>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Home;
