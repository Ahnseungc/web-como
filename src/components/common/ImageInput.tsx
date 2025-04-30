"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { Plus, Remove } from "@/assets/icons/action";

interface Props {
  name: string;
  currentImages: File[];
  setCurrentImages?: React.Dispatch<React.SetStateAction<File[]>>;
  label?: string;
  required?: boolean;
  readonly?: boolean;
  caption?: string;
  max?: number;
  acceptDocs?: boolean;
}

export default function ImageInput(props: Props) {
  console.log(props.currentImages);
  return (
    <div className="flex-1 flex flex-col gap-2">
      <span className="h3 font-semibold text-gray-900">
        {props.label}
        {props.required && <span className="text-point-red">{"*"}</span>}
      </span>
      <div className="flex gap-2">
        {props.currentImages &&
          props.currentImages.length > 0 &&
          props.currentImages.map((image, i) => (
            <div key={i} className="relative object-cover w-[100px] h-[100px]">
              <Image
                src={URL.createObjectURL(image)}
                alt={`사진 ${i}`}
                fill
                sizes="10vw"
                priority
                className="rounded-lg"
              />
              {!props.readonly && (
                <button
                  className="absolute top-1 right-1"
                  onClick={() =>
                    props.setCurrentImages?.((prev) =>
                      prev.filter((value) => value !== image)
                    )
                  }
                >
                  <Remove className="w-[18px] h-[18px] text-gray-900" />
                </button>
              )}
            </div>
          ))}
        {!props.readonly && (
          <label
            htmlFor={props.name}
            className={cn(
              "flex items-center justify-center w-[100px] h-[100px] rounded-lg bg-gray-1000 cursor-pointer",
              props.currentImages?.length === props.max ? "hidden" : ""
            )}
          >
            <Plus className="w-8 h-8 text-gray-50" />
            <input
              type="file"
              accept={props.acceptDocs ? ".hwp, .doc, .docx" : "image/*"}
              name={props.name}
              id={props.name}
              onChange={(e) => {
                const fileList = e.target.files;
                if (fileList && fileList.length > 0) {
                  props.setCurrentImages?.((prev) =>
                    prev.concat(Array.from(fileList))
                  );
                }
              }}
              multiple
              hidden
            />
          </label>
        )}
      </div>
      <p className="body-1 font-medium text-gray-500">{props.caption}</p>
    </div>
  );
}
