export const filterSort = (optionA, optionB) =>
  optionA.value === 0 || optionA.value === ''
    ? -1
    : optionB.value === 0
    ? 1
    : String(optionA?.label ?? '').localeCompare(String(optionB?.label ?? ''));

export const filterOption = (input, option) => (option?.label?.toString()?.toUpperCase() ?? '').includes(input.toUpperCase());

export const removeNull = obj => {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => v != null && v !== undefined && (typeof v !== 'string' || v?.trim().length > 0))
  );
};
