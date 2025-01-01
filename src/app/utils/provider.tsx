"use client"

import { ThemeProvider } from "next-themes"
import React from "react"

interface props{
    children:React.ReactNode
}

export const Provider=({children}:props)=>{
    return(
        <ThemeProvider attribute="class">
            {children}
        </ThemeProvider>
    )
}