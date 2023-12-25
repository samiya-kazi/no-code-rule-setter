import { Component, EventEmitter, Output } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { OptionCardComponent } from '../option-card/option-card.component';
import { IBaseRule } from '../../interfaces/baseRule.interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-base-rule',
  standalone: true,
  imports: [CdkDropList, CdkDrag, NzSwitchModule, OptionCardComponent, FormsModule],
  templateUrl: './base-rule.component.html',
  styleUrl: './base-rule.component.css'
})
export class BaseRuleComponent {

  availableOptions : string[] = ["VIP", "Delivery", "In-House"];
  selectedOptions : string[] = [];
  efficiency : boolean = false;

  @Output() baseRuleChange = new EventEmitter<IBaseRule[]>();
  @Output() efficiencyChange = new EventEmitter<boolean>();

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }

    this.emitNewBaseRules();
  }

  emitNewBaseRules () {
    const selectedBaseRules = this.selectedOptions.map((value, index) => ({ type: value.toLocaleLowerCase(), priority: this.selectedOptions.length - index }));
    const remainingRules = this.availableOptions.map((value) => ({ type: value.toLocaleLowerCase(), priority: 0 }));
    const newBaseRules = [...selectedBaseRules, ...remainingRules];

    this.baseRuleChange.emit(newBaseRules);
  }

  emitEfficiencyChange (event: boolean) {
    this.efficiencyChange.emit(event);
  }
}
