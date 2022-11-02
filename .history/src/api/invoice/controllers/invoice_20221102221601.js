"use strict";

/**
 * invoice controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::invoice.invoice", ({ strapi }) => ({
  async customPost(ctx) {
    const { data } = ctx.request.body;

    const entry = await strapi.entityService.create("api::invoice.invoice", {
      data: {
        ...data,
        publishedAt: new Date(),
      },
    });
    const newInvoiceItems = [];
    for (let i = 0; i < data.invoiceItems.length; i++) {
      const result = await strapi.entityService.create(
        "api::invoice-line-item.invoice-line-item",
        {
          data: {
            quantity: data.invoiceItems[i].quantity,
            product: data.invoiceItems[i].productValue,
            row_amount: data.invoiceItems[i].row_amount,
            invoice: entry.id,
            publishedAt: new Date(),
          },
        }
      );
      newInvoiceItems.push({ ...result });
    }

    console.log("invoice posted data", entry);

    return { ...entry, product_pricings: [...newInvoiceItems] };
  },
}));
