import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Person } from "../person/person.entity";
import { AuthRepository } from "./auth.repository";
import { SigninDto, SignupDto } from "./dto";
import { compare } from "bcryptjs";
import { IJwtPayload } from "./jwt-payload.interface";
import { RoleType } from "../role/roletype.enum";
import { StateType } from "../../shared/state.enum";
import { Response } from "src/shared/responder";

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(AuthRepository)
		private readonly _authRepository: AuthRepository,
		private readonly _jwtService: JwtService
	) {}

	async signup(signupDto: SignupDto) {
		const { phone } = signupDto;
		const personExists = await this._authRepository.findOne({
			where: [{ phone }],
		});

		if (personExists && personExists.state == StateType.WAITING)
			return new Response(22, ["Waiting to be activated"], {});

		if (personExists)
			return new Response(21, ["Person already registered"], {});

		await this._authRepository.signup(signupDto);

		return new Response(1, ["Process starting"], {});
	}

	async signin(signinDto: SigninDto) {
		const { phone, password } = signinDto;

		const person: Person = await this._authRepository.findOne({
			where: { phone },
		});

		if (person && person.state == StateType.WAITING)
			return new Response(22, ["Waiting to be activated"], {});

		const isMatch = await compare(password, person.password);

		if (!isMatch) return new Response(3, ["Wrong password"], {});

		const payload: IJwtPayload = {
			id: person.id,
			phone: person.phone,
			roles: person.roles.map((r) => r.name as RoleType),
		};

		const token = await this._jwtService.sign(payload);

		var isAdmin = false;

		person.roles.find((rol) => {
			if (rol.name == RoleType.ADMIN) isAdmin = true;
		});

		return new Response(1, ["Login success"], {
			token,
			phone: person.phone,
			displayname: person.displayname,
			isAdmin,
		});
	}
}
