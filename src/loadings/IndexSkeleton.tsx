import { Skeleton } from "@/components/ui/skeleton";

const IndexSkeleton = () => {
  return (
    <div className="min-h-screen bg-background">

      {/* Navbar Skeleton */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            <div className="flex items-center gap-2">
              <Skeleton className="w-8 h-8 rounded-lg" />
              <Skeleton className="w-24 h-5" />
            </div>

            <div className="flex items-center gap-4">
              <Skeleton className="w-24 h-8 rounded-md" />
              <Skeleton className="w-20 h-8 rounded-md" />
            </div>

          </div>
        </div>
      </nav>

      {/* Hero Skeleton */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-5xl mx-auto text-center">

          {/* badge */}
          <Skeleton className="w-64 h-8 mx-auto rounded-full mb-8" />

          {/* title */}
          <div className="space-y-4 mb-6">
            <Skeleton className="h-12 w-3/4 mx-auto" />
            <Skeleton className="h-12 w-2/3 mx-auto" />
          </div>

          {/* paragraph */}
          <div className="space-y-2 mb-10">
            <Skeleton className="h-5 w-full max-w-2xl mx-auto" />
            <Skeleton className="h-5 w-5/6 max-w-2xl mx-auto" />
            <Skeleton className="h-5 w-4/6 max-w-2xl mx-auto" />
          </div>

          {/* buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Skeleton className="w-40 h-12 rounded-lg" />
            <Skeleton className="w-40 h-12 rounded-lg" />
          </div>

        </div>
      </section>

      {/* Features Skeleton */}
      <section className="py-20 px-4 bg-card/50">
        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-16 space-y-3">
            <Skeleton className="h-8 w-80 mx-auto" />
            <Skeleton className="h-4 w-96 mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="border border-border/50 rounded-2xl p-8 text-center space-y-4"
              >
                <Skeleton className="w-14 h-14 mx-auto rounded-xl" />
                <Skeleton className="h-5 w-40 mx-auto" />
                <Skeleton className="h-4 w-56 mx-auto" />
                <Skeleton className="h-4 w-48 mx-auto" />
              </div>
            ))}

          </div>

        </div>
      </section>

      {/* CTA Skeleton */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center border border-border/50 rounded-3xl p-12 space-y-6">

          <Skeleton className="h-8 w-72 mx-auto" />
          <Skeleton className="h-4 w-96 mx-auto" />

          <Skeleton className="w-40 h-12 mx-auto rounded-lg" />

        </div>
      </section>

      {/* Footer Skeleton */}
      <footer className="py-8 px-4 border-t border-border/50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">

          <div className="flex items-center gap-2">
            <Skeleton className="w-5 h-5" />
            <Skeleton className="w-20 h-4" />
          </div>

          <Skeleton className="w-48 h-4" />

        </div>
      </footer>

    </div>
  );
};

export default IndexSkeleton;