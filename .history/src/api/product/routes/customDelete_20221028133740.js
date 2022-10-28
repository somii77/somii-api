// src/api/hello/routes/custom-hello.js

module.exports = {
  routes: [
    {
      method: "DELETE",
      path: "/products/custom-delete/:id",
      handler: "product.customDelete",
    },
  ],
};
