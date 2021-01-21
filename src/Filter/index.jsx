import styles from './filter.module.css';

export default function Filter ({ value, onChangeFilter }) {
    return (
        <>
            <p className={styles.title}>Find contacts by name</p>
            <input className={styles.filterInput} name="filter" onChange={onChangeFilter} value={value}/>
        </>
    );
}