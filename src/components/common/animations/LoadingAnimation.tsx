import LoadingSpinner from "../LoadingSpinner";

const LoadingAnimation = () => {
  return (
    <div className="z-[999] fixed flex w-full  h-screen justify-center items-center bg-gray-700 bg-opacity-30 gap-2">
      <LoadingSpinner />
    </div>
  );
};

export default LoadingAnimation;
