/*
 * Catálogo público. Este archivo es la única fuente de productos y está
 * preparado para que un futuro panel /admin lo reemplace por una API segura.
 * Las fechas de oferta usan formato ISO con zona horaria local (YYYY-MM-DDTHH:mm).
 */
window.SABOR_DATA = {
  business: {
    whatsapp: '56938797384',
    pickupAddress: 'Los Tulipanes 5037, Valle Volcanes, Puerto Montt',
    heroImage: 'assets/galeria/sin-clasificar/trabajo-01.jpeg'
  },
  products: [
    {id:'tequenos', name:'Tequeños', category:'Cóctel', description:'Crujientes y listos para compartir.', quantity:'50 unidades', price:21000, image:'', available:true, featured:false, offerPrice:null, offerStart:null, offerEnd:null},
    {id:'pastelitos', name:'Pastelitos', category:'Cóctel', description:'Preparación para compartir.', quantity:'50 unidades', price:21000, image:'', available:true, featured:false, offerPrice:null, offerStart:null, offerEnd:null},
    {id:'empanadas', name:'Empanadas', category:'Cóctel', description:'Preparación para compartir.', quantity:'50 unidades', price:24000, image:'', available:true, featured:false, offerPrice:null, offerStart:null, offerEnd:null},
    {id:'arepitas', name:'Arepitas', category:'Cóctel', description:'Preparación para compartir.', quantity:'50 unidades', price:24000, image:'', available:true, featured:false, offerPrice:null, offerStart:null, offerEnd:null},
    {id:'cachapitas', name:'Cachapitas', category:'Cóctel', description:'Preparación para compartir.', quantity:'30 unidades', price:23000, image:'', available:true, featured:false, offerPrice:null, offerStart:null, offerEnd:null},
    {id:'bolitas-carne', name:'Bolitas de carne', category:'Cóctel', description:'Preparación para compartir.', quantity:'30 unidades', price:19000, image:'', available:true, featured:false, offerPrice:null, offerStart:null, offerEnd:null},
    {id:'serpentinas', name:'Serpentinas', category:'Cóctel', description:'Preparación para compartir.', quantity:'40 unidades', price:19000, image:'', available:true, featured:false, offerPrice:null, offerStart:null, offerEnd:null},
    {id:'brocheta-pollo', name:'Brocheta de pollo', category:'Cóctel', description:'Con morrón y cebolla.', quantity:'30 unidades', price:20990, image:'', available:true, featured:false, offerPrice:null, offerStart:null, offerEnd:null},
    {id:'brocheta-vacuno', name:'Brocheta de vacuno', category:'Cóctel', description:'Con morrón y cebolla.', quantity:'30 unidades', price:23990, image:'', available:true, featured:false, offerPrice:null, offerStart:null, offerEnd:null},
    {id:'mini-pizzas', name:'Mini pizzas', category:'Cóctel', description:'Preparación para compartir.', quantity:'30 unidades', price:16500, image:'', available:true, featured:false, offerPrice:null, offerStart:null, offerEnd:null},
    {id:'mini-hamburguesas', name:'Mini hamburguesas', category:'Cóctel', description:'Preparación para compartir.', quantity:'20 unidades', price:24000, image:'assets/galeria/sin-clasificar/trabajo-01.jpeg', available:true, featured:true, badge:'Más pedido', offerPrice:null, offerStart:null, offerEnd:null},
    {id:'mini-completos', name:'Mini completos', category:'Cóctel', description:'Preparación para compartir.', quantity:'20 unidades', price:20000, image:'', available:true, featured:false, offerPrice:null, offerStart:null, offerEnd:null},
    {id:'mini-hotdogs', name:'Mini hot dogs', category:'Cóctel', description:'Preparación para compartir.', quantity:'20 unidades', price:20000, image:'', available:true, featured:false, offerPrice:null, offerStart:null, offerEnd:null},
    {id:'tamales', name:'Tamales', category:'Cóctel', description:'Preparación para compartir.', quantity:'50 unidades', price:14990, image:'', available:true, featured:false, offerPrice:null, offerStart:null, offerEnd:null},
    {id:'mix-50', name:'Mix 50', category:'Box', description:'Tequeños, pastelitos y empanadas.', quantity:'50 unidades', price:25000, image:'', available:true, featured:false, offerPrice:null, offerStart:null, offerEnd:null},
    {id:'mix-70', name:'Mix 70', category:'Box', description:'Tequeños, pastelitos, empanadas, mandocas y arepas.', quantity:'70 unidades', price:39000, image:'', available:true, featured:false, offerPrice:null, offerStart:null, offerEnd:null},
    {id:'mix-100', name:'Mix 100', category:'Box', description:'Tequeños, pastelitos, empanadas, mandocas, arepas y cachapas.', quantity:'100 unidades', price:49500, image:'assets/social/sabor-de-elis-social.jpeg', available:true, featured:true, badge:'Más pedido', offerPrice:null, offerStart:null, offerEnd:null},
    {id:'mix-150', name:'Mix 150', category:'Box', description:'Tequeños, pastelitos, empanadas, mandocas, arepas, bolitas de carne y cachapas.', quantity:'150 unidades', price:70000, image:'', available:true, featured:false, offerPrice:null, offerStart:null, offerEnd:null},
    {id:'mix-200', name:'Mix 200', category:'Box', description:'Tequeños, pastelitos, empanadas, mandocas, arepas, bolitas de carne, cachapas, tamales y pizzas.', quantity:'200 unidades', price:98000, image:'', available:true, featured:false, offerPrice:null, offerStart:null, offerEnd:null},
    {id:'mini-shots', name:'Mini shots', category:'Dulces', description:'Elige 3 sabores: tres leches, pie de limón, chocolate, cheesecake, tiramisú, arroz con leche o mini quesillo.', quantity:'24 unidades', price:25000, image:'', available:true, featured:false, offerPrice:null, offerStart:null, offerEnd:null},
    {id:'mini-dulces', name:'Mini dulces', category:'Dulces', description:'Elige 4 variedades: brownies, cupcakes, cake pops, tartaletas, mini pie de limón, alfajores, quesillos o trufas.', quantity:'50 unidades', price:40000, image:'', available:true, featured:false, offerPrice:null, offerStart:null, offerEnd:null}
  ],
  classicCakes: ['Tres leches','Piña','Imperial','Tarta de frutas','Quesillo','Quesipiña','Beso de ángel','Chocobrownie','Chocomoka'].map((name, index) => ({id:`torta-${index}`, name, category:'Tortas clásicas', description:'Opción tradicional y deliciosa para compartir y celebrar.', quantity:'', price:null, image:'', available:true})),
  gallery: [
    {src:'assets/galeria/sin-clasificar/trabajo-01.jpeg', alt:'Trabajo real de Sabor de Elis', category:'Tortas personalizadas'},
    {src:'assets/social/sabor-de-elis-social.jpeg', alt:'Preparación real de Sabor de Elis', category:'Tortas y celebraciones'}
  ]
};
