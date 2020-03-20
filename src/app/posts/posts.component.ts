import { Component, OnInit } from '@angular/core';
import { FetchTasksService } from '../fetch-tasks.service';
import { Router } from '@angular/router';
import { PostService } from '../post.service';
import { BaseApiService } from '../base-api.service';
import { Config } from '../app.config';
// import { CommonStoreService } from '../commons/common-store.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostComponent implements OnInit {

  public showCompletedTasks: boolean;
  public posts: Array<any> = [];
  private formattedTasks: any;
  public taskDetail: any = {};
  private voteObj: any = {};
  public config: Config = new Config;

  public constructor(private fetchTaskService: FetchTasksService,
    public postService: PostService,
    public baseApiService: BaseApiService,
    private router: Router) {
    this.populateTasks();                                         // populate posts and baseApi.Service variable
  }

  public detail(task: any) {
    this.taskDetail = task;
  }

  public editTask(title: string) {
    console.log("to edit")
    this.router.navigateByUrl('/add/'+title);
    console.log(this.baseApiService.liveTasks);
  }

  public deletePost(title: any) {
    let url = this.config.baseUrlLocal + '/data/post/delete/' + title;
    this.fetchTaskService.deleteOneTask(url).subscribe( (res: any) => {
      if(res.apiStatus == 'Success') {
        alert("Successfully Deleted the post")
        this.router.navigateByUrl('/posts');
      } else {
        alert(res.msg);
      }
    })
  }

  public completeTask(title: string) {
    let task = this.fetchTaskService.getOneTask(title);
    this.fetchTaskService.deleteTask(title);
    this.fetchTaskService.addNewCompletedTask(task);
  }

  public populateTasks(_id?: number, optional?: boolean, initialRender?: boolean) {
    console.log("Populate tasks called.")
    this.postService.fetchAllPosts().subscribe((res: any) => {
      if (res.apiStatus == "Success") {
        this.posts = res.data;
        // CommonStoreService.taskStore = res.data;
        this.transformTasks();
      } else {
        alert("Unable to fetch all tasks")
      }
    });
  }

  public trackByFunction(index, post) {
    if (!post) return null
    return post._id;
  }

  public transformTasks() {
    this.posts.forEach(task => {
      let dateObj = new Date(task.timestamp);
      let formattedDate = dateObj.getDate() + '/' + ((dateObj.getMonth()) + 1) + '/' + dateObj.getFullYear();
      task.formattedDate = formattedDate;
      this.voteObj['task._id'] = false;                                                  // initially all must be false.
    });
  }

  ngOnInit() {
  }

}
