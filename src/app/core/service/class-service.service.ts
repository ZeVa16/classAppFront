import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../enviorment/enviorment';
import { Api } from '../../utils/api';
import { ClassRequest } from '../schemas/classRequest.schema';
import { Observable, tap } from 'rxjs';
import { GlobalResponse } from '../../shared/schemas/global-response.schema';
import { ClassResponse } from '../schemas/classResponse.schema';
import { ToastrService } from 'ngx-toastr';
import { NotExpr } from '@angular/compiler';
import { StudentResponse } from '../schemas/studentResponse.schema';

@Injectable({
  providedIn: 'root'
})
export class ClassServiceService {

  private readonly http = inject(HttpClient)
  private readonly classUrl = `${environment.apiUrl}${Api.V1_ROUTE}${Api.CLASS}`;
  private readonly toast = inject(ToastrService)

  constructor() { }



  getMyClasses():Observable<GlobalResponse<ClassResponse[]>>{
    return this.http.get<GlobalResponse<ClassResponse[]>>(`${this.classUrl}/my-classes`,{withCredentials:true})
  }
  getClasses():Observable<GlobalResponse<ClassResponse[]>>{
    return this.http.get<GlobalResponse<ClassResponse[]>>(`${this.classUrl}/get-all`,{withCredentials:true})
  }

  getClassById(classId:number):Observable<GlobalResponse<ClassResponse>>{
    return this.http.get<GlobalResponse<ClassResponse>>(`${this.classUrl}/find-class/${classId}`,{withCredentials:true})
  }

  getStudentsFromClass(classId:number):Observable<GlobalResponse<StudentResponse[]>>{
    return this.http.get<GlobalResponse<StudentResponse[]>>(`${this.classUrl}/${classId}/students`,{withCredentials:true});
  }

  createClass(credentials:ClassRequest): Observable<GlobalResponse<ClassResponse>>{
    return this.http.post<GlobalResponse<ClassResponse>>(`${this.classUrl}/create`,credentials,{withCredentials:true}).pipe(
      tap((response)=>{
        this.toast.success("Class created succesfully","Great")
      }))
  };

  updateClass(credentials:ClassRequest,classId:number):Observable<GlobalResponse<ClassResponse>>{
    return this.http.put<GlobalResponse<ClassResponse>>(`${this.classUrl}/update/${classId}`,credentials,{withCredentials:true}).pipe(
      tap((response)=>{
        this.toast.success("Class updated succesfully","Great")
      })
    )
  }

  deleteClass(classId:number):Observable<GlobalResponse<void>>{
    return this.http.delete<GlobalResponse<void>>(`${this.classUrl}/delete/${classId}`,{withCredentials:true}).pipe(
      tap((response)=>{
        this.toast.success("Class deleted succesfully","Great")
      })
    )
  }

}
