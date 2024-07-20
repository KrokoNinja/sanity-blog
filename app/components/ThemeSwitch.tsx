"use client";
import { useTheme } from 'next-themes'
import React, { useEffect } from 'react'
import { MoonIcon, SunIcon } from './Icons';

function ThemeSwitch() {

  const [mounted, setMounted] = React.useState(false);
  const {theme, setTheme} = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if(!mounted) return null;

  return (
    <button className='border border-purple-500 rounded-2xl p-1 hover:bg-purple-500 hover:bg-opacity-10 dark:hover:bg-amber-50 dark:hover:bg-opacity-10' onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      {theme === "dark" ? <SunIcon /> : <MoonIcon />}
    </button>
  )
}

export default ThemeSwitch