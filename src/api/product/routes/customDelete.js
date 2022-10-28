// src/api/hello/routes/custom-hello.js

module.exports = {
  routes: [
    {
      method: "PUT",
      path: "/products/custom-delete/:id",
      handler: "product.customDelete",
    },
  ],
};
