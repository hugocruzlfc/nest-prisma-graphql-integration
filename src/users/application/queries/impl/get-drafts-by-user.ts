export class GetDraftsByUserQuery {
  constructor(
    public readonly id?: string,
    public readonly email?: string,
  ) {}
}
