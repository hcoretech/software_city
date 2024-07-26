'use client'

import { useSearchParams } from "next/navigation"
import { useCallback } from "react"


//   const name = data.name;
//   const value = data.value;
    const searchParams = useSearchParams();

    export const createQueryString = useCallback(
        (name: string, value: string) => {
          const params = new URLSearchParams(searchParams.toString())
          params.set(name, value)
      
          return params.toString()
        },
        [searchParams]
      )
      // createQueryString();

