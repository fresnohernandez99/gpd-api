import {
	Body,
	Controller,
	Delete,
	Get,
	Post,
	Query,
	Request,
	UploadedFile,
	UseGuards,
	UseInterceptors,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { FileInterceptor } from "@nestjs/platform-express";
import { Roles } from "../role/decorators/role.decorator";
import { RoleGuard } from "../role/guards/role.guard";
import { RoleType } from "../role/roletype.enum";
import { PersonService } from "./person.service";
import { storage } from "../auth/auth.controller";
import { Response } from "src/shared/responder";
import { UpdatePersonDto } from "./dto/updatePerson.dto";
import { GetPersonIdDto } from "./dto/getPersonId.dto";
import { FormatedPersonDto } from "./dto/formatedPerson.dto";

@Controller("person")
export class PersonController {
	constructor(private readonly _personService: PersonService) {}

	@Get()
	@Roles(RoleType.ADMIN)
	@UseGuards(AuthGuard())
	async getPeople() {
		const people = await this._personService.getAll();

		if (people.length == 0) return new Response(4, ["Missing data"], {});

		let formatedPeople = people.map((item) => new FormatedPersonDto(item));

		return new Response(1, ["People list"], { formatedPeople });
	}

	@Get("/waiting")
	@Roles(RoleType.ADMIN)
	@UseGuards(AuthGuard(), RoleGuard)
	async getWaiting() {
		const waiting = await this._personService.getWaiting();

		if (waiting.length == 0) return new Response(4, ["Missing data"], {});

		let formatedPeople = waiting.map((item) => new GetPersonIdDto(item));

		return new Response(1, ["Waiting list"], { formatedPeople });
	}

	@Get("/accept-request")
	@Roles(RoleType.ADMIN)
	@UseGuards(AuthGuard(), RoleGuard)
	async acceptRequest(@Query() params: { id: number }) {
		var accept = await this._personService.acceptRequest(params.id);

		return accept;
	}

	@Post("update-profile")
	@UseInterceptors(FileInterceptor("profile", storage))
	@UseGuards(AuthGuard(), RoleGuard)
	async updatePerson(
		@UploadedFile() file: Express.Multer.File,
		@Request() req,
		@Body() person: UpdatePersonDto
	) {
		if (file) person.photo = file.filename;

		var update = await this._personService.update(req.user.id, person);

		return update;
	}

	@Delete("delete-profile")
	@UseGuards(AuthGuard(), RoleGuard)
	async deletePerson(@Request() req, @Query() params: { id: number }) {
		if (
			(req.user.roles.includes(RoleType.ADMIN) && req.user.id != params.id) ||
			(!req.user.roles.includes(RoleType.ADMIN) && req.user.id == params.id)
		) {
			var deleting = await this._personService.delete(params.id);

			return deleting;
		} else return new Response(3, ["Bad request"], {});
	}

	@Get("set-role")
	@Roles(RoleType.ADMIN)
	@UseGuards(AuthGuard(), RoleGuard)
	async setRoleToPerson(
		@Query() params: { roleId: number; personId: number }
	) {
		const setting = this._personService.setRoleToPerson(
			params.personId,
			params.roleId
		);
		return setting;
	}
}
