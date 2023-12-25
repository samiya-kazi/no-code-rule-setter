import { IBaseRule } from "../interfaces/baseRule.interface";
import { IOrder } from "../interfaces/order.interface";
import { IOverrideRule } from "../interfaces/overrideRule.interface";
import { IRules } from "../interfaces/rules.interface";

export function sortOrdersByRules (orders: IOrder[], rules: IRules) {
  const ordersSortedByBaseRules = sortOrdersByBaseRules(orders, rules.baseRules);
  const ordersSortedByOverrides = sortOrdersByOverrides(ordersSortedByBaseRules, rules.overrideRules);
  return ordersSortedByOverrides;
}


function sortOrdersByBaseRules (orders: IOrder[], baseRules: IBaseRule[]) {
  if (!baseRules.length || baseRules.every((rule) => rule.priority === 0)) return [...orders];

  const sortedBaseRules = baseRules.sort((a, b) => b.priority - a.priority);

  const newOrders : IOrder[] = [];
  let oldOrders = [...orders];

  for (const rule of sortedBaseRules) {
    if (rule.priority === 0) return [...newOrders, ...applyHiddenRulesForOrder(oldOrders)];

    const filtered : IOrder[] = [];
    const unfiltered : IOrder[] = [];

    for (const order of oldOrders) {
      if (rule.type === 'vip') (order.vip ? filtered : unfiltered).push(order);
      else (order.type === rule.type ? filtered : unfiltered).push(order);
    }

    newOrders.push(...applyHiddenRulesForOrder(filtered));
    oldOrders = [...unfiltered];
  }


  if (oldOrders.length) newOrders.push(...applyHiddenRulesForOrder(oldOrders));

  return newOrders;
}


function applyHiddenRulesForOrder (orders: IOrder[]) {

  const urgentOrders : IOrder[] = [];
  const normalOrders : IOrder[] = [];

  for (const order of orders) {
    if (!order.riderArrivalTime) {
      normalOrders.push(order);
      continue;
    }
    const flag = order.riderArrivalTime <= order.items.reduce((totalTime, item) => totalTime + (item.preparetime * item.qty), 0);
    (flag ? urgentOrders : normalOrders).push(order);
  }
  
  const sortedUrgentOrders = urgentOrders.sort((a, b) => {
    const aDiff = a.items.reduce((totalTime, item) => totalTime + (item.preparetime * item.qty), 0) - a.riderArrivalTime!;
    const bDiff = b.items.reduce((totalTime, item) => totalTime + (item.preparetime * item.qty), 0) - b.riderArrivalTime!;
    return bDiff - aDiff;
  });
  
  const sortedNormalOrders = [...normalOrders].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

  return [...sortedUrgentOrders, ...sortedNormalOrders];
}


function sortOrdersByOverrides (orders: IOrder[], overrideRules: IOverrideRule[]) {

  if (!overrideRules.length) return orders;

  const override : IOrder[] = [];
  const normalOrders : IOrder[] = [];

  for (const order of orders) {
    const flag = overrideRules.reduce((flag, rule) => {
      if (rule.type === 'rider-arrival-time') return !order.riderArrivalTime ? flag : (order.riderArrivalTime <= rule.maxTime ? true : flag);
      if (rule.type === 'customer-wait-time') return ((new Date().getTime() - new Date(order.createdAt).getTime())/60000) >= rule.maxTime ? true : flag;
      return flag;
    }, false);

    (flag ? override : normalOrders).push(order);
  };

  return [...override, ...normalOrders];
}