export interface TCategory {
  id: number,
  name: string,
  parentId: number | null;
  children?: TCategory[];
}