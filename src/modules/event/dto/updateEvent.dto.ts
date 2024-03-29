import { IsNotEmpty, IsString } from "class-validator";

export class UpdateEventDto {
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
