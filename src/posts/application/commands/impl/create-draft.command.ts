export class CreateDraftCommand {
  constructor(
    public readonly title: string,
    public readonly authorId: string,
    public readonly content?: string | null,
  ) {}
}
