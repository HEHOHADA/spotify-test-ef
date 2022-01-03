import { Domain, fork, hydrate, Scope } from 'effector'
import { useMemo } from 'react'

import { isBrowser } from 'lib/isBrowser'

let scope: Scope

function initializeScope<T>(domain: Domain, initialState: T) {
  const _scope = scope ?? fork(domain, { values: { ...initialState } })

  if (initialState) {
    hydrate(domain, {
      values: {
        ...initialState,
      },
    })
  }

  if (!isBrowser()) return _scope

  if (!scope) {
    scope = _scope
  }

  return _scope
}

export function useScope<T>(domain: Domain, initialState: T) {
  return useMemo(
    () => initializeScope(domain, initialState),
    [domain, initialState],
  )
}
