import { Input } from '../../../../components';
import styles from '../newUser.module.css';

const SecretaryRole = ({
    name, setName,
    lastname, setLastname,
    eventCount, setEventCount,
    email, setEmail
}) => {
    return(
        <div className={styles.form_input_list}>
            <div className={styles.form_input_holder}>
                <label htmlFor="name">Имя</label>
                <Input
                    name="name"
                    value={name}
                    onChange={setName}/>
            </div>
            <div className={styles.form_input_holder}>
                <label htmlFor="lastname">Фамилия</label>
                <Input
                    name="lastname"
                    value={lastname}
                    onChange={setLastname}/>
            </div>
            <div className={styles.form_input_holder}>
                <label htmlFor="event count">Количество созданных мероприятий</label>
                <Input
                    name="event count"
                    value={eventCount}
                    onChange={setEventCount}/>
            </div>
            <div className={styles.form_input_holder}>
                <label htmlFor="email">Почта</label>
                <Input
                    name="email"
                    value={email}
                    onChange={setEmail}/>
            </div>
        </div>
    )
}
export default SecretaryRole;