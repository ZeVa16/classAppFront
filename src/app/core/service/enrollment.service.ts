import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../enviorment/enviorment';
import { Api } from '../../utils/api';
import { ToastrService } from 'ngx-toastr';
import { Observable, tap } from 'rxjs';
import { GlobalResponse } from '../../shared/schemas/global-response.schema';
import { EnrollResponse } from '../schemas/enrollResponse.schema';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {

  private readonly http = inject(HttpClient)
  private readonly enrollUrl = `${environment.apiUrl}${Api.V1_ROUTE}${Api.ENROLLMENT}`
  private readonly toast = inject(ToastrService)

  constructor() { }

  enrollIn(classId:number):Observable<GlobalResponse<EnrollResponse>>{
    return this.http.post<GlobalResponse<EnrollResponse>>(`${this.enrollUrl}/${classId}`,null,{withCredentials:true}).pipe(
      tap((response)=>{
        this.toast.success("You joined this class",response.data.className)
      })
    )
  }
  myEnrolledClasses(): Observable<GlobalResponse<EnrollResponse[]>>{
    return this.http.get<GlobalResponse<EnrollResponse[]>>(`${this.enrollUrl}/my-enrollments`,{withCredentials:true}).pipe(
      tap((response)=>{
      })
    )
  }

}
