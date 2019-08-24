import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FetchTasksService } from '../fetch-tasks.service';
import { PostService } from '../post.service';
import { BaseApiService } from '../base-api.service';
import { of, Observable } from 'rxjs';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  public title: string = '';
  public description: string = '';
  public date: any = new Date();
  private allTasks: any;

  public constructor(public activatedRoute: ActivatedRoute,
    public router: Router,
    public postService: PostService,
    public baseApiService: BaseApiService,
    public fetchTaskService: FetchTasksService) {
    let title = this.activatedRoute.snapshot.paramMap.get('title');
    this.fetchTaskService = fetchTaskService;
    if (title) {
      this.getTasksData(title);
    }
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }
  }

  public save() {
    let taskAdded;
    let post = {
      "title": this.title,
      "description": this.description,
      "timestamp": this.date ? this.date : Date.now(),
    }
    if (this.title && this.description) {
      this.postService.post(post, BaseApiService.user_name).subscribe(res => {
        if (res.apiStatus == "Success") {
          this.router.navigateByUrl('/posts');
          alert("Successfully posted")
        }
        else {
          console.log("Some error in posting data")
          alert("Some error in posting data")
        }
      });
    } else {
      alert("Please Fill all details");
    }
    this.clearAll();
  }

  ngOnInit() {
  }

  public getTasksData(title: string) {
    this.postService.fetchAllPosts().subscribe( (res: any) => {
      if (res.apiStatus == "Success") {
        this.allTasks = res.data;
        let taskFound = false;
        console.log("alltasks",this.allTasks)
        if(this.allTasks && this.allTasks.length) {
          this.allTasks.forEach(task => {
            if(task.title==title) {
              console.log(task.title)
              taskFound = true;
              this.title = task.title;
              console.log(this.title,'0000')
              this.description = task.description;
              this.date = task.date;
            }
          });
        }
        if(taskFound) 
          return;
        else {
          alert("No such task exists");
          this.router.navigateByUrl('/add');
        }
      } else {
        alert("Unable to fetch all tasks")
      }
    });
}

  public populate(title: string) {
    // let taskFound = false;
    // console.log("alltasks",this.allTasks)
    // if(this.allTasks && this.allTasks.length) {
    //   this.allTasks.forEach(task => {
    //     if(task.title==title) {
    //       console.log(task.title)
    //       taskFound = true;
    //       this.title = task.title;
    //       this.description = task.description;
    //       this.date = task.date;
    //     }
    //   });
    // }
    // if(taskFound) 
    //   return;
    // else {
    //   alert("No such task exists");
    //   this.router.navigateByUrl('/add');
    // }
  }

  public clearAll() {
    this.title = '';
    this.description = '';
    this.date = null;
  }

}