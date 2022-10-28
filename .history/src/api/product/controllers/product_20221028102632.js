"use strict";

/**
 * product controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::product.product", ({ strapi }) => ({
  async customPost(ctx) {
    const { data } = ctx.request.body;

    const entry = await strapi.entityService.create("api::product.product", {
      data: {
        name: data.name,
        description: data.description,
        month_per_interval: data.month_per_interval,
        publishedAt: new Date(),
      },
    });
    const newPricings = [];
    for (let i = 0; i < data.pricings.length; i++) {
      const result = await strapi.entityService.create(
        "api::product-pricing.product-pricing",
        {
          data: {
            price: data.pricings[i].price,
            currency: data.pricings[i].currencyValue,
            product: entry.id,
            publishedAt: new Date(),
          },
        }
      );
      newPricings.push({ ...result });
    }

    console.log("product post data", entry);

    return { ...entry, product_pricings: [...newPricings] };
  },
  async customUpdate(ctx) {
    const { data } = ctx.request.param;
    console.log("req data", data);
    // const entry = await strapi.entityService.update("api::product.product", data.id, {
    //   data: {
    //     name: data.name,
    //     description: data.description,
    //     month_per_interval: data.month_per_interval,
    //     publishedAt: new Date(),
    //   },
    // });
    // const newPricings = [];
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

    // console.log("product post data", entry);

    // return { ...entry, product_pricings: [...newPricings] };
  },
}));
