import ApplicationGuide from "@/components/dashboard/expanse/molecules/ApplicationGuide";
import ExpanseList from "@/components/dashboard/expanse/organisms/ExpanseList";
import ExpanseSearch from "@/components/dashboard/expanse/organisms/ExpanseSearch";

export default function ExpansePage() {
  return (
    <>
      <ApplicationGuide />
      <ExpanseSearch />
      <ExpanseList />
    </>
  );
}
