import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ScenarioService } from '../services/scenario.service';
import { Scenario } from '../models/Scenario.models';
import * as firebase from 'firebase';

@Component({
  selector: 'app-user-setting',
  templateUrl: './user-setting.component.html',
  styleUrls: ['./user-setting.component.css']
})
export class UserSettingComponent implements OnInit {
  scenarioForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private scenarioService: ScenarioService) { }

  ngOnInit() {
  }


}
