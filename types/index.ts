// ==========================================
// 1. PART 1 INTERFACES (Ensure these exist)
// ==========================================
export interface User {
    id: number;
    name: string;
    email: string;
    role: UserRole; // Using the enum defined below
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

// ==========================================
// 2. ADD ENUM (At least ONE)
// ==========================================
export type UserRole = "ADMIN" | "TEACHER" | "STUDENT";

export type StringOrNumber = string | number;

// ==========================================
// 3. ADD GENERIC INTERFACE ApiResponse<T>
// ==========================================
export interface ApiResponse<T> {
    status: "success" | "error";
    data: T;
    message?: string;
}

// ==========================================
// 4. ADD AT LEAST TWO UTILITY TYPES
// ==========================================
// Use 1: Partial<T> (Useful for updating data)
export type UpdateUserDto = Partial<User>;

// Use 2: Omit<T, K> (Useful for creating new entries without an ID yet)
export type NewSubmissionDto = Omit<Submission, "id">;