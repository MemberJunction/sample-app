import { Component, OnInit } from '@angular/core';
import { SharedService } from '../utils/shared-service';
import { PersonEntity } from 'mj_generatedentities';
import { Metadata } from '@memberjunction/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public userData!: PersonEntity;
  public isAdmin: boolean= false;


  constructor(private sharedService: SharedService) { }

  async ngOnInit() {
    this.sharedService.setupComplete$.subscribe(setupComplete => {
      if (setupComplete) {
        this.loadData();
      }
    });
  }

  async loadData() {
    const md = new Metadata();
    const admin = md.CurrentUser.UserRoles.findIndex((role)=> role.RoleName==='Developer');
    if(admin !== -1) this.isAdmin = true;
  }

}
