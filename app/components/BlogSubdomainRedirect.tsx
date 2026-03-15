'use client'

import { useEffect } from 'react'

export default function BlogSubdomainRedirect() {
  useEffect(() => {
    const hostname = window.location.hostname
    const pathname = window.location.pathname

    if (hostname === 'blog.manulacooray.com' && pathname === '/') {
      window.location.replace('/blog/')
    }
  }, [])

  return null
}
