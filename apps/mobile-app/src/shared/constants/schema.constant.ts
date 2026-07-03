import z from 'zod';

export const booleanChoiceConstant = {
  No: 'No',
  Yes: 'Yes',
} as const;

export const booleanChoiceSchema = z.enum([
  booleanChoiceConstant.No,
  booleanChoiceConstant.Yes,
]);

export const optionSchema = z.object({
  label: z.string(),
  value: z.string(),
});

export type OptionSchema = z.infer<typeof optionSchema>;

export const booleanChoiceOptions = [
  { label: booleanChoiceConstant.Yes, value: booleanChoiceConstant.Yes },
  { label: booleanChoiceConstant.No, value: booleanChoiceConstant.No },
] satisfies OptionSchema[];

export const optionsSchema = z.array(optionSchema);

export const phoneCountrySchema = z.object({
  code: z.string(),
  dialCode: z.string(),
  emoji: z.string(),
  flag: z.string(),
  name: z.string(),
});

export type PhoneCountrySchema = z.infer<typeof phoneCountrySchema>;
