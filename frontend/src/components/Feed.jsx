// import Posts from "./Posts";

// const Feed = () => {
//   return (
//     <div className="flex-1  my-8 flex flex-col items-center pl-[20%]">
//       <h1 className="text-white text-xl font-bold">Today's Picks</h1>
//       <Posts />
//       <h1 className="text-white text-xl font-bold">
//         Women's Clothing & Accessories
//       </h1>
//       <hr className="border-t border-red-600 my-4" />

//       <Posts />

//       <h1 className="text-white text-xl font-bold">Electronics</h1>
//       <hr className="border-t border-red-600 my-4" />

//       <Posts />
//     </div>
//   );
// };

// export default Feed;

import Posts from "./Posts";

const Feed = () => {
  return (
    <div className="flex-1 my-8 flex flex-col items-start pl-[20%] pr-8">
      <div className="w-full mb-8">
        <h1 className="text-white ml-8 text-2xl font-semibold mb-4">
          Today's Picks
        </h1>
        <Posts />
      </div>

      <Section title="Women's Clothing & Accessories" />
      <Section title="Electronics" />
    </div>
  );
};

const Section = ({ title }) => (
  <div className="w-full mb-8">
    <h1 className="text-white  text-center text-2xl font-semibold mb-4">
      {title}
    </h1>
    <hr className="border-t-2 border-gray-700 mb-6" />
    <Posts />
  </div>
);

export default Feed;
