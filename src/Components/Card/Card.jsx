import Button from '../Button/Button';
import styles from './Card.module.css';

function Card({title, walletBalance, buttonText, buttonType, handleClick, success=true}){
    return (
        <div className={styles.card}>
            <h3 className={styles.title}>
                {`${title}: `}
                <span className={success ? styles.success : styles.failure}>
                    {`${walletBalance}`}
                </span>
            </h3>
            <Button handleClick={handleClick} style={buttonType}>{buttonText}</Button>
        </div>
    )
};

export default Card;