'use client'

import { useEffect, useState } from 'react';

export function useSession() {
  const [session, setSession] = useState(null);
  const [status,setStatus] = useState('authenticated')

  useEffect(() => {
    const token = document.cookie.split('=')
    console.log(token)
    if (token[1]) {
      fetch(`${process.env.NEXT_PUBLIC_BACK_END}/api/users/validate`, {
        method:"POST",
        headers:{"content-type":"appliacation/json"},
        body:JSON.stringify({token:token[1]})
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data.user)
          if (data.valid) {
            setSession(data.user);
            setStatus(data.status);
          } else {
            setSession(null);
            setStatus(data.status)
          }
        });
    }else{
      setStatus('unauthenticated')
    }
  }, []);

  return {session,status};
}