import { Component } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { OptionCardComponent } from '../option-card/option-card.component';

@Component({
  selector: 'app-base-rule',
  standalone: true,
  imports: [CdkDropList, CdkDrag, NzSwitchModule, OptionCardComponent],
  templateUrl: './base-rule.component.html',
  styleUrl: './base-rule.component.css'
})
export class BaseRuleComponent {

  availableOptions : string[] = ["VIP", "Delivery", "In-House"];
  selectedOptions : string[] = [];


  drop(event: CdkDragDrop<string[]>) {
    console.log(event);
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
  }

}
