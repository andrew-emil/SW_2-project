import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import type { RoleEnum } from "../types/RoleEnum";
import { useAuth } from "../context/contextProvider";

interface SidebarProps {
	username: string | undefined;
	role: RoleEnum | undefined;
}

function Sidebar({ username, role }: SidebarProps) {
	const { setUser, setToken } = useAuth();

	const logout = () => {
		setUser(null);
		setToken(null);
		
	};






	
	return (
		<div className="col-auto col-md-3 col-xl-2 px-sm-2" id="sidebar">
			<div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-3 min-vh-100">
				{/* Logo + App Name */}
				<div
					className="d-flex align-items-center pb-3 me-md-auto"
					style={{ width: "100%" }}>
					<img
						className="img-fluid ms-2"
						src={logo}
						alt="Logo"
						width="40"
						height="40"
					/>
					<span className="fs-5 d-none d-sm-inline ms-3">Lost &amp; Found</span>
				</div>

				{/* Display logged-in user */}
				<div className="pb-3 w-100">
					<strong className="d-none d-sm-inline">Hello, {username}!</strong>
				</div>

				{/* Navigation */}
				<ul
					className="nav nav-pills flex-column mb-sm-auto align-items-center align-items-sm-start"
					id="menu">
					<li className="nav-item">
						<Link to="/" className="nav-link px-0 align-middle">
							<i className="fs-4 bi bi-house-door"></i>
							<span className="ms-1 d-none d-sm-inline">Home</span>
						</Link>
					</li>
					<li>
						<Link to="/user/items" className="nav-link px-0 align-middle">
							<i className="fs-4 bi-list-ol"></i>
							<span className="ms-1 d-none d-sm-inline">My Items</span>
						</Link>
					</li>
					<li>
						<Link to="/items/add" className="nav-link px-0 align-middle">
							<i className="fs-4 bi-file-text"></i>
							<span className="ms-1 d-none d-sm-inline">Report New Item</span>
						</Link>
					</li>
					{role === "ADMIN" && (
						<li>
							<Link to="/users" className="nav-link px-0 align-middle">
								<i className="fs-4 bi-people"></i>
								<span className="ms-1 d-none d-sm-inline">User Management</span>
							</Link>
						</li>
					)}
					{role === "ADMIN" && (
						<li>
							<Link to="/items" className="nav-link px-0 align-middle">
								<i className="fs-4 bi-people"></i>
								<span className="ms-1 d-none d-sm-inline">Pending Reports</span>
							</Link>
						</li>
					)}
					<li>
							<button onClick={logout} className="nav-link px-0 align-middle">
								<i className="fs-4 bi-people"></i>
								<span className="ms-1 d-none d-sm-inline">logout</span>
							</button>
					</li>
				</ul>
			</div>
		</div>
	);
}

export default Sidebar;
