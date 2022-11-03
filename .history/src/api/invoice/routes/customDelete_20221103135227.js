// src/api/hello/routes/custom-hello.js

module.exports = {
  routes: [
    {
      method: "PUT",
      path: "/invoices/custom-delete/:id",
      handler: "invoice.customDelete",
    },
  ],
};
