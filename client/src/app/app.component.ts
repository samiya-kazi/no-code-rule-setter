import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { OptionCardComponent } from './components/option-card/option-card.component';
import { BaseRuleComponent } from './components/base-rule/base-rule.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { OverrideRulesComponent } from './components/override-rules/override-rules.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, OptionCardComponent, BaseRuleComponent, NavbarComponent, OverrideRulesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'rule-setter';
}
