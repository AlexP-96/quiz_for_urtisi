type Mods = Record<string, string | boolean>;

export function classNames(cls: string, mods?: Mods, classes: string[] = []): string {
    return [
        cls,
        ...classes.filter(Boolean),
        ...Object.entries(mods).filter(([key, value]) => Boolean(value)).map(([key, value]) => key)
    ].join(' ');
};