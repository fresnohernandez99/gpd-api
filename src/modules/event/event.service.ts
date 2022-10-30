import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Response } from "src/shared/responder";
import { getConnection } from "typeorm";
import { Person } from "../person/person.entity";
import { Project } from "../project/project.entity";
import { CreateEventDto } from "./dto/createEvent.dto";
import { UpdateEventDto } from "./dto/updateEvent.dto";
import { Event } from "./event.entity";
import { EventRepository } from "./event.repository";

@Injectable()
export class EventService {
	constructor(
		@InjectRepository(EventRepository)
		private readonly _repository: EventRepository
	) {}

	async create(personId: number, projectId: number, dto: CreateEventDto) {
		const personRepo = await getConnection().getRepository(Person);
		const existPerson = await personRepo.findOne({
			where: { id: personId },
		});

		if (!existPerson) return new Response(4, ["Person not found"], {});

		const projectRepo = await getConnection().getRepository(Project);
		const existProject = await projectRepo.findOne({
			where: { id: projectId, owner: existPerson },
		});

		if (!existProject) return new Response(4, ["Project not found"], {});

		var toSave = new Event();
		toSave.create(dto);
		toSave.project = existProject;

		await this._repository.save(toSave);

		return new Response(1, ["Event created"], {});
	}

	async getEventsByProject(personId: number, projectId: number) {
		const personRepo = await getConnection().getRepository(Person);
		const existPerson = await personRepo.findOne({
			where: { id: personId },
		});

		if (!existPerson) return new Response(4, ["Person not found"], {});

		const projectRepo = await getConnection().getRepository(Project);
		const existProject = await projectRepo.findOne(projectId, {
			relations: ["owner"],
		});

		if (!existProject || existProject.owner.id != personId)
			return new Response(4, ["Project not found"], {});

		const objs: Event[] = await this._repository.find({
			where: { project: projectId },
		});

		if (objs.length == 0) return new Response(4, ["Events not found"], objs);

		return new Response(1, ["Events:"], objs);
	}

	async delete(
		personId: number,
		projectId: number,
		eventId: number,
		isAdmin: boolean
	) {
		if (isAdmin) {
			await this._repository.delete(eventId);

			return new Response(1, ["Deleted succesful"], {});
		}

		const personRepo = await getConnection().getRepository(Person);
		const existPerson = await personRepo.findOne({
			where: { id: personId },
		});

		if (!existPerson) return new Response(4, ["Person not found"], {});

		const projectRepo = await getConnection().getRepository(Project);
		const existProject = await projectRepo.findOne({
			where: { id: projectId },
		});

		if (existProject) {
			if (personId != existProject.owner.id) throw new UnauthorizedException();

			await this._repository.delete(eventId);

			return new Response(1, ["Deleted succesful"], {});
		}

		return new Response(4, ["Project not found"], {});
	}

	async update(
		personId: number,
		projectId: number,
		eventId: number,
		dto: UpdateEventDto
	) {
		const personRepo = await getConnection().getRepository(Person);
		const existPerson = await personRepo.findOne({
			where: { id: personId },
		});

		if (!existPerson) return new Response(4, ["Person not found"], {});

		const projectRepo = await getConnection().getRepository(Project);
		const existProject = await projectRepo.findOne({
			where: { id: projectId },
		});

		if (!existProject) return new Response(4, ["Project not found"], {});

		const property = await this._repository.findOne(eventId, {
			relations: ["project"],
		});

		if (property.project.id != projectId) throw new UnauthorizedException();

		if (property) {
			await this._repository.save({
				...property, // existing fields
				...dto, // updated fields
			});
			return new Response(1, ["Update succesful"], {});
		} else return new Response(4, ["Not found"], {});
	}
}
