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
        type: data.type,
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
    const { id } = ctx.request.params;
    const { data } = ctx.request.body;
    console.log("req data", data);
    const entry = await strapi.entityService.update(
      "api::product.product",
      id,
      {
        data: {
          name: data.name,
          description: data.description,
          type: data.type,
          month_per_interval: data.month_per_interval,
        },
      }
    );
    console.log("updated entry", entry);
    const newPricings = [];
    for (let i = 0; i < data.pricings.length; i++) {
      if (data.pricings[i].id) {
        const result = await strapi.entityService.update(
          "api::product-pricing.product-pricing",
          data.pricings[i].id,
          {
            data: {
              price: data.pricings[i].price,
              currency: data.pricings[i].currencyValue,
            },
          }
        );
        newPricings.push({ ...result });
      } else {
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
    }

    // console.log("product post data", entry);

    return { ...entry, product_pricings: [...newPricings] };
  },
  async customDelete(ctx) {
    const { id } = ctx.request.params;
    const { data } = ctx.request.body;

    console.log("req id", id);
    console.log("req data", data);
    const entry = await strapi.entityService.update(
      "api::product.product",
      id,
      {
        data: {
          deleted: true,
          deleted_at: new Date(),
        },
      }
    );
    // console.log("updated entry", entry);
    const newPricings = [];
    for (let i = 0; i < data.pricings.length; i++) {
      const result = await strapi.entityService.update(
        "api::product-pricing.product-pricing",
        data.pricings[i].id,
        {
          data: {
            deleted: true,
            deleted_at: new Date(),
          },
        }
      );
      newPricings.push({ ...result });
    }

    // // console.log("product post data", entry);

    return { ...entry, product_pricings: [...newPricings] };
  },
}));
