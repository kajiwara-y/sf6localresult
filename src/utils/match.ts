export const getWinnerId = (a: string, b: string, c?: string): string => {
    if (c !== undefined) {
        if (a === b || a === c) return a;
        if (b === c) return b;
    } else {
        if (a === b) return a;
    }
    return ""
  }
