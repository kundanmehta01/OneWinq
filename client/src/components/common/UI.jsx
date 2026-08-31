export function Button({ children, variant = 'primary', className = '', ...props }) { return <button className={`button ${variant} ${className}`} {...props}>{children}</button>; }
export function Input({ label, ...props }) { return <label className="field">{label && <span>{label}</span>}<input {...props} /></label>; }
export function Select({ label, children, ...props }) { return <label className="field">{label && <span>{label}</span>}<select {...props}>{children}</select></label>; }
export function Empty({ children = 'Nothing here yet.' }) { return <p className="empty">{children}</p>; }
export function Loading() { return <div className="loading">Loading…</div>; }
