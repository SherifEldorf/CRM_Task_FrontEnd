import { Customer } from "./Customer";

export class Order
{
  id ?: number;
  status ?: boolean;
  date ?:string;
  customerId ?: number;
  tax ?: number;
  subtotal?: number;
  grandtotal?:number;
  shippingAddress ?:string;
  pillingAddress  ?:string;
  customer ?: Customer;
}
