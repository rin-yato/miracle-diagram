import { atom, useAtom } from 'jotai';
import { z } from 'zod';

const createConfirmationSchema = z.object({
  open: z.boolean().default(true),
  title: z.string(),
  description: z.string().optional(),
  type: z
    .union([z.literal('default'), z.literal('destructive')])
    .default('default'),
  cancelText: z.string().default('Cancel'),
  confirmText: z.string().default('Confirm'),
  onConfirm: z.function().returns(z.promise(z.void()).or(z.void())).optional(),
  onCancel: z
    .function()
    .returns(z.void())
    .default(() => () => {}),
  resolve: z.function().returns(z.void()).optional(),
});

export type ConfirmationAtom = z.infer<typeof createConfirmationSchema>;

const confirmationAtom = atom<ConfirmationAtom | null>(null);

export default function useConfirmation() {
  const [confirmation, setConfirmation] = useAtom(confirmationAtom);

  const createConfirmation = async (
    confirmation: z.input<typeof createConfirmationSchema>,
  ) => {
    await new Promise(resolve => {
      const confirmationData = createConfirmationSchema.parse({
        ...confirmation,
        resolve,
      });
      setConfirmation(confirmationData);
    });
  };

  const showConfirmation = () => {
    if (!confirmation) return;
    setConfirmation({
      ...confirmation,
      open: true,
    });
  };

  const hideConfirmation = () => {
    if (!confirmation) return;
    setConfirmation({
      ...confirmation,
      open: false,
    });
  };

  return {
    confirmation,
    showConfirmation,
    hideConfirmation,
    createConfirmation,
  };
}
