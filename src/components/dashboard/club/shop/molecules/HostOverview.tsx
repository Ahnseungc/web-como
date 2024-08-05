import Avatar from "@/components/common/Avatar";

export default function HostOverview() {
  return (
    <div className="space-y-6 p-8 rounded-xl bg-gray-0">
      <div className="flex items-center gap-4">
        <Avatar size="min-w-20 min-h-20" />
        <div className="space-y-1">
          <h2 className="font-bold text-gray-900">{"호스트명"}</h2>
          <div className="flex gap-3 h3 font-medium text-gray-500">
            <span>{"상품수 999+"}</span>
            <span>{"후기 999+"}</span>
            <span>{"좋아요 999+"}</span>
          </div>
        </div>
      </div>
      <div className="break-keep h3 font-medium text-gray-900">
        {
          "최고의 서비스와 컨텐츠를 위해 항상 고민하고 연구하는 커피클래스 호스트 커피스트입니다! 커피를 사랑하는 사람들끼리 모여 커피 공부도 하고 시음도 해요!ㅎㅎ"
        }
      </div>
    </div>
  );
}
