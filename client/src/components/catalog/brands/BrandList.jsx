import BrandListItem from "./BrandListItem";

export default function BrandList() {
  const brands = [
    {
      name: "Ryse",
      image:
        "https://portal2.distone.com/MUSCLEFOODAPI/Content/it_majcls/RYS.webp?v=9/13/2023",
      path: "/catalog?brand=Ryse",
    },
    {
      name: "Bodybuilding.com Signature",
      image:
        "https://shop.bodybuilding.com/cdn/shop/files/bbcom-logos-tm-rgb-blue-primary_b0f87090-e853-49d2-bb6c-05a0a7322b70.png?height=628&pad_color=fff&v=1710959471&width=1200",
      path: "/catalog?brand=Bodybuilding.com Signature",
    },
    {
      name: "Dymatize",
      image:
        "https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/032018/untitled-1_316.png?aAPu5HCw_BQg33nbWkpuIwRQ.cTnqxtD&itok=sJbKRgTT",
      path: "/catalog?brand=Dymatize",
    },
    {
      name: "Kaged",
      image:
        "https://www.healthtwin.co.za/cdn/shop/collections/Kaged_logo.png?v=1696577755",
      path: "/catalog?brand=Kaged",
    },
    {
      name: "Nutrex Research, Inc.",
      image:
        "https://seeklogo.com/images/N/nutrex-research-logo-9461FE3AF9-seeklogo.com.png",
      path: "/catalog?brand=Nutrex Research, Inc.",
    },
    {
      name: "Ice Shaker",
      image:
        "https://amazon-omni-cdn.com/qfke2h7iol2/9qpt9rs40yaht4/494cb6a7-3756-44b3-a227-b232aae797aa.jpeg",
      path: "/catalog?brand=Ice Shaker",
    },
    {
      name: "Mutant",
      image:
        "https://ih1.redbubble.net/image.923750079.5499/tst,small,845x845-pad,1000x1000,f8f8f8.jpg",
      path: "/catalog?brand=Mutant",
    },
    {
      name: "Jocko Fuel",
      image:
        "https://www.nat-dist.com/wp-content/uploads/2024/01/jocko-fuel-scaled.jpg",
      path: "/catalog?brand=Jocko Fuel",
    },
    {
      name: "PANDA",
      image:
        "https://sportlifedistribution.com/wp-content/uploads/2024/12/PANDA-SUPPLEMENTS-1-300x300.jpg",
      path: "/catalog?brand=PANDA",
    },
    {
      name: "Ancient Nutrition",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxwbcxlf-LWcbthMwpKeK70pCN-MvCUX6vRA&s",
      path: "/catalog?brand=Ancient Nutrition",
    },
  ];

  return (
    <ul className="flex w-240 max-h-150 pt-10 p-2 flex-wrap overflow-y-auto absolute -left-115 hidden justify-evenly bg-white rounded-xl shadow-md group-hover:flex">
      {brands.map((brand) => (
        <BrandListItem
          key={brand.name}
          name={brand.name}
          img={brand.image}
          path={brand.path}
        />
      ))}
    </ul>
  );
}
