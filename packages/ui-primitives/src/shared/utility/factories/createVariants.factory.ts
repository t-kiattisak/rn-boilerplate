/* eslint-disable @typescript-eslint/no-explicit-any */
type AnyRecord = Record<string, unknown>;

interface VariantValues<T extends AnyRecord> {
  [variantValue: string]: Partial<T>;
}

export interface VariantDefinitions<T extends AnyRecord> {
  [variantName: string]: VariantValues<T>;
}

type VariantDefaults<Defs extends VariantDefinitions<AnyRecord> | undefined> =
  Defs extends VariantDefinitions<AnyRecord>
    ? { [K in keyof Defs]?: keyof Defs[K] }
    : never;

type VariantConditions<Defs extends VariantDefinitions<AnyRecord> | undefined> =
  Defs extends VariantDefinitions<AnyRecord>
    ? { [K in keyof Defs]?: keyof Defs[K] }
    : never;

export interface VariantConfig<
  T extends AnyRecord,
  Defs extends VariantDefinitions<T> | undefined =
    | VariantDefinitions<T>
    | undefined,
> {
  base?: T;
  variants?: Defs;
  compoundVariants?: Defs extends VariantDefinitions<T>
    ? Array<{ conditions: VariantConditions<Defs>; style: Partial<T> }>
    : never;
  defaultVariants?: VariantDefaults<Defs>;
}

type VariantPropsFromDefinitions<
  Defs extends VariantDefinitions<AnyRecord> | undefined,
> =
  Defs extends VariantDefinitions<AnyRecord>
    ? { [K in keyof Defs]?: keyof Defs[K] }
    : Record<string, never>;

export type CreateVariantsProps<C extends VariantConfig<AnyRecord, any>> =
  VariantPropsFromDefinitions<C['variants']>;

export type CreateVariantsResult<C extends VariantConfig<AnyRecord, any>> =
  C['base'] extends AnyRecord ? C['base'] : AnyRecord;

export type CreateVariantsFn<C extends VariantConfig<AnyRecord, any>> = (
  props?: CreateVariantsProps<C>
) => CreateVariantsResult<C>;

export function createVariants<
  T extends AnyRecord,
  Defs extends VariantDefinitions<T> | undefined =
    | VariantDefinitions<T>
    | undefined,
>(
  config: VariantConfig<T, Defs>
): (props?: VariantPropsFromDefinitions<Defs>) => T {
  return (props) => {
    const base = (config.base ?? {}) as T;
    let result = { ...base };

    const activeVariants = {
      ...(config.defaultVariants ?? {}),
      ...(props ?? {}),
    } as Record<string, string | undefined>;

    if (config.variants) {
      for (const [variantName, variantValues] of Object.entries(
        config.variants
      )) {
        const selectedValue = activeVariants[variantName];

        if (selectedValue !== undefined) {
          const variantStyle = variantValues[String(selectedValue)];

          // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
          if (variantStyle) {
            result = { ...result, ...variantStyle };
          }
        }
      }
    }

    if (config.compoundVariants) {
      for (const compound of config.compoundVariants) {
        const matches = Object.entries(compound.conditions).every(
          ([key, value]) => {
            const current = activeVariants[key];
            return current === value;
          }
        );

        if (matches) {
          result = { ...result, ...compound.style };
        }
      }
    }

    return result;
  };
}
