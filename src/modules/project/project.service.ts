import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { getConnection } from "typeorm";
import { Person } from "../person/person.entity";
import { CreateProjectDto } from "./dto/createProject.dto";
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

		if (!existPerson) return null;

		var toSave = new Project()
		toSave.create(dto)
		toSave.owner = existPerson

		const saving: Project = await this._repository.save(dto);

		return saving;
	}

	async update(id: number, updateObj: Project) {
		const property = await this._repository.findOne({
			where: { id },
		});

		if (property) {
			return await this._repository.save({
				...property, // existing fields
				...updateObj, // updated fields
			});
		} else return null;
	}

	async delete(id: number, isAdmin: boolean, userId: number) {
		const exist = await this._repository.findOne(id, {
			relations: ["owner"],
		});

		if (!exist) return null;

		if (!isAdmin || userId != exist.owner.id) throw new UnauthorizedException();

		await this._repository.delete(id);
	}

	async get(id: number) {
		const obj: Project = await this._repository.findOne(id);
		return obj;
	}

	async getAll() {
		const objs: Project[] = await this._repository.find();

		return objs;
	}

	async getAllByUserId(id: number) {
		const personRepo = await getConnection().getRepository(Person);
		const existPerson = await personRepo.findOne(id);

		if (!existPerson) return null;

		const objs: Project[] = await this._repository.find({
			where: { owner: existPerson.id },
		});

		return objs;
	}
}
