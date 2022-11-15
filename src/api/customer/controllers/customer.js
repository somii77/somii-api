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
          isDefault: true,
          publishedAt: new Date(),
        },
      });

      return { data: entry };
    },
  })
);
