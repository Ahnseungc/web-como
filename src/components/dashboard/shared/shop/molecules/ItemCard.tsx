import Link from "next/link";
import Image from "next/image";
import Chip from "@/components/common/Chip";
import { Calendar, Marker, People } from "@/assets/icons/info";

interface Props {
  image?: any;
  id: number;
  location: string;
  name: string;
  category: string;
  description: string;
  maxPeople: number;
  timePerWeek: number;
  pricePerPerson: number;
}

export default function ItemCard(props: Props) {
  return (
    <Link href={`shop/item/${props.id}`} className="rounded-xl bg-gray-0">
      <div className="relative w-full aspect-square rounded-t-xl bg-orange-100">
        {props.image && (
          <Image
            src={props.image}
            alt="상품 이미지"
            fill
            sizes="30vw"
            className="rounded-t-xl"
          />
        )}
      </div>
      <div className="space-y-6 py-7 px-6">
        <div className="space-y-2">
          <div className="flex items-center gap-0.5 body-1 font-medium text-gray-500">
            <Marker className="w-[18px] h-[18px]" />
            {props.location}
          </div>
          <h4 className="h2 font-bold text-gray-900">{props.name}</h4>
          <Chip content={props.category} primary />
          <p className="body-1 font-medium text-gray-700 line-clamp-2">
            {props.description}
          </p>
          <div className="flex items-center gap-2 body-1 font-medium text-gray-500">
            <div className="flex items-center gap-1">
              <People className="w-5 h-5" />
              {`최대 ${props.maxPeople}명`}
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-[18px] h-[18px]" />
              {`주 ${props.timePerWeek}회`}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="h2 font-bold text-gray-900">{`${props.pricePerPerson.toLocaleString()}원~`}</span>
          <span className="h3 font-normal text-gray-500">{"/인"}</span>
        </div>
      </div>
    </Link>
  );
}
