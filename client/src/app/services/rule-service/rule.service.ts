import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IRules } from '../../interfaces/rules.interface';

@Injectable({
  providedIn: 'root'
})
export class RuleService {

  constructor() { }

  private rules = new Subject<IRules>();
  private currentRule : IRules = {efficiency: true, baseRules: [], overrideRules: []};

  setRules (newRules: IRules) {
    this.rules.next(newRules);
    this.currentRule = newRules;
  }

  getRules () {
    return this.rules;
  }

  getCurrentRules () {
    return this.currentRule;
  }
}
