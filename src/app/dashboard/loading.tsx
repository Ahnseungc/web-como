import Skeleton from "@/components/common/Skeleton";

export default function Loading() {
  return (
    <div className="w-full h-full">
      <div className="animate-loading-progress h-1 bg-brand-orange" />
      <section className="flex flex-col gap-3 w-full p-8">
        <div className="space-y-3 p-4 rounded-xl bg-gray-50">
          <Skeleton />
          <div className="flex gap-3">
            <Skeleton big size="w-full max-w-[382px] h-[143px]" />
            <Skeleton big size="w-full max-w-[382px] h-[143px]" />
            <Skeleton big size="w-full max-w-[382px] h-[143px]" />
            <Skeleton big size="w-full max-w-[382px] h-[143px]" />
          </div>
        </div>
        <div className="space-y-3 p-4 rounded-xl bg-gray-50">
          <Skeleton />
          <Skeleton size="w-full max-w-[385px] h-[44px]" />
          <div className="flex gap-3">
            <Skeleton big size="w-full max-w-[220px] h-[336px]" />
            <Skeleton big size="w-full max-w-[120px] h-[336px]" />
            <Skeleton big size="w-full max-w-[528px] h-[336px]" />
            <Skeleton big size="w-full max-w-[120px] h-[336px]" />
            <Skeleton big size="w-full max-w-[528px] h-[336px]" />
          </div>
        </div>
      </section>
    </div>
  );
}
