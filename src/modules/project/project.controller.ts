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
import { Response } from "src/shared/responder";
import { Roles } from "../role/decorators/role.decorator";
import { RoleGuard } from "../role/guards/role.guard";
import { RoleType } from "../role/roletype.enum";
import { CreateProjectDto } from "./dto/createProject.dto";
import { UpdateProjectDto } from "./dto/updateProject.dto";
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
		var getting = await this._service.getAllMyProjects(req.user.id);
		return getting;
	}

	@Delete()
	@Roles(RoleType.LEAD, RoleType.ADMIN)
	@UseGuards(AuthGuard(), RoleGuard)
	async delete(@Request() req, @Query() params: { id: number }) {
		const isAdmin = req.user.roles[0] == RoleType.ADMIN;

		var deleting = await this._service.delete(params.id, isAdmin, req.user.id);
		return deleting;
	}

	@Post("update")
	@Roles(RoleType.GENERAL, RoleType.LEAD, RoleType.ADMIN)
	@UseGuards(AuthGuard(), RoleGuard)
	async update(
		@Request() req,
		@Query() params: { id: number },
		@Body() dto: UpdateProjectDto
	) {
		var updating = await this._service.update(params.id, dto, req.user.id);
		return updating;
	}

	@Get("all-projects")
	@Roles(RoleType.ADMIN)
	@UseGuards(AuthGuard(), RoleGuard)
	async getAllProjects(@Request() req) {
		var getting = await this._service.getAll();
		return new Response(1, ["All Projects"], getting);
	}

	@Get("accept")
	@Roles(RoleType.ADMIN)
	@UseGuards(AuthGuard(), RoleGuard)
	async accept(@Request() req, @Query() params: { id: number }) {
		var accepting = await this._service.accept(params.id, req.user.id);
		return accepting;
	}
}
