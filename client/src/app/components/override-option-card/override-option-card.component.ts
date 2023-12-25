import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'app-override-option-card',
  standalone: true,
  imports: [NzInputModule, FormsModule],
  templateUrl: './override-option-card.component.html',
  styleUrl: './override-option-card.component.css'
})
export class OverrideOptionCardComponent {
  @Input() option!: { title: string, maxTime: number };
  @Input() showInput?: boolean;

  getIcon() {
    if (this.option.title.toLocaleLowerCase().includes('rider')) return '../../../assets/svg/helmet.svg';
    if (this.option.title.toLocaleLowerCase().includes('customer')) return '../../../assets/svg/table-and-chairs.svg';
    return '../../../assets/svg/plate.svg';
  }
}
