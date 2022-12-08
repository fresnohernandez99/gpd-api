import {
	Body,
	Controller,
	Post,
	UseGuards,
	UsePipes,
	Request,
	ValidationPipe,
	Get,
	Query,
	Delete,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { getConnection } from "typeorm";
import { Project } from "../project/project.entity";
import { Roles } from "../role/decorators/role.decorator";
import { RoleGuard } from "../role/guards/role.guard";
import { RoleType } from "../role/roletype.enum";
import { CreateEventDto } from "./dto/createEvent.dto";
import { UpdateEventDto } from "./dto/updateEvent.dto";
import { EventService } from "./event.service";

@Controller("event")
export class EventController {
	constructor(private readonly _service: EventService) {}

	@Post()
	@Roles(RoleType.LEAD, RoleType.ADMIN)
	@UseGuards(AuthGuard(), RoleGuard)
	@UsePipes(ValidationPipe)
	async create(@Request() req, @Body() dto: CreateEventDto) {
		var creating = await this._service.create(req.user.id, dto.projectId, dto);
		return creating;
	}

	@Get("my-events")
	@Roles(RoleType.LEAD, RoleType.ADMIN)
	@UseGuards(AuthGuard(), RoleGuard)
	async getEventsByProject(
		@Request() req,
		@Query() params: { projectId: number }
	) {
		var getting = await this._service.getEventsByProject(
			req.user.id,
			params.projectId
		);
		return getting;
	}

	@Delete()
	@Roles(RoleType.LEAD, RoleType.ADMIN)
	@UseGuards(AuthGuard(), RoleGuard)
	async delete(
		@Request() req,
		@Query() params: { eventId: number; projectId: number }
	) {
		const isAdmin = req.user.roles[0] == RoleType.ADMIN;

		var deleting = await this._service.delete(
			req.user.id,
			params.projectId,
			params.eventId,
			isAdmin
		);
		return deleting;
	}

    @Post("update")
	@Roles(RoleType.LEAD, RoleType.ADMIN)
	@UseGuards(AuthGuard(), RoleGuard)
	async update(
		@Request() req,
		@Query() params: { eventId: number; projectId: number },
		@Body() dto: UpdateEventDto
	) {
		var updating = await this._service.update(
			req.user.id,
			params.projectId,
			params.eventId,
            dto
        );
		return updating;
	}

	@Get("all-events")
	@Roles(RoleType.GENERAL, RoleType.LEAD, RoleType.ADMIN)
	@UseGuards(AuthGuard(), RoleGuard)
	async getAllEvents() {
		var getting = await this._service.getAllEvents();
		
		return getting;
	}
}
