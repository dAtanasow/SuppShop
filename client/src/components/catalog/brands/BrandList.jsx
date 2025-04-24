import BrandListItem from "./BrandListItem";

export default function BrandList({ isMobile = false, onItemClick }) {
  const brands = [
    {
      name: "6AM Run",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbkUKSvD0hR8YFECQt1j8htX6AVoqjCAw9RA&s",
      path: "/catalog?brand=6AM Run",
    },
    {
      name: "All Black Everything",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYaH0tCdP5As5lNOfIEsU4je-xJNP1tY8mDQ&s",
      path: "/catalog?brand=All Black Everything",
    },
    {
      name: "Ancient",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxwbcxlf-LWcbthMwpKeK70pCN-MvCUX6vRA&s",
      path: "/catalog?brand=Ancient",
    },
    {
      name: "Barebells",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMxLncZAjd4AMp9HadZt2_aLenNxSDT1Ku2w&s",
      path: "/catalog?brand=Barebells",
    },
    {
      name: "Bodybuilding.com Signature",
      image:
        "https://shop.bodybuilding.com/cdn/shop/files/bbcom-logos-tm-rgb-blue-primary_b0f87090-e853-49d2-bb6c-05a0a7322b70.png?height=628&pad_color=fff&v=1710959471&width=1200",
      path: "/catalog?brand=Bodybuilding.com Signature",
    },
    {
      name: "BPI Sports",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYwjjDlLJ3ovSXvPdbb1kgIGYMoxtApgu45g&s",
      path: "/catalog?brand=BPI Sports",
    },
    {
      name: "BSN",
      image:
        "https://www.bsn-supplements.com/en-gb/wp-content/themes/bdstarter/assets/images/logo-signup.png",
      path: "/catalog?brand=BSN",
    },
    {
      name: "Cellucor",
      image:
        "https://seeklogo.com/images/C/cellucor-logo-A079CDB7F7-seeklogo.com.png",
      path: "/catalog?brand=Cellucor",
    },
    {
      name: "Dymatize",
      image:
        "https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/032018/untitled-1_316.png?aAPu5HCw_BQg33nbWkpuIwRQ.cTnqxtD&itok=sJbKRgTT",
      path: "/catalog?brand=Dymatize",
    },
    {
      name: "EHP",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgaiGvg6b0GGt1_5GbZlgQJqwMiJ8P-4OTew&s",
      path: "/catalog?brand=EHP",
    },
    {
      name: "Evlution",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRm5iHUTEsFCCeugYZKPHoNNmgqLiGiKopzMg&s",
      path: "/catalog?brand=Evlution",
    },
    {
      name: "Happy Hydrate",
      image:
        "https://media.licdn.com/dms/image/sync/v2/D4D27AQG462D4ON474A/articleshare-shrink_800/articleshare-shrink_800/0/1719072233378?e=2147483647&v=beta&t=DI4DMOqjoik1htTt5M4t-OdqGqsHva9fL1zFK4wAX8Q",
      path: "/catalog?brand=Happy Hydrate",
    },
    {
      name: "Ice Shaker",
      image:
        "https://amazon-omni-cdn.com/qfke2h7iol2/9qpt9rs40yaht4/494cb6a7-3756-44b3-a227-b232aae797aa.jpeg",
      path: "/catalog?brand=Ice Shaker",
    },
    {
      name: "Jocko Fuel",
      image:
        "https://www.nat-dist.com/wp-content/uploads/2024/01/jocko-fuel-scaled.jpg",
      path: "/catalog?brand=Jocko Fuel",
    },
    {
      name: "Kaged",
      image:
        "https://www.healthtwin.co.za/cdn/shop/collections/Kaged_logo.png?v=1696577755",
      path: "/catalog?brand=Kaged",
    },
    {
      name: "Kodagenix",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhTil4g7ogDvz9aYM4dtlo9JyBHrTBGXl9rg&s",
      path: "/catalog?brand=Kodagenix",
    },
    {
      name: "Me Today",
      image:
        "https://cdn.shopify.com/s/files/1/0645/1875/0439/files/site_logo.png?height=628&pad_color=ffffff&v=1653514368&width=1200",
      path: "/catalog?brand=Me Today",
    },
    {
      name: "MRI Performance",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpi0c_GKr57fZ63jDb7RgwjRuyt-l9AhutBg&s",
      path: "/catalog?brand=MRI Performance",
    },
    {
      name: "MuscleSport",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDuGMURiy1sSZ2gwIGpWqAAjX0PY5fqyxQLg&s",
      path: "/catalog?brand=MuscleSport",
    },
    {
      name: "Mutant",
      image:
        "https://mutantnation.com/cdn/shop/files/95003MUTANT_RUGGEDTruckWindowDecal-Red_WhiteA-MS.jpg?v=1690438242&width=1080",
      path: "/catalog?brand=Mutant",
    },
    {
      name: "Nutrex",
      image:
        "https://seeklogo.com/images/N/nutrex-research-logo-9461FE3AF9-seeklogo.com.png",
      path: "/catalog?brand=Nutrex",
    },
    {
      name: "PANDA",
      image:
        "https://sportlifedistribution.com/wp-content/uploads/2024/12/PANDA-SUPPLEMENTS-1-300x300.jpg",
      path: "/catalog?brand=PANDA",
    },
    {
      name: "Pro Supps",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9A44jbFXdj7y_okx6I8oaekhOuwT-FhVqHg&s",
      path: "/catalog?brand=Pro Supps",
    },
    {
      name: "Prolab",
      image: "https://fpower.bg/image/cache/data/marki/pro-lab-600x315.jpg",
      path: "/catalog?brand=Prolab",
    },
    {
      name: "REMIX",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQL99jlptCRmekPpCBcmVW2AX5myXjDjJIuAA&s",
      path: "/catalog?brand=REMIX",
    },
    {
      name: "Ryse",
      image:
        "https://portal2.distone.com/MUSCLEFOODAPI/Content/it_majcls/RYS.webp?v=9/13/2023",
      path: "/catalog?brand=Ryse",
    },
    {
      name: "SNAP",
      image:
        "https://easternstates.heart.org/wp-content/uploads/sites/14/2021/01/SNAp-logo.png",
      path: "/catalog?brand=SNAP",
    },
    {
      name: "Unmatched",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2xtQVxeP6-BInEEb3P0Sp6Lpth46uyji2jQ&s",
      path: "/catalog?brand=Unmatched",
    },
    {
      name: "Vitargo",
      image:
        "https://www.nutritionsystems.com.au/media/Logos/Vitargo/Vitargo_Logo_Stacked.png",
      path: "/catalog?brand=Vitargo",
    },
    {
      name: "Xtend",
      image: "https://nutrafit.bg/image/catalog/XTEND_Logo.jpg",
      path: "/catalog?brand=Xtend",
    },
  ];

  return (
    <ul
      className={
        isMobile
          ? "grid grid-cols-3 sm:grid-cols-4 gap-2 pr-5 justify-items-center"
          : "flex w-240 max-h-150 pt-10 p-2 flex-wrap overflow-y-auto absolute -left-115 hidden justify-evenly bg-white rounded-xl shadow-md group-hover:flex"
      }
    >
      {brands.map((brand) => (
        <BrandListItem
          key={brand.name}
          name={brand.name}
          img={brand.image}
          path={brand.path}
          onClick={onItemClick}
        />
      ))}
    </ul>
  );
}
