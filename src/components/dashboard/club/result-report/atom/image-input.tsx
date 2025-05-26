import { useRef, useState } from "react";
import { File } from "@/assets/icons/action";
import { CustomLabel } from "@/components/common/CustomLabel";
import { useFormContext } from "react-hook-form";
import { ResultReportSchemaType } from "@/lib/types/schema";

const ImageInput = ({ idx }: { idx: number }) => {
  const { setValue, watch } = useFormContext();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string>("");

  const handleInputClick = () => {
    fileInputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFileName(e.target.files[0].name);
    const currentReceipts = watch("receipts") || [];

    // setValue(`receipts`, [URL.createObjectURL(e.target.files[0])]);
    setValue("receipts", [...currentReceipts, e.target.files[0]]); // File 객체로 저장
  };

  return (
    <div className="relative w-full cursor-pointer flex flex-col gap-2">
      <CustomLabel htmlFor="image" labelText="이미지 첨부" required={true} />
      <div className="relative w-full h-[48px]">
        <input
          type="text"
          value={fileName}
          placeholder="이미지 첨부"
          readOnly
          onClick={handleInputClick}
          className="w-full bg-gray-100 h-full rounded-[6px] px-5 py-6 text-[18px] text-gray-400 font-bold outline-none cursor-pointer"
        />
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={handleChange}
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          <File className="text-gray-400" />
        </div>
      </div>
    </div>
  );
};

export default ImageInput;
