import { Module } from "@nestjs/common";
import { EventService } from "./event.service";
import { EventController } from "./event.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EventRepository } from "./event.repository";
import { AuthModule } from "../auth/auth.module";

@Module({
	imports: [TypeOrmModule.forFeature([EventRepository]), AuthModule],
	providers: [EventService],
	controllers: [EventController],
})
export class EventModule {}
