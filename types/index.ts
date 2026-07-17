export interface User {
    id: number;
    name: string;
    email: string;
    role: UserRole; 
}

export interface Course {
    id: string;
    title: string;
    description: string;
}

export interface Submission {
    id: number;
    courseId: string;
    studentId: number;
    grade?: number;
}


export type UserRole = "ADMIN" | "TEACHER" | "STUDENT";

export type StringOrNumber = string | number;


export interface ApiResponse<T> {
    status: "success" | "error";
    data: T;
    message?: string;
}


export type UpdateUserDto = Partial<User>;

export type NewSubmissionDto = Omit<Submission, "id">;