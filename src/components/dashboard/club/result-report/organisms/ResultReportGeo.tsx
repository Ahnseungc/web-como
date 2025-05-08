import { CustomLabel } from "@/components/common/CustomLabel";
import MapPlaceSearch from "@/components/dashboard/club/manage/organisms/MapPlaceSearch";
import RHFTextInput from "@/components/common/RHF/RHFTextInput";
import {
  ResultReportSchemaType,
  ScheduleRegisterSchemaType,
} from "@/lib/types/schema";
import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";

const ResultReportGeo = ({
  type,
  maxWidth,
}: {
  type: string;
  maxWidth?: string;
}) => {
  const { setValue, watch } = useFormContext<ResultReportSchemaType>();

  const location = watch("data.location");
  const locationDetail = watch("data.locationDetail");

  return (
    <div className={cn("flex flex-col gap-2", maxWidth)}>
      <CustomLabel
        htmlFor="location"
        labelText="활동 장소 설정"
        required={true}
        className=""
      />
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <MapPlaceSearch
            maxWidth="w-full"
            isLabel={false}
            value={location}
            handleChange={(newLocation: any) => {
              setValue("data.location", newLocation);
            }}
            readonly={type === "DETAIL"}
          />
        </div>
        <div className="flex-1">
          <RHFTextInput<ResultReportSchemaType>
            name="data.locationDetail"
            id="data.locationDetail"
            placeholder="상세 주소를 입력하세요."
            inputStyle="w-full pr-9 h-[60px]"
            value={locationDetail}
            onChange={(e: any) => {
              setValue(
                "data.locationDetail",
                (e.target as HTMLInputElement).value
              );
            }}
            readOnly={type === "DETAIL"}
          />
        </div>
      </div>
    </div>
  );
};

export default ResultReportGeo;
