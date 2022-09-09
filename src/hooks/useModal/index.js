import { useDispatch } from "react-redux"
import { setModal } from "../../redux/features/counter/generalSlice";

export const useModal = () => {
    const dispatch = useDispatch();

    const closeModal = () => {
        dispatch(setModal({ type: null, props: null }));
    }

    const openModal = (type, props) => {
        dispatch(setModal({ type, props }));
    }

    return {
        closeModal,
        openModal
    }
}