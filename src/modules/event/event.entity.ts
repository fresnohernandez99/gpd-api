import {
	BaseEntity,
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToOne,
} from "typeorm";
import { Project } from "../project/project.entity";
import { CreateEventDto } from "./dto/createEvent.dto";

@Entity()
export class Event extends BaseEntity {
	@PrimaryGeneratedColumn("increment")
	id: number;

	@Column({ type: "varchar", nullable: false })
	eventName: string;

	@Column({ type: "varchar", nullable: true })
	description: string;

	@ManyToOne(() => Project, (project) => project.events, { cascade: true })
	project: Project;

	@CreateDateColumn({ type: "timestamp", name: "start_date", nullable: false })
	startDate: string;

	@UpdateDateColumn({ type: "timestamp", name: "end_date", nullable: false })
	endDate: string;

	create(dto: CreateEventDto) {
		this.eventName = dto.eventName
		this.description = dto.description
		this.startDate = dto.startDate
		this.endDate = dto.endDate
	}
}
