import { IsNotEmpty, IsString } from "class-validator";

export class CreateEventDto {
	@IsNotEmpty()
	@IsString()
	eventName: string;

	@IsNotEmpty()
	@IsString()
	description: string;

	@IsNotEmpty()
	@IsString()
	startDate: string;

	@IsNotEmpty()
	@IsString()
	endDate: string;
}
