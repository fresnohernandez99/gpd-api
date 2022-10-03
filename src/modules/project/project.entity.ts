import {
	BaseEntity,
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToOne,
} from "typeorm";
import { StateType } from "../../shared/state.enum";
import { Person } from "../person/person.entity";
import { CreateProjectDto } from "./dto/createProject.dto";

@Entity()
export class Project extends BaseEntity {
	@PrimaryGeneratedColumn("increment")
	id: number;

	@Column({ type: "varchar", unique: true, nullable: false })
	projectName: string;

	@Column({ type: "varchar", nullable: false })
	area: string;

	@Column({ type: "varchar", nullable: true })
	logo: string;

	@ManyToOne(() => Person, (person) => person.appointments)
	owner: Person;

	@Column({ type: "varchar", nullable: true, default: StateType.WAITING })
	state: string;

	@CreateDateColumn({ type: "timestamp", name: "start_date" })
	startDate: string;

	@UpdateDateColumn({ type: "timestamp", name: "end_date" })
	endDate: string;

	create(dto: CreateProjectDto) {
		this.projectName = dto.projectName
		this.area = dto.area
		this.startDate = dto.startDate
		this.endDate = dto.endDate
	}
}
