import { useContext } from 'react'; import { ConnectionContext } from '../context/ConnectionContext.jsx';
export function useConnections() { const context = useContext(ConnectionContext); if (!context) throw new Error('useConnections must be used inside ConnectionProvider'); return context; }
