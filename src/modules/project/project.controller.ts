import {
	Body,
	Controller,
	Post,
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
	@Roles(RoleType.GENERAL, RoleType.LEAD)
	@UseGuards(AuthGuard(), RoleGuard)
	@UsePipes(ValidationPipe)
	async create(@Request() req, @Body() dto: CreateProjectDto) {
		var creating = await this._service.create(req.user.id, dto);
		return creating;
	}
}
