export const isInternalField = (fieldName: string): boolean => {
    return fieldName.includes('__');
};
