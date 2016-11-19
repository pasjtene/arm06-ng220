import { Component, Input, OnInit, HostBinding, trigger, transition, animate, style, state  } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from './user.service';
import { User } from './user';

@Component({
  moduleId: module.id,
  selector: 'user-details',
  templateUrl: 'user-details.component.html',
  styleUrls: ['user-details.component.css'],
  animations: [
    trigger('routeAnimation', [
      state('*',
        style({
          opacity: 1,
          transform: 'translateX(0)'
        })
      ),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(-100%)'
        }),
        animate('0.9s ease-in')
      ]),
      transition('* => void', [
        animate('1.9s ease-out', style({
          opacity: 0,
          transform: 'translateY(100%)'
        }))
      ])
    ])
  ]
})

export class UserDetailComponent implements OnInit {
@HostBinding('@routeAnimation') get routeAnimation() {
  return true;
}

@HostBinding('style.display') get display() {
  return 'block';
}

@HostBinding('style.position') get position() {
  return 'absolute';
}

  @Input()
  user: User;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router
  ){}

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      //let id = +params['id'];
          let id = params['id'];
      this.userService.getUser2(id)
      .then(user => {
        this.user = user
      });
    });
  }

  goBack(): void{
    this.location.back();
  }

  save(user: User): void {
    console.log(" in save "+user.email);
    this.userService.update(user)
        .then(() => this.goBack())
  }

  gotoUsers() {
    let userId  = this.user ? this.user.id: null;
    this.router.navigate(['users', {id: userId, bar: 'bar' }]);
  }
}
