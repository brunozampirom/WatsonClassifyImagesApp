import { post } from "../../utils/http/httpController"
import { getStore } from "../globalStore";
import * as types from "./action-types";

export const classifyImage = (url, threshold) => async (dispatch) => {

    var bodyFormData = new FormData();
    bodyFormData.append('url', url);
    bodyFormData.append('classifier_ids', 'default');
    bodyFormData.append('threshold', threshold);
    
    post('https://gateway.watsonplatform.net/visual-recognition/api/v3/classify?version=2018-03-19', bodyFormData)
        .then((res) => {
            if(res && res.data && res.data.images && res.data.images[0] && res.data.images[0].classifiers[0] && res.data.images[0].classifiers[0].classes) {
                // console.log(res.data.images[0].classifiers[0].classes);
                const listaImagens = getStore().getState().classifyReducer.list;
                listaImagens.push({image: url, classifier: res.data.images[0].classifiers[0].classes});
                dispatch({ type: types.LOAD_CLASSIFY_SUCCESS, list: listaImagens});
            }
        })
        .catch((error) => {
            dispatch({ type: types.LOAD_CLASSIFY_FAIL, error: error});
        });
}

export const classifyListImage = (listImages) => (dispatch) => {
    dispatch({type: types.ON_LOAD, load: true});
    listImages.forEach(imageUrl => {
        dispatch(classifyImage(imageUrl.uri, 0.6));
    });
    dispatch({type: types.ON_LOAD, load: false});
}

export const compareMyImage = (selectedImage) => async (dispatch) => {
    const listImages = getStore().getState().classifyReducer.list;
    if(listImages) {
        const classificationSelectedImage = listImages.find(img => img.image === selectedImage.uri);
        const similarList = listImages.filter(img => (classificationSelectedImage.classifier.find( characteristics => (img.classifier.find(characteristicsList => (characteristicsList.class === characteristics.class))))));
        return similarList;
    }
    return Promise.reject('error');
}