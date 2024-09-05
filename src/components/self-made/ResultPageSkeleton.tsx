import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const HotelCardSkeleton = () => {
  return (
    <Card className="flex mt-2 w-full border border-gray-300 rounded-lg shadow-md">
      <CardHeader className="w-1/3">
        <Skeleton className="w-full h-48 rounded-l-lg" />
      </CardHeader>
      <CardContent className="w-2/3 p-4">
        <div className="flex justify-between gap-8 mt-2">
          <div>
            <Skeleton className="h-6 w-48 mb-2" />
            <div className="flex gap-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="h-4 w-36 mt-2" />
          </div>
          <div>
            <div className="flex gap-2 h-fit">
              <div className="flex flex-col items-end">
                <Skeleton className="h-5 w-20 mb-1" />
                <Skeleton className="h-4 w-24" />
              </div>
              <Skeleton className="w-10 h-8 rounded" />
            </div>
            <Skeleton className="h-4 w-28 mt-2" />
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <div>
            <Skeleton className="h-4 w-32 mb-2" />
            <Skeleton className="h-4 w-40 mb-1" />
            <Skeleton className="h-4 w-56" />
          </div>
          <div className="flex items-end">
            <div className="text-right">
              <Skeleton className="h-4 w-20 mb-1" />
              <Skeleton className="h-6 w-24 mb-1" />
              <Skeleton className="h-3 w-32 mb-2" />
              <Skeleton className="h-9 w-32" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const HotelResultsSkeleton = ({ count = 3 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <HotelCardSkeleton key={index} />
      ))}
    </>
  );
};

export default HotelResultsSkeleton;
