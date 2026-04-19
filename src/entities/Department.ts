import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from "typeorm";
import { Branch } from "./Branch";

@Entity("departments")
@Index(["branchId", "name"], { unique: true })
export class Department {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  branchId: string;

  @ManyToOne(() => Branch, (branch) => branch.departments, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "branchId" })
  branch: Branch;

  @Column({ length: 150 })
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
