import { notFound } from "next/navigation";
import StageScreen from "@/components/StageSections/StageScreen";
import { STAGE_DATA, type StageId } from "@/data/stageData";

interface Params {
  stage: StageId;
}

export default function ArabicStagePage({ params }: { params: Params }) {
  const stageData = STAGE_DATA[params.stage];
  if (!stageData) return notFound();

  return <StageScreen stageData={stageData} />;
}
