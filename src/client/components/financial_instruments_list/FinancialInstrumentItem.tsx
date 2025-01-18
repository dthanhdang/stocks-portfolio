import type { FinancialInstrument } from "stocks-portfolio/client/types";

import { Button, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import React from "react";
import { TextLink } from "stocks-portfolio/client/components/text_link";

type FinancialInstrumentItemProps = {
  instrument: FinancialInstrument;
  onDelete: () => void;
};

export function FinancialInstrumentItem({
  instrument,
  onDelete,
}: FinancialInstrumentItemProps): React.JSX.Element {
  function handleDeleteModal(): void {
    modals.openConfirmModal({
      children: <Text>Are you sure you want to delete?</Text>,
      confirmProps: { color: "red" },
      labels: { cancel: "Do not delete", confirm: "Delete" },
      onConfirm: () => {
        onDelete();
      },
      title: "Deletion confirmation",
    });
  }

  return (
    <>
      <TextLink to="/">{instrument.name}</TextLink>
      <Button onClick={handleDeleteModal}>Delete</Button>
    </>
  );
}
