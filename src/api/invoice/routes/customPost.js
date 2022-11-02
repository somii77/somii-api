// src/api/hello/routes/custom-hello.js

module.exports = {
  routes: [
    {
      method: "POST",
      path: "/invoices/custom-post",
      handler: "invoice.customPost",
    },
  ],
};
