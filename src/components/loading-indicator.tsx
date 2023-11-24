export function LoadingIndicator() {
  return (
    <div className="relative flex justify-center gap-1">
      <span className="h-2 w-2 animate-pulse rounded-full bg-white"></span>
      <span className="h-2 w-2 animate-pulse rounded-full bg-white delay-150"></span>
      <span className="h-2 w-2 animate-pulse rounded-full bg-white delay-300"></span>
      <span className="sr-only">Loading</span>
    </div>
  );
}
