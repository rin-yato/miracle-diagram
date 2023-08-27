"use client";

import React from "react";

import useConfirmation from "@/hooks/use-confirmation";

import {
  AlertDialogAction,
  AlertDialog as AlertDialogBase,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { buttonVariants } from "@/components/ui/button";

export default function ConfirmDialog() {
  const { confirmation, hideConfirmation } = useConfirmation();

  if (!confirmation) return null;

  const handleConfirm = async () => {
    await confirmation.onConfirm?.();
    confirmation.resolve?.();
  };

  return (
    <AlertDialogBase open={confirmation.open} onOpenChange={hideConfirmation}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{confirmation.title}</AlertDialogTitle>
          <AlertDialogDescription>
            {confirmation.description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={confirmation.onCancel}>
            {confirmation.cancelText || "Cancel"}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            className={buttonVariants({
              variant: confirmation.type,
            })}
          >
            {confirmation.confirmText || "Confirm"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialogBase>
  );
}
