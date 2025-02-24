const LovedProducts = () => {
  const categories = [
    {
      title: "Most-loved watches",
      items: [
        {
          name: "Women",
          image:
            "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2024/BAU2024Aug/WomenWatches_1x._SY116_CB564394432_.jpg",
        },
        {
          name: "Men",
          image:
            "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2024/BAU2024Aug/MenWatches_1x._SY116_CB564394432_.jpg",
        },
        {
          name: "Girls",
          image:
            "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2024/BAU2024Aug/GirlWatches_1x._SY116_CB564394432_.jpg",
        },
        {
          name: "Boys",
          image:
            "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2024/BAU2024Aug/BoyWatches_1x._SY116_CB564394432_.jpg",
        },
      ],
      footerText: "Discover more",
    },
    {
      title: "Most-loved travel essentials",
      items: [
        {
          name: "Backpacks",
          image:
            "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2024/BAU2024Aug/Backpack_1x._SY116_CB566100767_.jpg",
        },
        {
          name: "Suitcases",
          image:
            "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2024/BAU2024Aug/TravelBag_1x._SY116_CB566100767_.jpg",
        },
        {
          name: "Accessories",
          image:
            "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2024/BAU2024Aug/Accessories_1x._SY116_CB566100767_.jpg",
        },
        {
          name: "Handbags",
          image:
            "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2024/BAU2024Aug/Handbags_1x._SY116_CB566100767_.jpg",
        },
      ],
      footerText: "Discover more",
    },
    {
      title: "Level up your beauty routine",
      items: [
        {
          name: "Makeup",
          image:
            "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2024/DskBTFQuadCards/Fuji_BTF_Quad_Cards_1x_Make-up._SY116_CB558654384_.jpg",
        },
        {
          name: "Brushes",
          image:
            "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2024/DskBTFQuadCards/Fuji_BTF_Quad_Cards_1x_Brushes._SY116_CB558654384_.jpg",
        },
        {
          name: "Sponges",
          image:
            "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2024/DskBTFQuadCards/Fuji_BTF_Quad_Cards_1x_Sponges._SY116_CB558654384_.jpg",
        },
        {
          name: "Mirrors",
          image:
            "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2024/DskBTFQuadCards/Fuji_BTF_Quad_Cards_1x_Mirrors._SY116_CB558654384_.jpg",
        },
      ],
      footerText: "See more",
    },
    {
      title: "Gaming Corner",
      items: [
        {
          name: "For all your gaming needs",
          image:
            "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2024/BAUOct2024/Gaming_zone_1x._SY304_CB540253513_.jpg",
        },
      ],
      footerText: "Explore gaming essentials",
    },
  ];

  const CategoryCard = ({ title, items, footerText }) => {
    return (
      <>
        <div className="mb-4 ">
          <div className="bg-white border rounded-lg shadow-sm p-4">
            <h2 className="text-lg font-bold mb-4">{title}</h2>
            <div className="grid grid-cols-2 gap-4">
              {items.map((item, index) => (
                <div key={index} className="flex flex-col items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-40 object-contain rounded-lg"
                  />
                  <p className="text-sm font-medium mt-2">{item.name}</p>
                </div>
              ))}
            </div>
            <a
              href="#"
              className="text-blue-600 text-sm mt-4 block hover:underline"
            >
              {footerText}
            </a>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="p-6 mx-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {categories.map((category, index) => (
        <CategoryCard
          key={index}
          title={category.title}
          items={category.items}
          footerText={category.footerText}
        />
      ))}
    </div>
  );
};

export default LovedProducts;
