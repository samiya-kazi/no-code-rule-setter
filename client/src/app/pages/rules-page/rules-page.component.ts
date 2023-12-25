import { Component, OnInit } from '@angular/core';
import { BaseRuleComponent } from '../../components/base-rule/base-rule.component';
import { OverrideRulesComponent } from '../../components/override-rules/override-rules.component';
import { IRules } from '../../interfaces/rules.interface';
import { RuleService } from '../../services/rule-service/rule.service';
import { IBaseRule } from '../../interfaces/baseRule.interface';
import { IOverrideRule } from '../../interfaces/overrideRule.interface';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-rules-page',
  standalone: true,
  imports: [BaseRuleComponent, OverrideRulesComponent, NzButtonModule, NzIconModule],
  templateUrl: './rules-page.component.html',
  styleUrl: './rules-page.component.css'
})
export class RulesPageComponent implements OnInit {

  rules : IRules = {efficiency: false, baseRules: [], overrideRules: []};
  baseRules : IBaseRule[] = this.rules.baseRules;
  overrideRules : IOverrideRule[] = this.rules.overrideRules;
  efficiency : boolean = this.rules.efficiency;

  constructor (private rulesService: RuleService) {}

  ngOnInit () {
    this.rulesService.getRules().subscribe(newRules => this.rules = newRules);
  }

  handleNewBaseRules (rules : IBaseRule[]) {
    this.baseRules = rules;
  }

  handleNewOverrideRules (rules : IOverrideRule[]) {
    this.overrideRules = rules;
  }

  handleEfficiency (value : boolean) {
    this.efficiency = value;
  }

  handleSubmit () {
    if (this.checkRules()) {
      this.rulesService.setRules({ efficiency: this.efficiency, baseRules: this.baseRules, overrideRules: this.overrideRules });
    }
  }

  checkRules () {
    const flag = this.overrideRules.reduce((flag, rule) => rule.maxTime <= 0 ? false : flag, true);
    return flag;
  }
}
