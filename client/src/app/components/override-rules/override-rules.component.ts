import { Component, EventEmitter, Output } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { OverrideOptionCardComponent } from '../override-option-card/override-option-card.component';
import { IOverrideRule } from '../../interfaces/overrideRule.interface';

@Component({
  selector: 'app-override-rules',
  standalone: true,
  imports: [CdkDropList, CdkDrag, OverrideOptionCardComponent],
  templateUrl: './override-rules.component.html',
  styleUrl: './override-rules.component.css'
})
export class OverrideRulesComponent {

  possibleOverrides : IOverrideRule[] = [{ title: "Rider distance", type: "rider-arrival-time", maxTime: 0 }, { title: "Customer wait", type: "customer-wait-time", maxTime: 0 }, { title: "Course wait", type: "course-wait-time", maxTime: 0 }];
  selectedOverrides : IOverrideRule[] = [];

  @Output() newOverrideRules = new EventEmitter<IOverrideRule[]>();

  drop(event: CdkDragDrop<IOverrideRule[]>) {
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

    this.emitNewOverrideRules();
  }

  emitNewOverrideRules () {
    this.newOverrideRules.emit(this.selectedOverrides);
  }
}
