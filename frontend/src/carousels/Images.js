import Carousel from "./components/Carousel";

function Images() {
  const imageData = [
    {
      imageUrl: "/image1.jpg",
      altText: "Los Angeles",
      title: "Los Angeles",
      description: "5 Universities",
      linkText: "Explore",
    },
    {
      imageUrl: "/image2.jpg",
      altText: "Chicago",
      title: "Chicago",
      description: "14 Universities",
      linkText: "Explore",
    },
    {
      imageUrl: "/image3.jpg",
      altText: "Atlanta",
      title: "Atlanta",
      description: "4 Universities",
      linkText: "Explore",
    },
  ];

  return <Carousel images={imageData} autoPlay autoPlayInterval={3000} />;
}

export default Images;
