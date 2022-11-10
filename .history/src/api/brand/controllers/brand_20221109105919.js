"use strict";

/**
 * brand controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::brand.brand", ({ strapi }) => ({
  async customPost(ctx) {
    const { data } = ctx.request.body;

    const entry = await strapi.entityService.create("api::brand.brand", {
      data: {
        ...data,
        publishedAt: new Date(),
      },
    });
    const newBrandSocials = [];
    for (let i = 0; i < data.socials.length; i++) {
      const result = await strapi.entityService.create(
        "api::brands-social-account.brands-social-account",
        {
          data: {
            social_account: data.socials[i],
            customer: data.customer,
            brand: entry.id,
            publishedAt: new Date(),
          },
        }
      );
      newBrandSocials.push({ ...result });
    }

    console.log("invoice posted data", entry);

    return { ...entry, socials: [...newBrandSocials] };
  },
  async customDelete(ctx) {
    const { id } = ctx.request.params;
    const { data } = ctx.request.body;

    console.log("req id", id);
    console.log("req data", data);
    const entry = await strapi.entityService.update(
      "api::invoice.invoice",
      id,
      {
        data: {
          deleted: true,
          deleted_at: new Date(),
        },
      }
    );
    // console.log("updated entry", entry);
    const newBrandSocials = [];
    for (let i = 0; i < data.invoiceItems.length; i++) {
      const result = await strapi.entityService.update(
        "api::invoice-line-item.invoice-line-item",
        data.invoiceItems[i].id,
        {
          data: {
            deleted: true,
            deleted_at: new Date(),
          },
        }
      );
      newBrandSocials.push({ ...result });
    }

    return { ...entry, invoice_line_items: [...newBrandSocials] };
  },
}));
