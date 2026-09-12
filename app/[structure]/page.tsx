import { notFound } from "next/navigation";
import { STRUCTURES, type StructureKind } from "../_lib/structures";
import { Playground } from "../_components/Playground";

type StructurePageProps = {
  params: Promise<{ structure: string }>;
};

export function generateStaticParams() {
  return (Object.keys(STRUCTURES) as StructureKind[]).map((structure) => ({ structure }));
}

export default async function StructurePage({ params }: StructurePageProps) {
  const { structure } = await params;
  const kind = structure as StructureKind;
  if (!(kind in STRUCTURES)) notFound();
  return <Playground kind={kind} />;
}
