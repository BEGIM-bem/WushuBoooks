import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteDocument, getAllDocuments, uploadDocument } from "../../api/documents.api";
import useFile from "../../hooks/usePagination/useFile";
import { uploadFileHanlde } from "../../redux/features/counter/documentSlice";
import DocumentHeader from "./DocumentHeader/DocumentHeader";
import DocumentList from "./DocumentList/DocumentList";
import styles from './Documents.module.css'
import { updateProgressBar, setStatus } from '../../redux/features/counter/documentSlice';
import { toast } from "react-toastify";




//Документы
function Documents() {
    // Constants
    const { data, uploadData, status, error } = useSelector(state=>state.documents);
    const { user } = useSelector(state=>state.profile);
    const dispatch = useDispatch();

    // Hooks
    const {
        Today,
        Yesterday,
        Other
    } = useFile(data);

    // States
    const [uploadFiles, setUploadFiles] = useState(null);

    // Functions
    const handleAddFile = (e) => e.target.nextSibling?.click();
    const handleDeleteDocument = (id) => dispatch(deleteDocument(id)).unwrap().then(({meta})=>meta.requestStatus === 'fulfilled' && toast.success('Документ успешно удален'));
    const handleUploadFilesChange = (e) => {
        // setUploadFiles(e.target.files);
        const files = e.target.files;
        setTimeout(()=>{
            if (files) {
                const arr = files;
                // setUploadFiles(null);
                for (let i of arr) {
                    const form = new FormData();
                    form.append('docs', i);
                    const fileId = new Date().getTime();
                    dispatch(uploadFileHanlde({
                        id: fileId,
                        docsKey: i.name,
                        size: (i.size / 1048576).toFixed(2) + 'мб',
                        type: 'pdf',
                        percent: 0
                    }));
                    dispatch(uploadDocument({localId: fileId, data: form, callback: (progressEvent) =>{
                        const perc = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        handleUploadProgress(fileId, perc);
                    }}))
                }
            }
        }, 100)
    }

    const handleUploadProgress = (id, percent) => {
        dispatch(updateProgressBar({id, percent}));
    }

    const handleUpdateDocumentsList = () => dispatch(getAllDocuments());

    // Effects

    useEffect(()=>{
        handleUpdateDocumentsList();
    }, []);

    return (
        <div className={styles.content}>
            <DocumentHeader
                inputChange={handleUploadFilesChange}
                addFile={handleAddFile}
                role={user.role}/>
            <DocumentList
                Today={Today}
                Yesterday={Yesterday}
                Other={Other}
                UploadData={uploadData}
                role={user.role}
                deleteItem={handleDeleteDocument}/>
        </div>
    )
}

export default Documents;