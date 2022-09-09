import { current } from "immer";
import { getAllDocuments, uploadDocument } from "../../api/documents.api";

export const uploadDocumentExtra = {
    [uploadDocument.fulfilled]: (state, action) => {
        state.uploadData = state.uploadData.filter((i) => i.id !== action.payload.localId);
        state.status = "Uploaded document"
    }
}

export const getDocumentsExtra = {
    [getAllDocuments.fulfilled]: (state, action) => {
        state.data = action.payload;
    }
}