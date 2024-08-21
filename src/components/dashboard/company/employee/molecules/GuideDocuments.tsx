export default function GuideDocuments() {
  return (
    <div className="space-y-8 p-8 rounded-xl bg-gray-800">
      <h2 className="h1 font-bold text-gray-0">{"필수 안내서 업로드"}</h2>
      <div className="flex">
        <div className="flex-1 space-y-3 text-center border-r border-gray-700">
          <div className="h1 font-extrabold text-gray-0">{1}</div>
          <div className="h4 font-medium text-gray-500">{"활동비 안내서"}</div>
        </div>
        <div className="flex-1 space-y-3 text-center">
          <div className="h1 font-extrabold text-gray-0">{2}</div>
          <div className="h4 font-medium text-gray-500">{"비품 안내서"}</div>
        </div>
      </div>
    </div>
  );
}
