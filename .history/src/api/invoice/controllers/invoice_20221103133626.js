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
    const newInvoiceItems = [];
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
      newInvoiceItems.push({ ...result });
    }

    return { ...entry, invoice_line_items: [...newInvoiceItems] };
  },
}));
