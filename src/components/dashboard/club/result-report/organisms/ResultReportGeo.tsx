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
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<ResultReportSchemaType>();

  const location = watch("data.location");
  const locationDetail = watch("data.locationDetail");

  // location 에러 메시지 가져오기
  const getLocationErrorMessage = () => {
    const nameParts = "data.location".split(".");
    let currentErrors: any = errors;

    for (const part of nameParts) {
      if (currentErrors && currentErrors[part]) {
        currentErrors = currentErrors[part];
      } else {
        return undefined;
      }
    }

    return currentErrors?.message?.toString();
  };

  // locationDetail 에러 메시지 가져오기
  const getLocationDetailErrorMessage = () => {
    const nameParts = "data.locationDetail".split(".");
    let currentErrors: any = errors;

    for (const part of nameParts) {
      if (currentErrors && currentErrors[part]) {
        currentErrors = currentErrors[part];
      } else {
        return undefined;
      }
    }

    return currentErrors?.message?.toString();
  };

  const locationError = getLocationErrorMessage();
  const locationDetailError = getLocationDetailErrorMessage();

  return (
    <div className={cn("flex flex-col gap-2", maxWidth)}>
      <CustomLabel
        htmlFor="location"
        labelText="활동 장소 설정"
        required={true}
        className=""
      />
      <div className="flex items-start gap-3">
        <div className="flex-1 relative">
          <MapPlaceSearch
            maxWidth="w-full"
            isLabel={false}
            value={location}
            handleChange={(newLocation: any) => {
              setValue("data.location", newLocation, { shouldValidate: true });
            }}
            readonly={type === "DETAIL"}
          />
          {locationError && (
            <div className="absolute text-base font-medium text-point-red mt-1">
              {locationError}
            </div>
          )}
        </div>
        <div className="flex-1 relative">
          <RHFTextInput<ResultReportSchemaType>
            name="data.locationDetail"
            id="data.locationDetail"
            placeholder="상세 주소를 입력하세요."
            inputStyle="w-full pr-9 h-[60px]"
            value={locationDetail}
            onChange={(e: any) => {
              setValue(
                "data.locationDetail",
                (e.target as HTMLInputElement).value,
                { shouldValidate: true }
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
