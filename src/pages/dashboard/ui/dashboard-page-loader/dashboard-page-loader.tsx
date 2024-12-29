import { Skeleton } from "@/shared/ui/skeleton";

const DashboardColumnSkeleton = ({
  itemsCount = 1,
}: {
  itemsCount?: number;
}) => {
  return (
    <Skeleton className="border-primary/10 bg-transparent border-2 p-3">
      <Skeleton className="h-6 w-[150px] mb-3" />
      {Array.from({ length: itemsCount }).map((_, index) => (
        <Skeleton
          key={index}
          className="h-[140px] w-full border-primary/10 bg-transparent border-2 p-4 flex flex-col mb-3"
        >
          <Skeleton className="h-4 w-[120px] mb-4" />
          <Skeleton className="h-6 w-[180px]" />
          <Skeleton className="h-4 w-[46px] mt-auto" />
        </Skeleton>
      ))}
    </Skeleton>
  );
};

export const DashboardPageLoader = () => {
  return (
    <div className="flex flex-col h-full">
      <Skeleton className="h-8 w-[250px] mb-3" />
      <div className="grid grid-cols-5 gap-4 h-full">
        <DashboardColumnSkeleton />
        <DashboardColumnSkeleton itemsCount={2}/>
        <DashboardColumnSkeleton />
        <DashboardColumnSkeleton itemsCount={3}/>
        <DashboardColumnSkeleton />
      </div>
    </div>
  );
};
