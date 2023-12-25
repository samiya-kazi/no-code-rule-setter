import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IRules } from '../../interfaces/rules.interface';

@Injectable({
  providedIn: 'root'
})
export class RuleService {

  constructor() { }

  private rules = new Subject<IRules>();

  setRules (newRules: IRules) {
    this.rules.next(newRules);
  }

  getRules () {
    return this.rules;
  }
}
