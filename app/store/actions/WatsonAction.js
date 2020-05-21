import { post } from "../../utils/http/httpController"
import { getStore } from "../globalStore";

export const classifyImage = (url, threshold) => async (dispatch) => {

    var bodyFormData = new FormData();
    bodyFormData.append('url', url);
    bodyFormData.append('classifier_ids', 'default');
    bodyFormData.append('threshold', threshold);
    
    post('https://gateway.watsonplatform.net/visual-recognition/api/v3/classify?version=2018-03-19', bodyFormData)
        .then((res) => {
            if(res && res.data && res.data.images && res.data.images[0] && res.data.images[0].classifiers[0] && res.data.images[0].classifiers[0].classes) {
                console.log(res.data.images[0].classifiers[0].classes);
                const listaImagens = getStore().getState().classifyReducer.list;
                //console.log(getStore());
                listaImagens.push({image: url, classifier: res.data.images[0].classifiers[0].classes});
            }
        })
        .catch((error) => {
            console.log(error);
        });
}

export const classifyListImage = (listImages) => ( dispatch) => {
    listImages.forEach(imageUrl => {
        dispatch(classifyImage(imageUrl.uri, 0.6));
    });
}