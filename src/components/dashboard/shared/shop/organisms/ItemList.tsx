import ItemCard from "@/components/dashboard/shared/shop/molecules/ItemCard";
import Thumbnail from "@/assets/images/shop/spain_thumbnail.png";

const itemList = [
  {
    id: 1,
    image: Thumbnail,
    location: "스페인 바르셀로나",
    name: "고고에스파냐",
    category: "액티비티",
    description:
      "스페인 바르셀로나 일주일 살기: 바쁜 직장인을 위한 가성비 트립 콘텐츠",
    maxPeople: 30,
    timePerWeek: 1,
    pricePerPerson: 30000,
  },
  {
    id: 2,
    location: "서울 구로구",
    name: "상품명",
    category: "카테고리",
    description:
      "상품 상세 설명은 최대 2줄입니다. 그 이상은 점점점 처리됩니다. 상품 상세 설명은 최대 2줄입니다. 그 이상은 점점점 처리됩니다.",
    maxPeople: 23,
    timePerWeek: 1,
    pricePerPerson: 30000,
  },
  {
    id: 3,
    location: "서울 구로구",
    name: "상품명",
    category: "카테고리",
    description:
      "상품 상세 설명은 최대 2줄입니다. 그 이상은 점점점 처리됩니다. 상품 상세 설명은 최대 2줄입니다. 그 이상은 점점점 처리됩니다.",
    maxPeople: 23,
    timePerWeek: 1,
    pricePerPerson: 30000,
  },
  {
    id: 4,
    location: "서울 구로구",
    name: "상품명",
    category: "카테고리",
    description:
      "상품 상세 설명은 최대 2줄입니다. 그 이상은 점점점 처리됩니다. 상품 상세 설명은 최대 2줄입니다. 그 이상은 점점점 처리됩니다.",
    maxPeople: 23,
    timePerWeek: 1,
    pricePerPerson: 30000,
  },
  {
    id: 5,
    location: "서울 구로구",
    name: "상품명",
    category: "카테고리",
    description:
      "상품 상세 설명은 최대 2줄입니다. 그 이상은 점점점 처리됩니다. 상품 상세 설명은 최대 2줄입니다. 그 이상은 점점점 처리됩니다.",
    maxPeople: 23,
    timePerWeek: 1,
    pricePerPerson: 30000,
  },
  {
    id: 6,
    location: "서울 구로구",
    name: "상품명",
    category: "카테고리",
    description:
      "상품 상세 설명은 최대 2줄입니다. 그 이상은 점점점 처리됩니다. 상품 상세 설명은 최대 2줄입니다. 그 이상은 점점점 처리됩니다.",
    maxPeople: 23,
    timePerWeek: 1,
    pricePerPerson: 30000,
  },
  {
    id: 7,
    location: "서울 구로구",
    name: "상품명",
    category: "카테고리",
    description:
      "상품 상세 설명은 최대 2줄입니다. 그 이상은 점점점 처리됩니다. 상품 상세 설명은 최대 2줄입니다. 그 이상은 점점점 처리됩니다.",
    maxPeople: 23,
    timePerWeek: 1,
    pricePerPerson: 30000,
  },
  {
    id: 8,
    location: "서울 구로구",
    name: "상품명",
    category: "카테고리",
    description:
      "상품 상세 설명은 최대 2줄입니다. 그 이상은 점점점 처리됩니다. 상품 상세 설명은 최대 2줄입니다. 그 이상은 점점점 처리됩니다.",
    maxPeople: 23,
    timePerWeek: 1,
    pricePerPerson: 30000,
  },
  {
    id: 9,
    location: "서울 구로구",
    name: "상품명",
    category: "카테고리",
    description:
      "상품 상세 설명은 최대 2줄입니다. 그 이상은 점점점 처리됩니다. 상품 상세 설명은 최대 2줄입니다. 그 이상은 점점점 처리됩니다.",
    maxPeople: 23,
    timePerWeek: 1,
    pricePerPerson: 30000,
  },
  {
    id: 10,
    location: "서울 구로구",
    name: "상품명",
    category: "카테고리",
    description:
      "상품 상세 설명은 최대 2줄입니다. 그 이상은 점점점 처리됩니다. 상품 상세 설명은 최대 2줄입니다. 그 이상은 점점점 처리됩니다.",
    maxPeople: 23,
    timePerWeek: 1,
    pricePerPerson: 30000,
  },
];

export default function ItemList() {
  return (
    <div className="grid grid-cols-4 gap-3 xl:gap-5">
      {itemList.map((item) => (
        <ItemCard key={item.id} {...item} />
      ))}
    </div>
  );
}
