export interface AuthResponse{
    token:string
    username:string
    userType:userType
}
export type userType = "STUDENT" | "TEACHER";