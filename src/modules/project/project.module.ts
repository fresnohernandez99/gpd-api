import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "../auth/auth.module";
import { ProjectController } from "./project.controller";
import { ProjectRepository } from "./project.repository";
import { ProjectService } from "./project.service";

@Module({
  imports: [TypeOrmModule.forFeature([ProjectRepository]), AuthModule],
	controllers: [ProjectController],
	providers: [ProjectService],
})
export class ProjectModule {}