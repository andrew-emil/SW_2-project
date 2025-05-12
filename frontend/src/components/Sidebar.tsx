import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

function Sidebar() {
	return (
		<div className="col-auto col-md-3 col-xl-2 px-sm-2" id="sidebar">
			<div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-3 min-vh-100">
				<div
					className="d-flex align-items-center pb-3 me-md-auto "
					style={{ width: "100%" }}>
					<img
						className="img-fluid ms-2"
						src={logo}
						alt="Logo"
						width="40"
						height="40"
					/>
					<span className="fs-5 d-none d-sm-inline ms-3">Lost & Found</span>
				</div>
				<ul
					className="nav nav-pills flex-column mb-sm-auto align-items-center align-items-sm-start"
					id="menu">
					<li className="nav-item">
						<Link to="/" className="nav-link px-0 align-middle">
							<i className="fs-4 bi bi-house-door"></i>{" "}
							<span className="ms-1 d-none d-sm-inline">Home</span>
						</Link>
					</li>
					<li>
						<a
							href="../LostFound/allLostFound.html"
							className="nav-link px-0 align-middle">
							<i className="fs-4 bi-list-ol"></i>{" "}
							<span className="ms-1 d-none d-sm-inline">All Items</span>
						</a>
					</li>
					<li>
						<a
							href="../LostFound/lostFoundForm.html"
							className="nav-link px-0 align-middle">
							<i className="fs-4 bi-file-text"></i>{" "}
							<span className="ms-1 d-none d-sm-inline">Report New Item</span>
						</a>
					</li>
					<li>
						<a
							href="../admin/allUsers.html"
							className="nav-link px-0 align-middle">
							<i className="fs-4 bi-people"></i>{" "}
							<span className="ms-1 d-none d-sm-inline">User Management</span>{" "}
						</a>
					</li>
					<li>
						<a href="" className="nav-link px-0 align-middle">
							<i className="fs-4 bi-box-arrow-right"></i>{" "}
							<span className="ms-1 d-none d-sm-inline">Log Out</span>{" "}
						</a>
					</li>
				</ul>
			</div>
		</div>
	);
}

export default Sidebar;
