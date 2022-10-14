import { IsNotEmpty, IsString } from "class-validator";

export class CreateProjectDto {
	@IsNotEmpty()
	@IsString()
	projectName: string;

	@IsNotEmpty()
	@IsString()
	area: string;

	@IsNotEmpty()
	@IsString()
	startDate: string;

	@IsNotEmpty()
	@IsString()
	endDate: string;

	@IsNotEmpty()
	@IsString()
	justification: string;

	@IsNotEmpty()
	@IsString()
	recomendations: string;

	logo: string;
}
