export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold">일정을 찾을 수 없습니다</h2>
      <p className="text-gray-600">
        요청하신 일정이 존재하지 않거나 삭제되었습니다.
      </p>
    </div>
  );
}
