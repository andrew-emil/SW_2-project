import type { RoleEnum } from "./RoleEnum";

export interface User {
	id: string;
	username: string;
	role: RoleEnum;
}
