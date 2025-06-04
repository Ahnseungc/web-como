import { CustomLabel } from "@/components/common/CustomLabel";
import MapPlaceSearch from "../../../manage/organisms/MapPlaceSearch";
import RHFTextInput from "@/components/common/RHF/RHFTextInput";
import { ScheduleRegisterSchemaType } from "@/lib/types/schema";
import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";

const ScheduleDetailGeo = ({
  type,
  maxWidth,
}: {
  type: string;
  maxWidth?: string;
}) => {
  const { setValue, watch } = useFormContext<ScheduleRegisterSchemaType>();

  const location = watch("location");

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
            value={location?.roadAddress}
            handleChange={(newLocation) => {
              setValue("location", {
                roadAddress: newLocation.roadAddress,
                latitude: newLocation.latitude,
                longitude: newLocation.longitude,
                placeName: "",
              });
            }}
            readonly={type === "DETAIL"}
          />
        </div>
        <div className="flex-1">
          <RHFTextInput<ScheduleRegisterSchemaType>
            name="location.placeName"
            id="location.placeName"
            placeholder="상세 주소를 입력하세요."
            inputStyle="w-full pr-9 h-[60px]"
            value={location?.placeName}
            onChange={(e) => {
              setValue("location", {
                roadAddress: location.roadAddress,
                latitude: location.latitude,
                longitude: location.longitude,
                placeName: (e.target as HTMLInputElement).value,
              });
            }}
            readOnly={type === "DETAIL"}
          />
        </div>
      </div>
    </div>
  );
};

export default ScheduleDetailGeo;
