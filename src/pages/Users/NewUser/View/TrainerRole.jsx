import { Input } from '../../../../components';
import styles from '../newUser.module.css';

const TrainerRole = ({
    name, setName,
    lastname, setLastname,
    email, setEmail,
    city, setCity,
    country, setCountry,
    club, setClub,
    category, setCategory,
    judgeCategory, setJudgeCategory,
}) => {
    return (
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
                            <label htmlFor="category">Спортивный разряд</label>
                            <Input
                                name="category"
                                value={category}
                                onChange={setCategory}/>
                        </div>
                        <div className={styles.form_input_holder}>
                            <label htmlFor="club">Клубы</label>
                            <Input
                                name="club"
                                value={club}
                                onChange={setClub}/>
                        </div>
                        <div className={styles.form_input_holder}>
                            <label htmlFor="country">Страна</label>
                            <Input
                                name="country"
                                value={country}
                                onChange={setCountry}/>
                        </div>
                        <div className={styles.form_input_holder}>
                            <label htmlFor="city">Город</label>
                            <Input
                                name="city"
                                value={city}
                                onChange={setCity}/>
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
export default TrainerRole;