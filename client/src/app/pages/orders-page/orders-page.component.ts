import { Component, OnInit } from '@angular/core';
import { IOrder } from '../../interfaces/order.interface';
import { RuleService } from '../../services/rule-service/rule.service';
import { sortOrdersByRules } from '../../utils/sorting.helper';

@Component({
  selector: 'app-orders-page',
  standalone: true,
  imports: [],
  templateUrl: './orders-page.component.html',
  styleUrl: './orders-page.component.css'
})
export class OrdersPageComponent implements OnInit {

  orders: IOrder[] = [];

  constructor (private ruleService : RuleService) {}

  ngOnInit(): void {
    this.ruleService.getRules().subscribe(rules => {
      //Re-order the orders based on the current rules
      this.orders = sortOrdersByRules(this.orders, rules);
    });
  }

}
