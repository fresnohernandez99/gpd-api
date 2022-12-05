import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdateProjectDto {
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
}
