// src/api/hello/routes/custom-hello.js

module.exports = {
  routes: [
    {
      method: "PUT",
      path: "/products/custom-update/:id",
      handler: "product.customUpdate",
    },
  ],
};
