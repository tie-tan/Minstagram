import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Post } from '../post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css'],
})
export class PostEditComponent implements OnInit {
  form!: FormGroup;
  public post? : Post;
  public index : number = 0;
  postedit = false;
  numberOfLikes: number = 0;
  author?: string;
  date: Date = new Date();


  constructor(private postService: PostService, private router: Router,private route: ActivatedRoute) {}

  ngOnInit(): void {
    let title = '';
    let description = '';
    let imagePath = '';

      this.route.params.subscribe((params: Params) => {

        this.index = params['index'];
        if(this.index)
        { 
            this.postedit = true;
            title = this.postService.getPoststoupdate(this.index).title;
            description = this.postService.getPoststoupdate(this.index).description;
            imagePath = this.postService.getPoststoupdate(this.index).imagePath;
            this.numberOfLikes = this.postService.getPoststoupdate(this.index).numberOfLikes;
            this.author = this.postService.getPoststoupdate(this.index).author;
            this.date = this.postService.getPoststoupdate(this.index).datetimeCreated;
        }
      });

    this.form = new FormGroup({
      title: new FormControl(title, [Validators.required]),
      description: new FormControl(description, [Validators.required]),
      imagePath: new FormControl(imagePath, [Validators.required]),
    });
  }

  onSubmit() {
    const title = this.form.value.title;
    const description = this.form.value.description;
    const imagePath = this.form.value.imagePath;
    

    // Ready with Object
    const post: Post = new Post(
      title,
      description,
      imagePath,
      this.numberOfLikes,
      this.author ?? 'test@test.com',
      this.date
    );

    // Calling service
    if(this.postedit)
    {
      this.postService.updatePost(this.index,post);
    }
    else
    {
      this.postService.addPost(post);
    }

    // Navigate to /post-list
    this.router.navigate(["/post-list"])
  }
}
