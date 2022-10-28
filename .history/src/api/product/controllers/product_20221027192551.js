"use strict";

/**
 * product controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::product.product", ({ strapi }) => ({
  async customPost(ctx) {
    const { data } = ctx.request.body;
    console.log("product post data", data);
    const entry = await strapi.entityService.create(
      "api::product-pricing.product-pricing",
      {
        data: {
          name: data.name,
          description: data.description,
          price: data.pricings[0].price,
          currency: data.pricings[0].currencyValue,
        },
      }
    );
  },
}));
