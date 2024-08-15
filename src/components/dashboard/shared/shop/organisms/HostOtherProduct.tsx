import HostOtherProductTable from "@/components/dashboard/shared/shop/molecules/HostOtherProductTable";

export default function HostOtherProduct() {
  return (
    <div className="space-y-6 p-8 rounded-xl bg-gray-0">
      <h3 className="h2 font-semibold text-gray-900">{"운영 상품"}</h3>
      <HostOtherProductTable />
    </div>
  );
}
