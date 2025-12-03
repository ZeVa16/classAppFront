export interface GlobalResponse<T>{
    message:string
    data:T
    status:string
    code:number
}