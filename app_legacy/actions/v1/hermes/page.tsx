"use server";

// https://hermes.pyth.network/api/latest_price_feeds?ids[]=0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace

// async function getPythEthUsdPrice(): Promise<string> {
//   const response: {
//     price: {
//       price: string;
//       conf: string;
//       expo: number;
//       publish_time: number;
//     };
//   }[] = await fetch(
//     "https://hermes.pyth.network/api/latest_price_feeds?ids[]=0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace",
//   ).then((res) => res.json());
//   console.log(response);
//   return response[0].price.price;
// }

// [
//   {
//     id: "ff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace",
//     price: {
//       price: "184136023127",
//       conf: "177166324",
//       expo: -8,
//       publish_time: 1692110601,
//     },
//     ema_price: {
//       price: "184100641000",
//       conf: "178704085",
//       expo: -8,
//       publish_time: 1692110601,
//     },
//   },
// ];
