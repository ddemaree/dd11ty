import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import _cn from "classnames";

import styles from './ThemeSwitch.module.css';

const themes = [
  { key: 'light', icon: faSun },
  { key: 'dark',  icon: faMoon }
]

function getInitialTheme() {
  if(localStorage.getItem('theme')) {
    return localStorage.getItem('theme');
  }
  else if(window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  else {
    return 'light';
  }
}

export default function ThemeSwitch() {
  const [theme, setTheme] = useState("light")

  useEffect(() => {
    let savedTheme = null;
    if(localStorage.getItem('theme')) {
      savedTheme = localStorage.getItem('theme');
    }

    const darkThemeMq = window.matchMedia('(prefers-color-scheme: dark)')
    
    if(savedTheme) {
      setTheme(savedTheme)
    }
    else if(darkThemeMq.matches && !savedTheme) {
      setTheme('dark')
    }

    const handleThemeChange = query => {
      console.log('System dark mode is %s', (query.matches ? 'enabled' : 'not enabled'))
      localStorage.removeItem('theme')
      setTheme(query.matches ? 'dark' : 'light')
    }

    darkThemeMq.addEventListener('change', handleThemeChange)

    return () => {
      darkThemeMq.removeEventListener('change', handleThemeChange)
    }
  }, [])

  useEffect(() => {
    if(theme === 'dark') {
      document.documentElement.classList.add('dark')
    }
    else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  const classes = _cn([
    styles.switch, 
    styles[`switch--${theme}`]
  ])

  const handleChange = e => {
    const newTheme = e.target.value
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    localStorage.removeItem('darkMode')
  }

  return <div className={classes}>
    {themes.map(({ key, icon }) => <label key={key} className={_cn([styles.option, (theme === key && styles.activeOption)])}>
      <FontAwesomeIcon icon={icon} size="sm" fixedWidth />
      <span className="sr-only">{key}</span>
      <input type="radio" name="theme-switch" value={key} checked={theme === key} onChange={handleChange} />
    </label>)}
  </div>
}