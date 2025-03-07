import CustomSkeleton from "@/components/common/CustomSkeleton";

export default function ClubIndexLoading() {
  return (
    <div className="flex space-x-3">
      <section className="w-[24.5rem] space-y-6">
        <CustomSkeleton className="aspect-[390/446] w-full" />
        <CustomSkeleton className="h-15 w-full" />
      </section>

      <section className="flex flex-1 flex-col gap-15">
        <div className="flex w-full flex-col gap-6 rounded-xl bg-gray-0 p-8">
          <CustomSkeleton className="h-8 w-[5.5rem]" />
          <div className="flex flex-col gap-2">
            <CustomSkeleton className="h-7 w-[5.8rem]" />
            <CustomSkeleton className="h-[3.3rem] w-full" />
          </div>

          <div className="flex flex-col gap-2">
            <CustomSkeleton className="h-7 w-[5.8rem]" />
            <CustomSkeleton className="h-[3.3rem] w-full" />
          </div>

          <div className="flex flex-col gap-2">
            <CustomSkeleton className="h-7 w-[5.8rem]" />
            <CustomSkeleton className="h-[3.3rem] w-full" />
          </div>

          <div className="flex flex-col gap-2">
            <CustomSkeleton className="h-7 w-[5.8rem]" />
            <CustomSkeleton className="h-[3.3rem] w-full" />
          </div>

          <div className="flex flex-col gap-2">
            <CustomSkeleton className="h-7 w-[5.8rem]" />
            <CustomSkeleton className="h-[3.3rem] w-full" />
          </div>

          <div className="flex flex-col gap-2">
            <CustomSkeleton className="h-7 w-[5.8rem]" />
            <CustomSkeleton className="h-[3.3rem] w-full" />
          </div>

          <CustomSkeleton className="h-8 w-52" />
        </div>

        <div className="space-y-6 rounded-xl bg-gray-0 p-8">
          <CustomSkeleton className="h-8 w-[5.5rem]" />

          <div className="flex flex-col gap-2">
            <CustomSkeleton className="h-7 w-[5.8rem]" />
            <CustomSkeleton className="h-[3.3rem] w-full" />
          </div>

          <div className="flex flex-col gap-2">
            <CustomSkeleton className="h-7 w-[5.8rem]" />
            <CustomSkeleton className="h-[3.3rem] w-full" />
          </div>

          <CustomSkeleton className="aspect-square w-full" />
        </div>
      </section>
    </div>
  );
}
