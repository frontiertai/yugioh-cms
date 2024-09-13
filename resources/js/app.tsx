import * as React from 'react';
import './bootstrap';
import { createInertiaApp } from '@inertiajs/react'
import {createRoot, hydrateRoot} from 'react-dom/client'

createInertiaApp({
  resolve: name => {
    const pages = import.meta.glob('./Pages/**/*.tsx', { eager: true })
    return pages[`./Pages/${name}.tsx`]
  },
  setup({ el, App, props }) {
    if (import.meta.env.VITE_APP_ENV === "production") {
      hydrateRoot(el, <App {...props} />)
    }
    else {
      createRoot(el).render(<App {...props} />)
    }
  },
})