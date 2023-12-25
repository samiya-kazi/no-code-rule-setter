import { Component } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { OverrideOptionCardComponent } from '../override-option-card/override-option-card.component';

@Component({
  selector: 'app-override-rules',
  standalone: true,
  imports: [CdkDropList, CdkDrag, OverrideOptionCardComponent],
  templateUrl: './override-rules.component.html',
  styleUrl: './override-rules.component.css'
})
export class OverrideRulesComponent {

  possibleOverrides : { title: string, maxTime: number }[] = [{ title: "Rider distance", maxTime: 0 }, { title: "Customer wait", maxTime: 0 }, { title: "Course wait", maxTime: 0 }];
  selectedOverrides : { title: string, maxTime: number }[] = [];

  drop(event: CdkDragDrop<{ title: string, maxTime: number }[]>) {
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
