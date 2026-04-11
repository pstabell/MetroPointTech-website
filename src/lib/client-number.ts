/**
 * Client number generator for AI Agent Teams customers.
 *
 * Format: `MPT-XXXXXX` where X is 6 random alphanumeric characters
 * from a safe alphabet (no 0/O/1/I confusables). Not sequential —
 * sequential leaks how many customers we have, which is valuable
 * competitive intel we do not want to hand out.
 */

const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789' // 32 chars, no 0/O/1/I

export function generateClientNumber(): string {
  let suffix = ''
  for (let i = 0; i < 6; i++) {
    suffix += ALPHABET[Math.floor(Math.random() * ALPHABET.length)]
  }
  return `MPT-${suffix}`
}

export function isValidClientNumber(value: string): boolean {
  return /^MPT-[A-HJ-NP-Z2-9]{6}$/.test(value.trim().toUpperCase())
}
