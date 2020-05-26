import { post } from "../../utils/http/httpController"
import { getStore } from "../globalStore";
import * as types from "./action-types";

const getImageClassifyWithUrl = (url) => async () => {
    const imagesList = getStore().getState().classifyReducer.imagesList;
    if( imagesList && imagesList.length > 0) {
        return imagesList.find(img => img.url === url);
    }
    return false;
}

const classifyImage = (url, threshold) => async (dispatch) => {

    if(await dispatch(getImageClassifyWithUrl(url))) {
        console.log("Inclusão de imagem duplicada");
        return Promise.resolve();
    }

    var bodyFormData = new FormData();
    bodyFormData.append('url', url);
    bodyFormData.append('classifier_ids', 'default');
    bodyFormData.append('threshold', threshold);
    
    return post('https://gateway.watsonplatform.net/visual-recognition/api/v3/classify?version=2018-03-19', bodyFormData)
        .then((res) => {
            if(res && res.data && res.data.images && res.data.images[0] && res.data.images[0].classifiers[0] && res.data.images[0].classifiers[0].classes) {
                console.log(getStore().getState().classifyReducer.imagesList.length);
                dispatch({ type: types.CLASSIFY_NEW_ITEM_SUCCESS, image: {url: url, classifier: res.data.images[0].classifiers[0].classes, set: 0}});
            }
        })
        .catch((error) => {
            console.log("Erro na chamada da API Watson");
            dispatch({ type: types.LOAD_CLASSIFY_FAIL, error: error});
        });
}

export const classifyAImage = (image) => (dispatch) => {
    dispatch({type: types.ON_LOAD, load: true});
    dispatch(classifyImage(image.url, 0.6)).then( () =>
        (dispatch({type: types.ON_LOAD, load: false}))
    );
}

const goList = (list) => async (dispatch) => {
    const promises = list.map(async imageUrl => {
        await dispatch(classifyImage(imageUrl.uri, 0.6));
    });
    return Promise.all(promises);
}

export const classifyListImage = (listImages) => (dispatch) => {
    dispatch({type: types.INITIAL_STATE});
    dispatch({type: types.ON_LOAD, load: true});
    dispatch(goList(listImages)).then(() => (dispatch({type: types.ON_LOAD, load: false})));
}

export const compareMyImage = (selectedImage) => async (dispatch) => {
    const classificationSelectedImage = await dispatch(getImageClassifyWithUrl(selectedImage.url));
    const listImages = getStore().getState().classifyReducer.imagesList;
    if(classificationSelectedImage && listImages) {
        const similarList = listImages.map(img => (classificationSelectedImage.classifier.find(characteristics => (img.classifier.find(characteristicsList => (characteristicsList.class === characteristics.class))))) ? {...img, set: 1} : {...img, set: 0});
        return dispatch({type: types.UPDATE_SET, imagesList: similarList});
    }
    return Promise.reject('error');
}