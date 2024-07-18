import ItemCard from "@/components/dashboard/reservation/molecules/ItemCard";

const itemList = [
  {
    id: 1,
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
    <div className="flex flex-wrap justify-center gap-4">
      {itemList.map((item) => (
        <ItemCard key={item.id} {...item} />
      ))}
    </div>
  );
}
