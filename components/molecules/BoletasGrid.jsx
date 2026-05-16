import StatCard from "@/components/atoms/StatCard";

export default function BoletasGrid({ boletas = {} }) {
  return (
    <div className="grid grid-cols-2 gap-x-8 gap-y-6">
      <StatCard label="Recibidas" value={boletas.recibidas} />
      <StatCard label="Sobrantes" value={boletas.sobrantes} />
      <StatCard label="Personas que votaron" value={boletas.personasQueVotaron} />
      <StatCard label="Reps. de partidos" value={boletas.repsPartidos} />
    </div>
  );
}
