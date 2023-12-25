import { Component } from '@angular/core';
import { BaseRuleComponent } from '../../components/base-rule/base-rule.component';
import { OverrideRulesComponent } from '../../components/override-rules/override-rules.component';

@Component({
  selector: 'app-rules-page',
  standalone: true,
  imports: [BaseRuleComponent, OverrideRulesComponent],
  templateUrl: './rules-page.component.html',
  styleUrl: './rules-page.component.css'
})
export class RulesPageComponent {

}
