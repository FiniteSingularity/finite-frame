import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss']
})
export class SetupComponent implements OnInit {
  username: string;
  
  constructor(
    private auth: AuthService
  ) { }

  async ngOnInit() {
    console.log('SetupComponent->ngOnInit()');
    this.username = await this.auth.login();
  }

}
