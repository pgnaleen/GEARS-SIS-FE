export class Roles {
  statusCode: bigint;
  message: string;
  payload: Role[];
}

export class Role {
  id: bigint;
  name: string;
  code: string;
}
