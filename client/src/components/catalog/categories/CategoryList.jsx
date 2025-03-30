import CategoryItem from "./CategoryItem";

export default function CategoryList() {
  const categories = [
    {
      name: "Protein",
      image:
        "https://shop.bodybuilding.com/cdn/shop/files/bodybuildingcom-signature-100-whey-protein-30-servings-668541.jpg?v=1735446931&width=3000",
      path: "/catalog?category=protein",
    },
    {
      name: "Protein Bars",
      image:
        "https://shop.bodybuilding.com/cdn/shop/files/quest-protein-bars-12-pack-370756.webp?v=1741270940&width=3000",
      path: "/catalog?category=protein bars",
    },
    {
      name: "Gainer",
      image:
        "https://www.usn.co.uk/cdn/shop/files/UKHC_WholefoodGainer_1kg_Bag_Choc_f33c10d8-f6d4-4200-8f36-a293dc650e04.webp?v=1737975295&width=1946",
      path: "/catalog?category=gainer",
    },
    {
      name: "Glutamine",
      image:
        "https://www.cytoplan.co.uk/media/catalog/product/cache/ca6a73b49326d453d49cb5f28cf46160/2/1/2182_l-glutamine_main_1.jpg",
      path: "/catalog?category=glutamine",
    },
    {
      name: "BCAA",
      image: "https://m.media-amazon.com/images/I/71IbRBLz6yL.jpg",
      path: "/catalog?category=bcaa",
    },
    {
      name: "Creatine",
      image:
        "https://www.muscletech.in/wp-content/uploads/2022/10/100-creatine-unflavoured-250g-1.webp",
      path: "/catalog?category=creatine",
    },
    {
      name: "Fat Burner",
      image:
        "https://image.polleosport.com/https://polleostoragebasic.blob.core.windows.net/product-images/450x450-data/leovital_fat_burner-1500.jpg?w=450",
      path: "/catalog?category=fat burner",
    },
    {
      name: "L-Carnitine",
      image:
        "https://shop.biotechusa.com/cdn/shop/products/LCarnitine_60tbl_400ml.png?v=1623332651",
      path: "/catalog?category=L-Carnitine",
    },
    {
      name: "Carnitine",
      image: "https://www.silabg.com/uf/product/18111_pm_eb_citrulline.jpg",
      path: "/catalog?category=citrulline",
    },
    {
      name: "Pre Workout",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKpylfj17pLLTS-1vWJu6Tt__SceNiUOdKXQ&s",
      path: "/catalog?category=pre Workout",
    },
    {
      name: "Caffeine",
      image: "https://m.media-amazon.com/images/I/71En4IUBcNL.jpg",
      path: "/catalog?category=caffeine",
    },
    {
      name: "Energy Drink",
      image:
        "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/large_78e9a229-9981-49b0-8845-a6af345bc834.jpg",
      path: "/catalog?category=energy drink",
    },
    {
      name: "Testosterone",
      image:
        "https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/msc/msc60311/y/62.jpg",
      path: "/catalog?category=testosterone booster",
    },
    {
      name: "Diuretics",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZMnwvrZazYIHLxOO4oPfUmVSIsKxiTuh2Jg&s",
      path: "/catalog?category=diuretics",
    },
    {
      name: "Multivitamins",
      image:
        "https://asitisnutrition.com/cdn/shop/products/ProductImage.jpg?v=1639026431&width=600",
      path: "/catalog?category=multivitamins",
    },
    {
      name: "Fish Oil",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLP2JkOv_aRx9sP5LovAbll8vKJ3APl0HW-w&s",
      path: "/catalog?category=fish Oil",
    },
    {
      name: "Probiotics",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLcUtX7JDjtEXQEmbpz9zyjfLZHw7E9bODVA&s",
      path: "/catalog?category=probiotics",
    },
    {
      name: "Bone Health",
      image:
        "https://www.nutrifactor.com.pk/cdn/shop/files/Bonex-D-30-New_grande.png?v=1717676296",
      path: "/catalog?category=bone health",
    },
    {
      name: "Stress Relief",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8S-5OPgLMjL9Dzg93R303GeZSDeabfRiS8Q&s",
      path: "/catalog?category=stress relief",
    },
    {
      name: "Collagen",
      image:
        "https://i5.walmartimages.com/seo/NeoCell-Super-Collagen-Tablets-with-Vitamin-C-and-Biotin-90-Count_7f9f455c-d5b8-4d85-b865-4932d3973627.da88e9c7090c0e2fa6871352e33db85c.jpeg",
      path: "/catalog?category=collagen",
    },
    {
      name: "CLA",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDrwUI5InBY2RZtBRuOm0YYwcfQfYXx1aKzg&s",
      path: "/catalog?category=cla",
    },
    {
      name: "Superfoods",
      image:
        "https://salt.tikicdn.com/cache/320x320/ts/product/ef/dd/19/8462142a6632751eff28f4ac6c9b3049.jpg",
      path: "/catalog?category=superfoods",
    },
    {
      name: "Equipment",
      image:
        "https://i.sportisimo.com/products/images/944/944624/700x700/fitforce-fitness-rukavice_2.jpg",
      path: "/catalog?category=equipment",
    },
    {
      name: "Shakers",
      image:
        "https://www.iceshaker.com/cdn/shop/files/36BLACK_36ozIceShaker_Black_3qtr.jpg?v=1694800764&width=2048",
      path: "/catalog?category=shakers",
    },
  ];

  return (
    <ul className="flex w-240 max-h-150 p-10 flex-wrap justify-evenly overflow-y-auto absolute -left-77 hidden bg-white rounded-xl shadow-md group-hover:flex">
      {categories.map((category) => (
        <CategoryItem
          key={category.name}
          name={category.name}
          img={category.image}
          path={category.path}
        />
      ))}
    </ul>
  );
}
