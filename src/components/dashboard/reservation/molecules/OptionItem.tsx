export default function OptionItem() {
  return (
    <div className="space-y-2.5 p-5 rounded-md bg-gray-100">
      <div className="flex flex-col gap-2">
        <span className="h4 font-medium text-gray-900">{"옵션명"}</span>
        <span className="body-2 font-normal text-gray-400">{"100개남음"}</span>
      </div>
      <div className="flex justify-between">
        <div></div>
        <span className="body-1 font-bold text-gray-900">{"135,000원"}</span>
      </div>
    </div>
  );
}
