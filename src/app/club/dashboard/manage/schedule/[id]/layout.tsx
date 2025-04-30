import BackButton from "@/components/dashboard/common/BackButton";

const ScheduleDetailLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <>
      <BackButton />
      {children}
    </>
  );
};

export default ScheduleDetailLayout;
