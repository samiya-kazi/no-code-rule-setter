import { ChangeDetectionStrategy, Component, NgZone, OnInit } from '@angular/core';
import { IOrder } from '../../interfaces/order.interface';
import { RuleService } from '../../services/rule-service/rule.service';
import { sortOrdersByRules } from '../../utils/sorting.helper';
import { OrderCardComponent } from '../../components/order-card/order-card.component';

@Component({
  selector: 'app-orders-page',
  standalone: true,
  imports: [OrderCardComponent],
  templateUrl: './orders-page.component.html',
  styleUrl: './orders-page.component.css',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class OrdersPageComponent implements OnInit {
  orders: IOrder[] = [
    {
      id: '1',
      items: [
        { name: 'Burger', qty: 2, preparetime: 10 },
        { name: 'Fries', qty: 1, preparetime: 5 },
      ],
      type: 'delivery',
      vip: false,
      createdAt: new Date('2023-12-25T08:30:00'),
      riderArrivalTime: 10,
    },
    {
      id: '2',
      items: [
        { name: 'Pizza', qty: 1, preparetime: 15 },
        { name: 'Salad', qty: 1, preparetime: 8 },
      ],
      type: 'in-house',
      vip: true,
      createdAt: new Date('2023-12-25T10:45:00'),
      course: 'Main Course',
    },
    {
      id: '3',
      items: [
        { name: 'Pizza', qty: 1, preparetime: 15 },
        { name: 'Salad', qty: 1, preparetime: 8 },
      ],
      type: 'in-house',
      vip: true,
      createdAt: new Date('2023-12-25T10:45:00'),
      course: 'Main Course',
    },
    {
      id: '4',
      items: [
        { name: 'Pizza', qty: 1, preparetime: 15 },
        { name: 'Salad', qty: 1, preparetime: 8 },
      ],
      type: 'delivery',
      vip: true,
      createdAt: new Date('2023-12-25T10:45:00'),
      course: 'Main Course',
      riderArrivalTime: 5,
    },
    // ... (repeat similar structure for the remaining orders)
    {
      id: '15',
      items: [
        { name: 'Sushi', qty: 3, preparetime: 20 },
        { name: 'Miso Soup', qty: 2, preparetime: 7 },
      ],
      type: 'delivery',
      vip: true,
      createdAt: new Date('2023-12-25T18:15:00'),
      riderArrivalTime: 8,
    },
  ];

  constructor(private ruleService: RuleService, private zone: NgZone) {

  }

  ngOnInit(): void {
    const currentRule = this.ruleService.getCurrentRules();
    this.orders = sortOrdersByRules(this.orders, currentRule);

    this.ruleService.getRules().subscribe((rules) => {
      //Re-order the orders based on the current rules
      const newOrders = sortOrdersByRules(this.orders, rules);
      this.orders = newOrders;
    });
  }
  
}
