module.exports = {
  async afterUpdate(event) {
    const { data } = event.params;
    //   const entry = await strapi.entityService.findOne('api::customer.customer', 1, {
    //     fields: ['title', 'description'],
    //     populate: { category: true },
    //   });

    //   if(data.deleted){
    //     const entry = await strapi.entityService.update('api::user.user', 1, {
    //         data: {
    //           title: 'xxx',
    //         },
    //       });
    //   }
    console.log("back data", data.email);
  },
};
