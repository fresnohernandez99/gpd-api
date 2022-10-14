import {
	Body,
	Controller,
	Delete,
	Get,
	Post,
	Query,
	Request,
	UseGuards,
	UsePipes,
	ValidationPipe,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Roles } from "../role/decorators/role.decorator";
import { RoleGuard } from "../role/guards/role.guard";
import { RoleType } from "../role/roletype.enum";
import { CreateProjectDto } from "./dto/createProject.dto";
import { ProjectService } from "./project.service";

@Controller("project")
export class ProjectController {
	constructor(private readonly _service: ProjectService) {}

	@Post()
	@Roles(RoleType.GENERAL, RoleType.LEAD, RoleType.ADMIN)
	@UseGuards(AuthGuard(), RoleGuard)
	@UsePipes(ValidationPipe)
	async create(@Request() req, @Body() dto: CreateProjectDto) {
		var creating = await this._service.create(req.user.id, dto);
		return creating;
	}

	@Get("my-projects")
	@Roles(RoleType.GENERAL, RoleType.LEAD, RoleType.ADMIN)
	@UseGuards(AuthGuard(), RoleGuard)
	async getMyProjects(@Request() req) {
		var getting = await this._service.getAllMyPorjects(req.user.id);
		return getting;
	}

	@Delete()
	@Roles(RoleType.GENERAL, RoleType.LEAD, RoleType.ADMIN)
	@UseGuards(AuthGuard(), RoleGuard)
	async delete(@Request() req, @Query() params: { id: number }) {
		const isAdmin = req.user.roles[0] == RoleType.ADMIN;

		var deleting = await this._service.delete(params.id, isAdmin, req.user.id);
		return deleting;
	}
}
