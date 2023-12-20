import { Component, Input } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-option-card',
  standalone: true,
  imports: [NzIconModule],
  templateUrl: './option-card.component.html',
  styleUrl: './option-card.component.css'
})
export class OptionCardComponent {

  @Input() title!: string;
  @Input() index?: string;

  getIcon () {
    switch (this.title.toLowerCase()) {
      case "vip":
        return '../../../assets/svg/vip-gem.svg';
      case "delivery":
        return '../../../assets/svg/scooter.svg';
      default:
        return '../../../assets/svg/food-tray.svg';
    }
  }

  getListIndex () {
    return this.index ? Number(this.index) + 1 : null;
  }
}
