export interface BadgeModel {
  id: number;
  name: string;
  image: string;
  description: string;
  createAt: Date;
}

export type BadgeFormValues = Omit<BadgeModel, "id" | "createAt">;
