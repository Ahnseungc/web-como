"use client";

import { read, utils } from "xlsx";

export default function ExcelReader() {
  const readUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target!.result;
        const workbook = read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = utils.sheet_to_json(worksheet);
        console.log(json.map((data: any) => data["이메일"]));
        console.log(json.map((data: any) => data["email"]));
      };
      reader.readAsArrayBuffer(e.target.files[0]);
    }
  };

  return (
    <div>
      <form>
        <label htmlFor="upload-excel">{"엑셀 파일 업로드"}</label>
        <input
          type="file"
          name="upload-excel"
          id="upload-excel"
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, .csv"
          onChange={readUploadFile}
        />
      </form>
    </div>
  );
}
