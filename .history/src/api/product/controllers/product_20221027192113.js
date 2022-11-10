"use strict";

/**
 * product controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::product.product", ({ strapi }) => ({
  async customPost(ctx) {
    const { data } = ctx.request.body;
    console.log("product post data", data);
  },
}));
