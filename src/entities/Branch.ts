import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from "typeorm";
import { Organization } from "./Organization";
import { Department } from "./Department";

@Entity("branches")
@Index(["organizationId", "name"], { unique: true })
export class Branch {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  organizationId: string;

  @ManyToOne(() => Organization, (org) => org.branches, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "organizationId" })
  organization: Organization;

  @Column({ length: 150 })
  name: string;

  @Column({ length: 150 })
  location: string;

  @OneToMany(() => Department, (dept) => dept.branch)
  departments: Department[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
