export interface BoardCreateRequestDto {
  title: string;
}

export interface ColumnCreateRequestDto {
  title: string;
  boardId: number;
}

export interface ColumnUpdateRequestDto {
  title?: string;
}

export interface ColumnSwapRequestDto {
  direction: "left" | "right";
}

export interface TaskCreateRequestDto {
  title: string;
  columnId: number;
}

export interface TaskSwapRequestDto {
  direction: "up" | "down";
}

export interface TaskUpdateRequestDto {
  title?: string;
  columnId?: number;
}
