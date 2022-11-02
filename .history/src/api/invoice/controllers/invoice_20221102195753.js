"use strict";

/**
 * invoice controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::invoice.invoice", ({ strapi }) => ({
  async customPost(ctx) {
    const { data } = ctx.request.body;
    Date.prototype.addDays = function (days) {
      var date = new Date(this.valueOf());
      date.setDate(date.getDate() + days);
      return date;
    };

    var dateAfter = new Date();
    const entry = await strapi.entityService.create("api::invoice.invoice", {
      data: {
        ...data,
        due_date: dateAfter.addDays(data.due_date),
      },
    });
    const newPricings = [];
    // for (let i = 0; i < data.pricings.length; i++) {
    //   const result = await strapi.entityService.create(
    //     "api::product-pricing.product-pricing",
    //     {
    //       data: {
    //         price: data.pricings[i].price,
    //         currency: data.pricings[i].currencyValue,
    //         product: entry.id,
    //         publishedAt: new Date(),
    //       },
    //     }
    //   );
    //   newPricings.push({ ...result });
    // }

    console.log("invoice posted data", entry);

    // return { ...entry, product_pricings: [...newPricings] };
  },
}));
