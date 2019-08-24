import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BaseApiService {

  constructor(private http: HttpClient) {
   }

  private completedTasks: Array<any> = [];
  public static user_name: string;
  public static user_id: string;

  public liveTasks: Array<any>;
//   [
//     {
//         "title": "head-1",
//         "description": "details-1",
//         "date": "2019-06-20T12:52:21.620Z"
//     },
//     {
//         "title": "head-2",
//         "description": "details-2",
//         "date": "2019-06-20T12:52:21.620Z"
//     },
//     {
//         "title": "head-3",
//         "description": "details-3",
//         "date": "2019-06-20T12:52:21.620Z"
//     },
//     {
//         "title": "head-4",
//         "description": "details-4",
//         "date": "2018-06-20T12:52:21.620Z"
//     },
//     {
//         "title": "head-5",
//         "description": "details-3",
//         "date": "2019-06-20T12:52:21.620Z"
//     },
//     {
//         "title": "head-6",
//         "description": "details-3",
//         "date": "2019-06-20T12:52:21.620Z"
//     },
//     {
//         "title": "head-7",
//         "description": "details-3",
//         "date": "2019-06-20T12:52:21.620Z"
//     }
//   ];

public savePost(obj: any, uri: string){
    return this.http.post(uri, obj);
}

public addTaskEnd(obj: any) {
    if (obj) {
        this.liveTasks.push(obj);
        return true;
    }
    else 
        return false;
}

public deleteOneTask(url: any) {
    if(url) {
        return this.http.delete(url);
    }
}

public getOneTaskEnd(title: string): any {
    let task: any;
    return task;
}

public removeTaskEnd(title: string) {
    this.liveTasks.forEach( (element,index,object) => {
        if (element.title == title) {
            object.splice(index,1);
        }
    })
}

public fetchAllPostsEnd(uri: string) {
    return this.http.get(uri);
}

public increaseLikesCountEnd(uri: string) {
    return this.http.post(uri,{update:true});
}

public addCompletedTaskEnd(obj: any) {
    if (obj) {
        this.completedTasks.push(obj);
        return true;
    }
    else 
        return false;
}

public getAllCompletedTasksEnd() {
    return this.completedTasks;
}

  
}