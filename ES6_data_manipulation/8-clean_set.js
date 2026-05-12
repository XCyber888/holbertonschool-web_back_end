export default function cleanSet(set, startString) {
    return '';
  }

  const parts = [];
  for (const value of set) {
    if (typeof value === 'string' && value.startsWith(startString)) {
      parts.push(value.slice(startString.length));
    }
  }
  return parts.join('-');
}
