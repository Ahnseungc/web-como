import HostOtherProductsTable from "@/components/dashboard/club/reservation/molecules/HostOtherProductsTable";

export default function HostOtherProducts(){
	return (
    <div className="space-y-6 p-8 rounded-xl bg-gray-0">
      <h3 className="h2 font-semibold text-gray-900">{"호스트의 다른 상품"}</h3>
	  <HostOtherProductsTable />
    </div>
  );
}