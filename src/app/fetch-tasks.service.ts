import { Injectable } from '@angular/core';
import { BaseApiService } from '../app/base-api.service';

@Injectable({
  providedIn: 'root'
})

export class FetchTasksService {

  constructor( private baseApiService: BaseApiService) { 
  }

  public getOneTask(heading: string) {
    return this.baseApiService.getOneTaskEnd(heading);
  }

  public deleteOneTask(obj: any) {
    return this.baseApiService.deleteOneTask(obj);
  }

  public addNewTask(obj: any) {
    return this.baseApiService.addTaskEnd(obj);
  }

  public addNewCompletedTask(obj: any) {
    return this.baseApiService.addCompletedTaskEnd(obj);
  }

  public getAllCompletedTasks() {
    return this.baseApiService.getAllCompletedTasksEnd();
  }

  public deleteTask(heading: string): any {
    this.baseApiService.removeTaskEnd(heading);
    return true;
  }
}
