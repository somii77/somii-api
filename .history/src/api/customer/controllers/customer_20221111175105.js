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

      // const entry = await strapi.entityService.create("api::invoice.invoice", {
      //   data: {
      //     ...data,
      //     publishedAt: new Date(),
      //   },
      // });
      // console.log("invoice posted data", entry);
      console.log("data", data);
      // return { ...entry };
    },
  })
);
