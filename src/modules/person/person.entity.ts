import {
	BaseEntity,
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToMany,
	JoinTable,
	OneToMany,
} from "typeorm";
import { Role } from "../role/role.entity";
import { StateType } from "../../shared/state.enum";
import { Project } from "../project/project.entity";

@Entity()
export class Person extends BaseEntity {
	@PrimaryGeneratedColumn("increment")
	id: number;

	@Column({ type: "varchar", nullable: false })
	displayname: string;

	@Column({ type: "varchar", unique: true, length: 10, nullable: false })
	phone: string;

	@Column({ type: "varchar", nullable: false })
	password: string;

	@Column({ type: "varchar", nullable: true })
	photo: string;

	@Column({ type: "varchar", nullable: true, default: StateType.WAITING })
	state: string;

	@ManyToMany((type) => Role, (role) => role.people, { eager: true })
	@JoinTable({ name: "person_roles" })
	roles: Role[];

	@OneToMany(() => Project, project => project.owner)
    projects: Project[];

	@CreateDateColumn({ type: "timestamp", name: "created_at" })
	createdAt: Date;

	@UpdateDateColumn({ type: "timestamp", name: "updated_at" })
	updatedAt: Date;
}
