import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { OptionCardComponent } from './components/option-card/option-card.component';
import { BaseRuleComponent } from './components/base-rule/base-rule.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, OptionCardComponent, BaseRuleComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'rule-setter';
}
