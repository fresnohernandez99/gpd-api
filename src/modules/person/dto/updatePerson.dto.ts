import { IsNotEmpty, IsString } from "class-validator";

export class UpdatePersonDto {
	@IsString()
	displayname: string;

	@IsString()
	phone: string;

	@IsString()
	password: string;

	@IsString()
	photo: string;
}
