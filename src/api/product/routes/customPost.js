// src/api/hello/routes/custom-hello.js

module.exports = {
  routes: [
    {
      method: "POST",
      path: "/products/custom-post",
      handler: "product.customPost",
    },
  ],
};
