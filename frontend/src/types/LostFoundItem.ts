export interface LostFoundItem {
	id: number;
	type: "LOST" | "FOUND";
	name: string;
	lostFoundDate: string;
	lostFoundLocation: string;
	category?: string;
	description?: string;
	userId: number;
}