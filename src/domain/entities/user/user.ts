import { Static, Type as T } from "@sinclair/typebox";
import { Email } from "domain/models/email";
import shortUUID from "short-uuid";

export const UserTypeSchema = T.Object({
  id: T.String(),
  name: T.String(),
  email: T.String({ format: "email" }),
  createdAt: T.String(),
  updatedAt: T.String(),
});

export type UserDTO = Static<typeof UserTypeSchema>;

export class User {
  readonly id: string;
  readonly name: string;
  readonly email: Email;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  constructor(props: {
    id?: string;
    name: string;
    email: Email;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    this.id = props.id ?? `user_${shortUUID.generate()}`;
    this.name = props.name;
    this.email = props.email;
    this.createdAt = props.createdAt ?? new Date();
    this.updatedAt = props.updatedAt ?? new Date();
  }

  serialize(): UserDTO {
    return {
      id: this.id,
      name: this.name,
      email: this.email.value,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
    };
  }
}
