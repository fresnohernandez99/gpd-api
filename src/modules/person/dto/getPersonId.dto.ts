import { IsNotEmpty } from "class-validator";
import { Role } from "src/modules/role/role.entity";
import { Person } from "../person.entity";

export class GetPersonIdDto {
	@IsNotEmpty()
	id: number;

	@IsNotEmpty()
	displayname: string;

	@IsNotEmpty()
	phone: string;

	photo: string;

	@IsNotEmpty()
	roles: Role[];

	constructor(person: Person){
		this.id = person.id

		this.displayname = person.displayname;

		this.phone = person.phone;

		this.roles = person.roles;

		this.photo = person.photo;
	}
}
