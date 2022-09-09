import React, { useEffect, useState } from "react";
import styles from './index.module.css'
import { useNavigate } from 'react-router-dom'
import Footer from '../../../components/Footer/index.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { deleteNew, getNewsId } from "../../../api/news.js";
import { plusIcon, quetionsIcon, editIconNew, crossIconForNew } from '../../../images/inedex.js'
import AddNews from "../../../components/Modals/AddNews/AddNews";
//Новости 
import { toast } from 'react-toastify';
import { setNullStatus } from "../../../redux/reducers/newsSlice";
import moment from "moment";
import { Oval, Circles } from 'react-loader-spinner'
import { TailSpin } from 'react-loader-spinner';
import ConfirmDelete from "../../../components/Modals/ConfirmDelete/ConfirmDelete";


function MainNews() {
    const [isOpenModal, setIsOpenModal] = useState({ isOpen: false, dataNew: null })
    const [idElement, setIdElement] = useState()
    const [isConfirmModal, setIsConfirmModal] = useState({ isOpen: false, id: null })

    const { news, status } = useSelector(state => state.news)
    const { user } = useSelector(state => state.profile)


    const dispatch = useDispatch()
    const navigations = useNavigate()



    const toggleModal = () => {
        setIsOpenModal({ isOpen: true, dataNew: null })
    }

    const readMore = (item) => {
        setIdElement(item.id)
        dispatch(getNewsId({ id: item.id, navigations }))
    }

    const handleDelete = (id) => {

        setIsConfirmModal({
            isOpen: true,
            id: id
        })
        // dispatch(deleteNew(id))
    }

    const handleOpenModalEdit = (item) => {
        setIsOpenModal({ isOpen: true, dataNew: item })
    }


    useEffect(() => {
        if (status.createNewSatatus === 'Created new') {
            toast.success('Новост  успешно создан');

            setIsOpenModal({ isOpen: false })

            dispatch(setNullStatus())
        }
        else if (status.createNewSatatus === 'Rejected create new') {
            toast.error('Ошибка при добавлении новостей');
            setIsOpenModal({ isOpen: false })
            dispatch(setNullStatus())
        }

        if (status.deleteNew === 'Deleted new') {
            toast.success('Новост успешно удалён');
            dispatch(setNullStatus())

        }
        else if (status.deleteNew === 'Rejected Delete new') {
            toast.error('Ошибка при удаление новостей');
            dispatch(setNullStatus())

        }

        if (status.editNew === 'Edited new') {
            toast.success('Новост успешно отредактирован');
            setIsOpenModal({ isOpen: false })
            dispatch(setNullStatus())
        }
        else if (status.editNew === 'Rejected Edit new') {
            toast.error('Ошибка при редактирование новостей');
            setIsOpenModal({ isOpen: false })
            dispatch(setNullStatus())
        }


    }, [status.createNewSatatus, status.deleteNew, status.editNew])


    const hadleCheckData = (item) => {
        if (item.length > 20) {
            return moment(item).format('MM.DD.YYYY, HH:MM')
        }
        return item
    }

    return (

        <div className={styles.conteiners}>


            <div className={styles.conteiner__addNew}>
                {
                    (user.role === 'admin' || user.role === 'secretary') &&
                    <div className={styles.conteiner__addNew_btn} onClick={toggleModal} >
                        <img src={plusIcon} alt='' className={styles.conteiner__addNew_icon} />
                        <p className={styles.conteiner__addNew_text}>Добавить новости</p>
                    </div>
                }
            </div>



            <div className={styles.news}>
                <h1 className={styles.news__title}>Последние новости</h1>

                <div className={styles.content}>
                    {
                        news?.map(item =>
                            <div className={styles.conteiner} key={item.id}>


                                <div className={styles.conteiner__imgCon} >
                                    <img src={item.image ? item.image : quetionsIcon}
                                        alt='' className={styles.conteiner__img} />

                                </div>

                                <div className={styles.conteiner__texst}>
                                    <time className={styles.conteiner__texst_date}>{hadleCheckData(item.date)}  </time>
                                    <h1 className={styles.conteiner__texst_title} >{item.title}</h1>
                                    <p className={styles.conteiner__texst_text} >{item.text}</p>
                                </div>

                                {
                                    user.role === 'admin' &&
                                    <div className={styles.conteiner__options} >
                                        <img src={editIconNew} alt='' onClick={() => handleOpenModalEdit(item)} className={styles.conteiner__options_edit} />
                                        <img src={crossIconForNew} alt='' onClick={() => handleDelete(item.id)} />

                                    </div>
                                }

                                <button className={styles.conteiner__about}
                                    onClick={() => readMore(item)} >
                                    {

                                        idElement === item.id && status.newsIdStatus === 'loading' ?
                                            <TailSpin
                                                height={24}

                                                color='blue' /> :
                                            'Читать далее'
                                    }

                                </button>


                            </div>
                        )
                    }
                </div>

            </div>


            {
                isOpenModal.isOpen && <AddNews active={isOpenModal.isOpen}
                    dataNew={isOpenModal.dataNew} setActive={setIsOpenModal} />
            }
            {
                isConfirmModal.isOpen && <ConfirmDelete
                    modal={isConfirmModal.isOpen}
                    setModal={setIsConfirmModal}
                    id={isConfirmModal.id}
                />
            }
            <Footer />

        </div >

    )
}

export default MainNews;