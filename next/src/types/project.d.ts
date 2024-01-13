/** Represents a projects list item dto */
export interface ProjectItemDto {
  id: number;
  title: string;
  createdAt: string;
  updatedAt?: string | null;
}

/** Represents a projects list item with formatted dates */
export interface ProjectItem {
  id: number;
  title: string;
  createdAt?: Date;
  updatedAt?: Date;
  formattedCreatedAt?: string;
  formattedUpdatedAt?: string;
}

/** Represents a task for a local project */
export interface LocalTask {
  id: number;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  ord: number;
  columnId: number;
}

/** Represents a column for a local project */
export interface LocalColumn {
  id: number;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  ord: number;
}

/** Represents a local project */
export interface LocalProject {
  id: -1;
  title: "Local";
  createdAt: Date;
  updatedAt: Date;
  columns: LocalColumn[];
  tasks: LocalTask[];
}

/** Represents a user */
export interface User {
  email: string;
}

/** Represents a task */
export interface Task {
  id: number;
  title: string;
  createdAt?: Date;
  updatedAt?: Date;
  ord: number;
}

/** Represents a column */
export interface Column {
  id: number;
  title: string;
  createdAt?: Date;
  updatedAt?: Date;
  ord: number;
  tasks: Task[];
}

/** Represents a project */
export interface Project {
  id: number;
  title: string;
  createdAt?: Date;
  updatedAt?: Date;
  users: User[];
  columns: Column[];
}
