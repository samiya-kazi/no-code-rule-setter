import { Component, Input } from '@angular/core';
import { IOrder } from '../../interfaces/order.interface';
import { NzCardModule } from 'ng-zorro-antd/card';

@Component({
  selector: 'app-order-card',
  standalone: true,
  imports: [NzCardModule],
  templateUrl: './order-card.component.html',
  styleUrl: './order-card.component.css'
})
export class OrderCardComponent {

  @Input() order! : IOrder;
}
