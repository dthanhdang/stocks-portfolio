import type { FinancialInstrument } from "stocks-portfolio/client/types";

import React from "react";

import { FinancialInstrumentItem } from "./FinancialInstrumentItem.jsx";

type FinancialInstrumentsListProps = {
  instruments: FinancialInstrument[];
  onDelete: (id: number) => void;
};

export function FinancialInstrumentsList({
  instruments,
  onDelete,
}: FinancialInstrumentsListProps): React.JSX.Element {
  const handleDelete = (id: number) => {
    return (): void => {
      onDelete(id);
    };
  };
  return (
    <div>
      {instruments.map((instrument) => (
        <FinancialInstrumentItem
          instrument={instrument}
          key={instrument.id}
          onDelete={handleDelete(instrument.id)}
        />
      ))}
    </div>
  );
}
