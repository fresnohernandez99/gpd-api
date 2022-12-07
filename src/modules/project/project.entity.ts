import {
	BaseEntity,
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToOne,
	OneToMany,
} from "typeorm";
import { StateType } from "../../shared/state.enum";
import { Event } from "../event/event.entity";
import { Person } from "../person/person.entity";
import { CreateProjectDto } from "./dto/createProject.dto";

@Entity()
export class Project extends BaseEntity {
	@PrimaryGeneratedColumn("increment")
	id: number;

	@Column({ type: "varchar", nullable: false })
	projectName: string;

	@Column({ type: "varchar", nullable: false })
	area: string;

	@Column({ type: "varchar", nullable: true })
	logo: string;

	@Column({ type: "varchar", nullable: true })
	justification: string;

	@Column({ type: "varchar", nullable: true })
	recomendations: string;

	@ManyToOne(() => Person, (person) => person.projects, { onDelete: "CASCADE" })
	owner: Person;

	@Column({ type: "varchar", nullable: true, default: StateType.WAITING })
	state: string;

	@Column({ type: "timestamp", name: "start_date" })
	startDate: string;

	@Column({ type: "timestamp", name: "end_date" })
	endDate: string;

	@OneToMany(() => Event, (event) => event.project)
	events: Event[];

	create(dto: CreateProjectDto) {
		this.projectName = dto.projectName;
		this.area = dto.area;
		this.justification = dto.justification;
		this.recomendations = dto.recomendations;
		this.startDate = dto.startDate;
		this.endDate = dto.endDate;

		if (dto.logo != undefined) this.logo = dto.logo;
		else dto.logo = "default.png";
	}
}
