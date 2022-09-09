import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { checkToken, setConfirmStatus } from "../../../api/login.api";

const getInfo = (info) => {
    let i = 0;
    while(info[i] !== 'M') {
        i++;
    }
    const id = info.slice(0, i);
    const token = info.slice(i+1, info.length);
    return {userId: id, token: token};
}

const ConfirmAccount = () => {
    // Constants
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { info } = useParams();
    const { checkTmp, status } = useSelector(state=>state.profile);
    const { userId, token } = getInfo(info);
    
    // Onload
    useEffect(()=>{
        dispatch(checkToken(getInfo(info)));
    }, [dispatch]);

    useEffect(()=>{
        if (checkTmp === false) navigate('/login');
        if (checkTmp === true) {
            dispatch(setConfirmStatus(userId));
        }
    }, [checkTmp]);

    useEffect(()=>{
        if (status === 'Confirmed status') navigate('/login');
    }, [status])
    return (<></>)
}

export default ConfirmAccount;