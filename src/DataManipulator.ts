import { ServerRespond } from './DataStreamer';

export interface Row {
  price_abc: number,
  price_def: number,
  ratio: number,
  timestamp: Date,
  upper_bound: number,
  lower_bound: number,
  trigger_alert: number | undefined,
}


export class DataManipulator {
  static generateRow(serverResponds: ServerRespond[]): Row {
    const BOUNDRY = 0.10;
    const ABC = serverResponds[0];
    const DEF = serverResponds[1];

    const priceABC = (ABC.top_ask.price + ABC.top_bid.price) / 2;
    const priceDEF = (DEF.top_ask.price + DEF.top_bid.price) / 2;
    const ratio = priceABC / priceDEF;
    const upperBound = 1 + BOUNDRY;
    const lowerBound = 1 - BOUNDRY;

    return {
      price_abc: priceABC,
      price_def: priceDEF,
      ratio,
      timestamp: ABC.timestamp > DEF.timestamp ? ABC.timestamp : DEF.timestamp,
      upper_bound: upperBound,
      lower_bound: lowerBound,
      trigger_alert: (ratio > upperBound || ratio < lowerBound) ? ratio : undefined,
    }
  }
}
