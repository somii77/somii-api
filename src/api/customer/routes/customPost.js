// src/api/hello/routes/custom-hello.js

module.exports = {
  routes: [
    {
      method: "POST",
      path: "/customers/custom-post",
      handler: "customer.customPost",
    },
  ],
};
