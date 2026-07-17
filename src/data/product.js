
const products = [
  {
    id: 1,
    name: "Gold Necklace",
    price: 2000,
    description: "Beautiful necklace",
    category: "gold",
    imageUrl: ["http://localhost:8080/images/necklace.jpeg"],

    reviews: [
        {
          user: "Shreya",
          rating: 5,
          comment: "Excellent quality!"
        },
        {
          user: "Priya",
          rating: 4,
          comment: "Worth buying."
        }
      ]
  },
  {
    id: 2,
    name: "Earrings",
    price: 4999,
    description: "Elegant handmade earring",
    category: "earrings",
        images: ["http://localhost:8080/images/earrings.jpeg"],
    reviews: [
        {
          user: "Shreya",
          rating: 5,
          comment: "Excellent quality!"
        },
        {
          user: "Priya",
          rating: 4,
          comment: "Worth buying."
        }
      ]
  },
  {
    id: 3,
    name: "Gold Ring",
    price: 3400,
    description: "Beautiful Ring",
    category: "rings", // ✅ Changed from "ring" to "rings"
    images: ["http://localhost:8080/images/gold_ring.jpg"],
    reviews: [
        {
          user: "Shreya",
          rating: 5,
          comment: "Excellent quality!"
        },
        {
          user: "Priya",
          rating: 4,
          comment: "Worth buying."
        }
      ]
  },

    {
      id: 4,
      name: "Diamond Ring",
      price: 12000,
      description: "Premium Diamond Ring",
      category: "diamond",
      images: ["http://localhost:8080/images/diamond_ring.jpg"],
      reviews: [
          {
            user: "Shreya",
            rating: 5,
            comment: "Excellent quality!"
          },
          {
            user: "Priya",
            rating: 4,
            comment: "Worth buying."
          }
        ]
    },

    {
      id: 5,
      name: "Diamond Necklace",
      price: 25000,
      description: "Luxury Diamond Necklace",
      category: "diamond",
      images: ["http://localhost:8080/images/diamond_necklace.png"],
      reviews: [
          {
            user: "Shreya",
            rating: 5,
            comment: "Excellent quality!"
          },
          {
            user: "Priya",
            rating: 4,
            comment: "Worth buying."
          }
        ]
    },

    {
      id: 6,
      name: "Diamond Earrings",
      price: 8500,
      description: "Elegant Diamond Earrings",
      category: "diamond",
      images: ["http://localhost:8080/images/diamond_earrings.jpg"],
      reviews: [
          {
            user: "Shreya",
            rating: 5,
            comment: "Excellent quality!"
          },
          {
            user: "Priya",
            rating: 4,
            comment: "Worth buying."
          }
        ]
    },

    {
      id: 7,
      name: "Gold Bracelet",
      price: 5500,
      description: "Traditional Gold Bracelet",
      category: "gold",
      images: ["http://localhost:8080/images/gold_bracelet.jpg"],
      reviews: [
          {
            user: "Shreya",
            rating: 5,
            comment: "Excellent quality!"
          },
          {
            user: "Priya",
            rating: 4,
            comment: "Worth buying."
          }
        ]
    },

    {
      id: 8,
      name: "Silver Ring",
      price: 1800,
      description: "Stylish Silver Ring",
      category: "rings",
      images: ["http://localhost:8080/images/silver_ring.jpg"],
      reviews: [
          {
            user: "Shreya",
            rating: 5,
            comment: "Excellent quality!"
          },
          {
            user: "Priya",
            rating: 4,
            comment: "Worth buying."
          }
        ]
    },
  {
      id: 9,
      name: "anklet",
      price: 2000,
      description: "Stylish Silver anklet",
      category: "anklet",
      images: ["http://localhost:8080/images/anklet.jpg"],
      reviews: [
          {
            user: "Shreya",
            rating: 5,
            comment: "Excellent quality!"
          },
          {
            user: "Priya",
            rating: 4,
            comment: "Worth buying."
          }
        ]
    }
  ];


export default products;