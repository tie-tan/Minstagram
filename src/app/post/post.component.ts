import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../post.service';
import { Router } from '@angular/router';
import { PostEditComponent } from '../post-edit/post-edit.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  @Input() post?: Post;
  @Input() index: number = 0;
  
  isHeartOn: boolean[] = [];

  memberName = 'Sam';
  constructor(private postService: PostService,private route: Router) {}

  ngOnInit(): void {
    console.log(this.post);
    console.log(this.index);
    this.isHeartOn = [...this.postService.isButtonHeartOn];
  }

  onDelete() {
    console.log('onDelete() called!');
    this.postService.deletePost(this.index);
  }

  updatePost(post : Post,index : number){
    this.route.navigate(["/post-edit",index]);
    this.postService.updatePost(this.index, this.post!);
  }

  onlike(index: number)
  {
    this.isHeartOn[index] =! this.isHeartOn[index];
    this.postService.isButtonHeartOn[index] = this.isHeartOn[index];
    this.postService.onPostLike(index);
  }
}
