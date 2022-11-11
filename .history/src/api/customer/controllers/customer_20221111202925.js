"use strict";

/**
 * customer controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::customer.customer",
  ({ strapi }) => ({
    async customPost(ctx) {
      const { data } = ctx.request.body;

      const entry = await strapi.entityService.create(
        "api::customer.customer",
        {
          data: {
            ...data,
            publishedAt: new Date(),
          },
        }
      );
      await strapi.entityService.create("api::brand.brand", {
        data: {
          name: "Default Brand",
          customer: entry.id,
          publishedAt: new Date(),
        },
      });
      // console.log("invoice posted data", entry);
      console.log("data", entry);
      return { ...entry };
    },
  })
);
