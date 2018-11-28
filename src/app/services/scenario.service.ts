import { Injectable } from '@angular/core';
import { Film } from '../models/Film.models';
import {HttpClient} from '@angular/common/http';
import * as firebase from 'firebase';
import { Subject } from 'rxjs';
import { Scenario } from '../models/Scenario.models';

@Injectable({
  providedIn: 'root'
})
export class ScenarioService {
  scenario: Scenario[] = [];
  scenarioSubject = new Subject<Scenario[]>();
  constructor(private httpClient: HttpClient) { }

  emitScenario() {
    this.scenarioSubject.next(this.scenario);
  }

  saveScenario() {
   firebase.database().ref('/scenario').set(this.scenario);
  }
  /*saveScenario(){
    this.httpClient
      .put('https://cinema-project-dcb5f.firebaseio.com/', this.scenario)
      .subscribe(
        () => {
          console.log('enregistrement terminé')
        },
        (error) => {
          console.log('erreur de sauvegarde : ' + error);
        }
      )
  } */
  getScenarios() {
    firebase.database().ref('/scenario')
      .on('value', (data) => {
          this.scenario = data.val() ? data.val() : [];
          this.emitScenario();
      });
  }

  getSingleScenario(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/scenario/' + id).once('value').then(
          (data) => {
            resolve(data.val());
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  getScenarioFromServer() {
    this.httpClient
     .get<any[]>('https://cinema-project-dcb5f.firebaseio.com/scenario.json')
     .subscribe(
       (response) => {
           this.scenario = response;
           console.log(this.scenario);
           this.emitScenario();
       },
       (error) => {
           console.log('erreur de chargement ' + error);
       }
     );
   }

  getLastScenario() {
    return this.scenario.length;
  }

  createNewScenario(newScenario: Scenario) {
    console.log(this.scenario);
    console.log(newScenario);
    this.scenario.push(newScenario);
    this.saveScenario();
    this.emitScenario();
  }

  removeScenario(scenario: Scenario) {
    const scenarioIndexToRemove = this.scenario.findIndex(
      (scenarioEl) => {
        if (scenarioEl === scenario) {
          return true;
        }
      }
    );
    this.scenario.splice(scenarioIndexToRemove, 1);
    this.saveScenario();
    this.emitScenario();
  }

  getScenario(id: number) {
    return this.scenario[id];
  }
}
