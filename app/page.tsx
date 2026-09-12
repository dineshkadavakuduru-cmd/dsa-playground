import { STRUCTURES, type StructureKind } from "./_lib/structures";
import { Landing } from "./_components/Landing";

export default function HomePage() {
  return <Landing structures={STRUCTURES} />;
}

export function generateStaticParams() {
  return (Object.keys(STRUCTURES) as StructureKind[]).map((structure) => ({ structure }));
}
