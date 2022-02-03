/**
 * Used to provide className only if defined
 */
export const classIfProvided = (className?: string) =>
  typeof className === "string" ? { [className]: true } : {};
