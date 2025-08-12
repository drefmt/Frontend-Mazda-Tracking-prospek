

export default function NotFound() {
  return (
<div className="flex items-center justify-center h-[100%] bg-white text-black">
  <div className="flex items-center gap-4  px-6 py-4">
    <div className="text-6xl font-bold">404</div>
    <div className="text-6xl">|</div>
    <div className="flex">
      <h1 className="text-lg text-gray-900">
        This page could not be found.
      </h1>  
    </div>
  </div>
</div>

  );
}
