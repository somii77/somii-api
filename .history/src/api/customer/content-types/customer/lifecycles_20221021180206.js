module.exports = {
  async afterUpdate(event) {
    const { data, populate } = event.params;
    const entry = await strapi.entityService.findOne(
      "api::customer.customer",
      data.id,
      {
        fields: ["users"],
        populate: { users: true },
      }
    );

    //   if(data.deleted){
    //     const entry = await strapi.entityService.update('api::user.user', 1, {
    //         data: {
    //           title: 'xxx',
    //         },
    //       });
    //   }
    console.log("back data", entry);
  },
};
