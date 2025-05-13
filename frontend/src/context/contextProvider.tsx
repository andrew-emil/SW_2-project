import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	useMemo,
	type ReactNode,
} from "react";
import Cookies from "js-cookie";
import type { User } from "../types/User";

interface AuthContextType {
	user: User | null;
	token: string | null;
	setUser: (user: User | null) => void;
	setToken: (token: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
	children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [token, _setToken] = useState<string | null>(() => {
		if (typeof window === "undefined") return null;
		return Cookies.get("ACCESS_TOKEN") || null;
	});

	const [user, _setUser] = useState<User | null>(() => {
		if (typeof window === "undefined") return null;
		try {
			const stored = localStorage.getItem("USER");
			return stored ? JSON.parse(stored) : null;
		} catch {
			return null;
		}
	});

	useEffect(() => {
		if (token) {
			Cookies.set("ACCESS_TOKEN", token, {
				expires: 30,
				secure: true,
				sameSite: "Lax",
				path: "/",
			});
		} else {
			Cookies.remove("ACCESS_TOKEN");
		}
	}, [token]);

	useEffect(() => {
		if (user) {
			localStorage.setItem("USER", JSON.stringify(user));
		} else {
			localStorage.removeItem("USER");
		}
	}, [user]);

	const setToken = (t: string | null) => {
		_setToken(t);
	};

	const setUser = (u: User | null) => {
		_setUser(u);
	};

	const value = useMemo<AuthContextType>(
		() => ({ user, token, setUser, setToken }),
		[user, token]
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth(): AuthContextType {
	const ctx = useContext(AuthContext);
	if (!ctx) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return ctx;
}
