import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Response } from "src/shared/responder";
import { StateType } from "src/shared/state.enum";
import { getConnection } from "typeorm";
import { Person } from "../person/person.entity";
import { CreateProjectDto } from "./dto/createProject.dto";
import { UpdateProjectDto } from "./dto/updateProject.dto";
import { Project } from "./project.entity";
import { ProjectRepository } from "./project.repository";

@Injectable()
export class ProjectService {
	constructor(
		@InjectRepository(ProjectRepository)
		private readonly _repository: ProjectRepository
	) {}

	async create(personId: number, dto: CreateProjectDto) {
		const personRepo = await getConnection().getRepository(Person);
		const existPerson = await personRepo.findOne({
			where: { id: personId },
		});

		if (!existPerson) return new Response(4, ["Person not found"], {});

		var toSave = new Project();
		toSave.create(dto);
		toSave.owner = existPerson;

		await this._repository.save(toSave);

		return new Response(1, ["Project created"], {});
	}

	async getAllMyProjects(id: number) {
		const personRepo = await getConnection().getRepository(Person);
		const existPerson = await personRepo.findOne(id);

		if (!existPerson) return new Response(4, ["User not found"], {});

		const objs: Project[] = await this._repository.find({
			where: { owner: existPerson.id },
		});

		if (objs.length == 0)
			return new Response(4, ["You have cero projects"], objs);

		return new Response(1, ["Your projects"], objs);
	}

	async delete(id: number, isAdmin: boolean, userId: number) {
		const exist = await this._repository.findOne(id, {
			relations: ["owner"],
		});

		if (!exist) return new Response(4, ["Not found"], {});

		if (isAdmin) {
			await this._repository.delete(id);

			return new Response(1, ["Deleted succesful"], {});
		}

		if (userId != exist.owner.id) throw new UnauthorizedException();

		await this._repository.delete(id);

		return new Response(1, ["Deleted succesful"], {});
	}

	async update(id: number, updateObj: UpdateProjectDto, userId: number) {
		const property = await this._repository.findOne(id, {
			relations: ["owner"],
		});

		if (!property) return new Response(4, ["Not found"], {});

		if (userId != property.owner.id) throw new UnauthorizedException();

		if (property) {
			await this._repository.save({
				...property, // existing fields
				...updateObj, // updated fields
			});
			return new Response(1, ["Update succesful"], {});
		} else return new Response(4, ["Not found"], {});
	}

	async getAll() {
		const objs: Project[] = await this._repository.find();

		return objs;
	}

	async accept(id: number, userId: number) {
		const property = await this._repository.findOne(id, {
			relations: ["owner"],
		});

		if (property && property.state != StateType.ACTIVE) {
			var updateString = JSON.stringify(property);
			var updateObj = JSON.parse(updateString);
			updateObj.state = StateType.ACTIVE;

			await this._repository.save({
				...property, // existing fields
				...updateObj, // updated fields
			});

			if (userId != 1)
				await getConnection().query(`UPDATE person_roles SET "roleId" = 2 WHERE "personId" = ${userId};`);

			return new Response(1, ["State changed"], {});
		} else return new Response(4, ["Not found"], {});
	}
}
