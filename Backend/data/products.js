/**
 * data/products.js
 * Sample product seed data with category name mapping
 */

const products = [
  {
    name: "Noir Absolu N°1",
    categoryName: "Extrait de Parfum",
    description:
      "A masterpiece of darkness — rare black oud kissed by centuries-old amber and a velvet trail of smoked vanilla. The journey begins with an assertive smoky opening, melts into a heart of rare resinous amber, and settles into a skin-melding vanilla trail that evolves for hours. Conceived by our master perfumer in Grasse and bottled in hand-blown crystal.",
    price: 280,
    brand: "Maison",
    images: [
      "/img/prod1.jpg",
      "/img/prod2.jpg",
      "/img/prod3.jpg",
    ],
    sizes: ["30ml", "50ml", "100ml"],
    stock: 12,
  },
  {
    name: "Rose Impériale N°2",
    categoryName: "Eau de Parfum",
    description:
      "Damask rose petals harvested at dawn, suspended in white musk with a sparkling bergamot opening. A feminine icon of the Maison house — ethereal, powerful, and undeniably romantic. The rose absolute is sourced exclusively from the Valley of Roses in Bulgaria at peak bloom.",
    price: 310,
    brand: "Maison",
    images: [
      "/img/prod2.jpg",
      "/img/prod3.jpg",
      "/img/prod1.jpg",
    ],
    sizes: ["50ml", "100ml"],
    stock: 8,
  },
  {
    name: "Santal Céleste N°3",
    categoryName: "Parfum Intense",
    description:
      "Mysore sandalwood aged for decades, carved with the sharpness of cedar and warmed by green cardamom. An introspective scent for quiet confidence — worn close to the skin, it reveals new facets with every hour.",
    price: 265,
    brand: "Maison",
    images: [
      "/img/prod3.jpg",
      "/img/prod1.jpg",
      "/img/prod2.jpg",
    ],
    sizes: ["30ml", "50ml", "100ml", "150ml"],
    stock: 20,
  },
  {
    name: "Lumière d'Or N°4",
    categoryName: "Parfum de Nuit",
    description:
      "A golden dusk captured in a bottle — iris root, warm benzoin resin, and the silky whisper of iris petals. Conceived for those who believe evenings deserve their own perfume. Ideal for twilight occasions and quiet evenings.",
    price: 340,
    brand: "Maison",
    images: [
      "/img/poster.jpg",
      "/img/prod2.jpg",
      "/img/prod3.jpg",
    ],
    sizes: ["50ml", "100ml"],
    stock: 5,
  },
  {
    name: "Velours Noir N°5",
    categoryName: "Extrait de Parfum",
    description:
      "Rich cashmere wood and dark labdanum create a sillage that leaves a lasting impression from day to night. A bold statement, uncompromising in its elegance. This exclusive formulation is available only in limited quantities each season.",
    price: 295,
    brand: "Maison",
    images: [
      "/img/prod1.jpg",
      "/img/prod3.jpg",
      "/img/poster.jpg",
    ],
    sizes: ["30ml", "50ml"],
    stock: 15,
  },
];

export default products;
