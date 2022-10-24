import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Response } from "src/shared/responder";
import { getConnection } from "typeorm";
import { Person } from "../person/person.entity";
import { Project } from "../project/project.entity";
import { CreateEventDto } from "./dto/createEvent.dto";
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

	async getEventsByProject(projectId: number) {
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
			if (isAdmin) {
				await this._repository.delete(eventId);

				return new Response(1, ["Deleted succesful"], {});
			} else {
				if (personId != existProject.owner.id)
					throw new UnauthorizedException();

				await this._repository.delete(eventId);

				return new Response(1, ["Deleted succesful"], {});
			}
		}

        return new Response(4, ["Project not found"], {});
	}
}
