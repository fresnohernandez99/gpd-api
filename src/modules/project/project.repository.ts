import { Repository, EntityRepository } from "typeorm";
import { Project } from "./project.entity";

@EntityRepository(Project)
export class ProjectRepository extends Repository<Project> {}
