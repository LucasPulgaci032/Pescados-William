'use client';

import { useMemo } from "react";

export default function TodaysLocation() {
  const todayInfo = useMemo(() => {
    const dayIndex = new Date().getDay();

    const schedule: Record<number, string> = {
      0: "Rua Coronel Oscar Porto, Paraíso, São Paulo - SP",
      1: "Loja fechada",
      2: "Loja fechada",
      3: "Rua Joli - Brás, São Paulo - SP",
      4: "Rua Realengo - Vila Madalena, São Paulo - SP",
      5: "Rua dos Manaiás - Vila Zelina, São Paulo - SP",
      6: "Rua Serra do Jaire com Rua Itamaracá - Mooca, São Paulo - SP",
    };

    const dayNames: Record<number, string> = {
      0: "Domingo",
      1: "Segunda-feira",
      2: "Terça-feira",
      3: "Quarta-feira",
      4: "Quinta-feira",
      5: "Sexta-feira",
      6: "Sábado",
    };

    return {
      day: dayNames[dayIndex],
      location: schedule[dayIndex],
      isClosed: dayIndex === 1 || dayIndex === 2,
    };
  }, []);

  return (
    <div className="w-full flex justify-center mt-4">
        
      <div
        className="
          max-w-sm w-full
          rounded-xl
          px-4 py-3
          text-center
          shadow-lg
          border border-blue-400/20
          bg-gradient-to-br from-blue-950 via-blue-900 to-cyan-900
          text-white
        "
      >
        <h1 className="text-xl text-blue-200 opacity-90">Onde nos encontramos hoje :</h1>
        <p className="text-xl text-blue-200 opacity-90">
          {todayInfo.day}
        </p>

        <p
          className={`
            text-lg font-semibold
            ${todayInfo.isClosed ? "text-red-300" : "text-cyan-200"}
          `}
        >
          {todayInfo.location}
        </p>
      </div>
    </div>
  );
}