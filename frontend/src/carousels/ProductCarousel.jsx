import { useEffect, useRef } from "react";

const books = [
  {
    title: "Atomic Habits",
    image:
      "https://readersspacenepal.com/wp-content/uploads/2023/01/atomic-habits3.jpg",
  },
  {
    title: "The Alchemist",
    image: "https://media.thuprai.com/front_covers/the-alchemist-pr4uo0w3.jpg",
  },
  {
    title: "Anatomía de Amores Inesperados",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgT6fxoaYkjBas5R2N8FasIefBa01wrDC0bw&s",
  },
  {
    title: "The Psychology of Money",
    image: "https://media.thuprai.com/front_covers/psychology-of-money.jpg",
  },
  {
    title: "Ego is the Enemy",
    image:
      "https://is1-ssl.mzstatic.com/image/thumb/Publication118/v4/a3/3e/52/a33e5208-0dc9-9c63-0378-df3c73fa0d60/9781782832836.jpg/1200x1200wz.jpg",
  },
  {
    title: "Felicigenia",
    image: "https://www.ynharari.com/wp-content/uploads/2017/01/sapiens.png",
  },
  {
    title: "Bhagavad Geeta",
    image:
      "https://i0.wp.com/iskconshop.com/wp-content/uploads/2023/11/394A9308-1.jpg",
  },
  {
    title: "Ramayan",
    image: "https://images.meesho.com/images/products/265760734/ahnsn_512.jpg",
  },
];

const ProductCarousel = () => {
  const carouselRef = useRef(null);
  const scrollAmount = 2; // Adjust for scroll speed
  const cloneCount = 2; // Number of times to clone items

  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current) {
        const scrollWidth = carouselRef.current.scrollWidth;
        const clientWidth = carouselRef.current.clientWidth;
        const maxScroll = scrollWidth - clientWidth;

        carouselRef.current.scrollLeft += scrollAmount;

        if (carouselRef.current.scrollLeft > maxScroll) {
          carouselRef.current.scrollLeft = 0;
        }
      }
    }, 30); // Adjust interval for smoothness

    return () => clearInterval(interval); // Cleanup on unmount
  }, [scrollAmount]);

  const renderClonedItems = (count) => {
    let clonedItems = [];
    for (let i = 0; i < count; i++) {
      clonedItems = clonedItems.concat(
        books.map((book, index) => (
          <div
            key={`clone-${i}-${index}`}
            className="min-w-[200px] max-w-[200px] flex-shrink-0 shadow-lg border rounded-lg overflow-hidden bg-white"
          >
            <img
              src={book.image}
              alt={book.title}
              className="h-40 mt-2 mb-2 w-full object-cover"
            />
            <div className="p-4">
              <h3 className="text-sm font-medium text-gray-900 text-center">
                {book.title}
              </h3>
            </div>
          </div>
        ))
      );
    }

    return clonedItems;
  };

  return (
    <div className="w-full py-6 px-4">
      <h2 className="text-lg font-bold mb-4 text-gray-800">
        Top Sellers in Books for You
      </h2>
      <div className="relative">
        {/* Carousel Container */}
        <div
          ref={carouselRef}
          className="flex overflow-x-auto gap-4 scroll-smooth scrollbar-hide px-2"
        >
          {/* Original items */}
          {books.map((book, index) => (
            <div
              key={index}
              className="min-w-[200px] max-w-[200px] flex-shrink-0 shadow-lg border rounded-lg overflow-hidden bg-white"
            >
              <img
                src={book.image}
                alt={book.title}
                className="h-40 mt-2 mb-2 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="text-sm font-medium text-gray-900 text-center">
                  {book.title}
                </h3>
              </div>
            </div>
          ))}

          {renderClonedItems(cloneCount)}
        </div>
      </div>
    </div>
  );
};
export default ProductCarousel;
