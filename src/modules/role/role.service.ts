import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateRoleDto } from "./dto/createRole.dto";
import { Role } from "./role.entity";
import { RoleRepository } from "./role.repository";

@Injectable()
export class RoleService {
	constructor(
		@InjectRepository(RoleRepository)
		private readonly _roleRepository: RoleRepository
	) {}

	async get(id: number): Promise<Role> {
		if (!id) {
			throw new BadRequestException("id must be sent");
		}

		const role: Role = await this._roleRepository.findOne(id);

		if (!role) {
			throw new NotFoundException();
		}

		return role;
	}

	async getAll(): Promise<Role[]> {
		const roles: Role[] = await this._roleRepository.find();

		return roles;
	}

	async create(dto: CreateRoleDto): Promise<Role> {
		const savedRole: Role = await this._roleRepository.save(dto);
		return savedRole;
	}

	async update(id: number, role: Role): Promise<void> {
		await this._roleRepository.update(id, role);
	}

	async delete(id: number): Promise<void> {
		const roleExists = await this._roleRepository.findOne(id);

		if (!roleExists) {
			throw new NotFoundException();
		}

		await this._roleRepository.delete(id);
	}
}
