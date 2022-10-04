import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { getConnection } from "typeorm";
import { Role } from "../role/role.entity";
import { RoleRepository } from "../role/role.repository";
import { RoleType } from "../role/roletype.enum";
import { Person } from "./person.entity";
import { PersonRepository } from "./person.repository";
import { StateType } from "../../shared/state.enum";
import { Response } from "src/shared/responder";
import { genSalt, hash } from "bcryptjs";
import { UpdatePersonDto } from "./dto/updatePerson.dto";

@Injectable()
export class PersonService {
	constructor(
		@InjectRepository(PersonRepository)
		private readonly _personRepository: PersonRepository,
		@InjectRepository(RoleRepository)
		private readonly _roleRepository: RoleRepository
	) {}

	async getAll() {
		const people: Person[] = await this._personRepository.find();
		return people;
	}

	async getWaiting() {
		const people: Person[] = await this._personRepository.find({
			where: { state: StateType.WAITING },
		});

		return people;
	}

	async create(person: Person) {
		const repo = await getConnection().getRepository(Role);
		const defaultRole = await repo.findOne({
			where: { name: RoleType.GENERAL },
		});
		person.roles = [defaultRole];

		const savedPerson: Person = await this._personRepository.save(person);
		return savedPerson;
	}

	async acceptRequest(id: number) {
		const property = await this._personRepository.findOne({
			where: { id },
		});

		if (property && property.state != StateType.ACTIVE) {
			var updateString = JSON.stringify(property);
			var updateObj = JSON.parse(updateString);
			updateObj.state = StateType.ACTIVE;

			await this._personRepository.save({
				...property, // existing fields
				...updateObj, // updated fields
			});
			return new Response(1, ["State changed"], {});
		} else return new Response(4, ["Not found"], {});
	}

	async update(id: number, person: UpdatePersonDto) {
		const property = await this._personRepository.findOne({
			where: { id },
		});

		if (property) {
			const salt = await genSalt(10);

			var updateString = JSON.stringify(property);
			var updateObj = JSON.parse(updateString);

			if (person.displayname) updateObj.displayname = person.displayname;
			if (person.phone) updateObj.phone = person.phone;
			if (person.password)
				updateObj.password = await hash(person.password, salt);
			if (person.phone) updateObj.phone = person.phone;

			await this._personRepository.save({
				...property, // existing fields
				...updateObj, // updated fields
			});
			return new Response(1, ["Profile updated"], {});
		} else return new Response(4, ["Not found"], {});
	}

	async delete(id: number) {
		const personExist = await this._personRepository.findOne(id);

		if (!personExist) return new Response(4, ["Not found"], {});

		await this._personRepository.delete(id);
		
		return new Response(1, ["Deleted"], {});
	}

	async setRoleToPerson(personId: number, roleId: number) {
		const personExist = await this._personRepository.findOne(personId);

		if (!personExist) return new Response(3, ["Bad request"], {});

		const roleExist = await this._roleRepository.findOne(roleId);

		if (!roleExist) return new Response(3, ["Bad request"], {});

		personExist.roles.push(roleExist);
		await this._personRepository.save(personExist);

		return new Response(1, ["Role added"], {});
	}
}
