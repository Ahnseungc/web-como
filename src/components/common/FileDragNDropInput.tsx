import { InputLabel } from "@/components/common/Input";
import DragNDrop from "@/components/common/DragNDrop";
import { Document } from "@/assets/icons/util";

interface Props {
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

export default function FileDragNDropInput({ setFiles }: Props) {
  return (
    <div className="space-y-2">
      <InputLabel required label="파일 첨부" />
      <DragNDrop
        onFilesChange={setFiles}
        style="flex items-center justify-center gap-1 h-32 rounded-md border border-gray-400 h4 font-medium text-gray-500 bg-gray-0"
        placeholder={
          <>
            <Document className="w-6 h-6" />
            {"파일을 마우스로 끌어오거나, 하단 '내 PC' 버튼을 클릭하세요."}
          </>
        }
      />
      <div className="flex justify-between">
        <div className="body-1 font-medium text-gray-500">
          {"첨부파일은 한 게시글 당 최대 50MB까지 등록 가능합니다."}
        </div>
        <button
          type="button"
          className="py-2 px-4 rounded-md body-1 font-semibold text-gray-700 bg-gray-200 cursor-pointer"
          onClick={() => {
            const input = document.querySelector(
              "input#drag-drop"
            ) as HTMLInputElement;
            input.click();
          }}
        >
          {"내 PC"}
        </button>
      </div>
    </div>
  );
}
