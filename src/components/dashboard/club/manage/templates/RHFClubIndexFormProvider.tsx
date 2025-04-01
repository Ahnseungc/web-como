"use client";

import {
  ClubIndexDefaultValues,
  ClubIndexSchema,
  ClubIndexSchemaType,
} from "@/lib/types/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import ClubInfoForm from "./ClubInfoForm";

export default function RHFClubIndexFormProvider() {
  const method = useForm<ClubIndexSchemaType>({
    mode: "all",
    resolver: zodResolver(ClubIndexSchema),
    defaultValues: ClubIndexDefaultValues,
  });
  return (
    <FormProvider {...method}>
      <ClubInfoForm />
    </FormProvider>
  );
}
