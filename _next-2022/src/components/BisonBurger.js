import _cn from 'classnames'
import styles from './BisonBurger.module.css'

export default function BisonBurger({ open }) {
  return <div className={_cn([
    styles.bisonBurger,
    (open && styles['bisonBurger--open'])
  ])}>
  <button>
    <i className="bar bar-top" aria-hidden="true"></i>
    <i className="bar bar-middle" aria-hidden="true"></i>
    <i className="bar bar-bottom" aria-hidden="true"></i>
    <span className="sr-only">Menu</span>
  </button>
</div>
}