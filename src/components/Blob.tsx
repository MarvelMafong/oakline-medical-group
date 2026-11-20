/** Rotating rings motif for color-block cards. */
export function Blob({ a = 'var(--cream)', b = 'var(--tang)' }: { a?: string; b?: string }) {
  return <span className="blob" aria-hidden="true"><i style={{ borderColor: a }} /><i style={{ borderColor: b }} /></span>;
}
