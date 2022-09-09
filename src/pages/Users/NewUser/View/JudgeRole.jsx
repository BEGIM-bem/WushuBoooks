import { Input } from "../../../../components";
import styles from '../newUser.module.css';

const JudgeRole = ({
    name, setName,
    lastname, setLastname,
    category, setCategory,
    judgeCategory, setJudgeCategory,
    experience, setExperience,
    email, setEmail,
    appointmentDate, setAppointmentDate
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
                        <label htmlFor="appointment date">Дата назначения</label>
                        <Input
                            name="appointment date"
                            value={appointmentDate}
                            onChange={setAppointmentDate}/>
                    </div>
                    <div className={styles.form_input_holder}>
                        <label htmlFor="category">Спортивный разряд</label>
                        <Input
                            name="category"
                            value={category}
                            onChange={setCategory}/>
                    </div>
                    <div className={styles.form_input_holder}>
                        <label htmlFor="judge category">Судейская категория</label>
                        <Input
                            name="judge category"
                            value={judgeCategory}
                            onChange={setJudgeCategory}/>
                    </div>
                    <div className={styles.form_input_holder}>
                        <label htmlFor="experience">Прошлый опыт</label>
                        <Input
                            name="experience"
                            value={experience}
                            onChange={setExperience}/>
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
export default JudgeRole;