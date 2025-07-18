import { useEffect, useState } from 'react';

export default function Health() {
  const [status, setStatus] = useState<'ok' | 'fail' | 'loading'>('loading');

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/health`);
        const text = await res.text();
        if (text.trim() === 'OK') {
          setStatus('ok');
        } else {
          setStatus('fail');
        }
      } catch {
        setStatus('fail');
      }
    };
    checkHealth();
  }, []);

  if (status === 'loading') {
    return <div style={{ textAlign: 'center', fontSize: '4rem' }}>⏳</div>;
  }

  return (
    <div style={{ textAlign: 'center', fontSize: '6rem' }}>
      {status === 'ok' ? '😊' : '😟'}
    </div>
  );
}
