// src/api/hello/routes/custom-hello.js

module.exports = {
  routes: [
    {
      method: "PUT",
      path: "/brands/custom-update",
      handler: "brand.customUpdate",
    },
  ],
};
