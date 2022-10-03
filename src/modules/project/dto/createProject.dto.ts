import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateProjectDto {
	@IsNotEmpty()
	@IsString()
	projectName: string;

	@IsNotEmpty()
	@IsString()
	area: string;

	@IsNotEmpty()
	@IsDate()
	startDate: string;

	@IsNotEmpty()
	@IsDate()
	endDate: string;

	@IsNotEmpty()
	@IsString()
	justification: string;

	@IsNotEmpty()
	@IsString()
	recomendations: string;
}
