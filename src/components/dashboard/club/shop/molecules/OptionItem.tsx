import Counter from "@/components/common/Counter";
import type { Option } from "@/components/dashboard/club/shop/organisms/ReservationPanel";

interface Props {
  option: Option;
  handleChangeQty: (newQty: number) => void;
}

export default function OptionItem({ option, handleChangeQty }: Props) {
  return (
    <div className="space-y-2.5 p-5 rounded-md bg-gray-100">
      <div className="flex flex-col gap-2">
        <span className="h4 font-medium text-gray-900">{option.name}</span>
        <span className="body-2 font-normal text-gray-400">{`${option.availableQty.toLocaleString()}개 남음`}</span>
      </div>
      <div className="flex justify-between">
        <Counter
          minValue={0}
          maxValue={option.availableQty}
          currentValue={option.selectedQty}
          handleChange={handleChangeQty}
        />
        <span className="body-1 font-bold text-gray-900">
          {`${option.price.toLocaleString()}원`}
        </span>
      </div>
    </div>
  );
}
