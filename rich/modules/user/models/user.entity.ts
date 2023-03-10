import { Exclude } from 'class-transformer';
import { CommonEntity } from '../../common/models/common.entity';
import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { Role } from '../../role/models/role.entity';

@Entity('users')
export class User extends CommonEntity {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ default: 'ACTIVE' })
  status: 'ACTIVE' | 'DEACTIVE' | 'BLOCKED';

  @Column({ nullable: true })
  image: string;

  @Column()
  @Exclude()
  password: string;

  @ManyToMany(() => Role, { cascade: true })
  @JoinTable({
    name: 'users_roles',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' },
  })
  roles: Role[];
}
