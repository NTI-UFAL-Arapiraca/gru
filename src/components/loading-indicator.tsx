export function LoadingIndicator() {
  return (
    <div className="flex relative justify-center gap-1">
      <span className="h-2 w-2 rounded-full animate-pulse bg-white"></span>
      <span className="h-2 delay-150 w-2 rounded-full animate-pulse bg-white"></span>
      <span className="h-2 w-2 delay-300 rounded-full animate-pulse bg-white"></span>
      <span className="sr-only">Loading</span>
    </div>
  );
}
