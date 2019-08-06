import { COUNTRY_FILTER_LOADER_OFF, BRAND_FILTER_LOADER, BRAND_FILTER_LOADER_OFF, CATEGORY_FILTER_LOADER, CATEGORY_FILTER_LOADER_OFF, SOURCE_FILTER_LOADER_OFF, SOURCE_FILTER_LOADER, TABLE_UPDATED_LOADER, UPDATED_LOADER, GET_USERNAME, UPDATED_FLAG_FALSE, UPDATED_FLAG, FETCH_BRAND_FILTER_INITIAL, FETCH_CATEGORY_FILTER_INITIAL, FETCH_SOURCE_FILTER_INITIAL, UPDATE_LIST_DATA, UPDATE_PSKU, UPDATE_LIST, FETCH_COUNTRY_FILTER, FETCH_SOURCE_FILTER, FETCH_CATEGORY_FILTER, FETCH_BRAND_FILTER, FETCH_PSKU_DATA } from '../actions/types';

import fetch from "../utils/fetch";
import AppConstants from "../app-constants/app-constants.js";

export function getUserDetails() {
    return dispatch => {
        const userNameNode = document.getElementById("username");
        const userPermNode = document.getElementById("userpermissions");
        const savePerms = userPermNode.value.split(",");
        const serverTime = document.getElementById("servertime");
        dispatch({
            type: GET_USERNAME,
            userName: userNameNode.value,
            savePerms: savePerms,
            serverTime: new Date(serverTime.value)
        });

        userNameNode.parentNode.removeChild(userNameNode);
        userPermNode.parentNode.removeChild(userPermNode);
        serverTime.parentNode.removeChild(serverTime);
    };
}




export const countryFilterData = () => dispatch => {

    fetch(`${AppConstants.BASE_URL}/CountryFetch/`)
        .then(res => res.json().then(data => ({ res, data })))
        .then(function (res, data) {

            if (res.res.status === 200) {
                dispatch({
                    type: FETCH_COUNTRY_FILTER,
                    payload: res.data
                })
                dispatch({
                    type: COUNTRY_FILTER_LOADER_OFF,
                })
            }

        })
    // .then(res => res.json())
    // .then(data => dispatch({
    //     type: FETCH_COUNTRY_FILTER,
    //     payload: data
    // }))

}

var generated_csrf_token = "{{ csrf_token }}";

export const SourceFilterData = (postData) => dispatch => {
    if (postData != "") {
        console.log("post country", postData)
        fetch(`${AppConstants.BASE_URL}/ChannelFetch/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(postData),


        })
            .then(res => res.json().then(data => ({ res, data })))
            .then(function (res, data) {

                if (res.res.status === 200) {
                    dispatch({
                        type: FETCH_SOURCE_FILTER,
                        payload: res.data
                    })
                    dispatch({
                        type: SOURCE_FILTER_LOADER_OFF,
                    })
                }

            })
        // .then(res => res.json())
        // .then(data => dispatch({
        //     type: FETCH_SOURCE_FILTER,
        //     payload: data
        // }))
    }
    else {
        dispatch({
            type: FETCH_SOURCE_FILTER_INITIAL
        })
    }
}


export const CategoryFilterData = (postData) => dispatch => {
    if (postData != "") {
        fetch(`${AppConstants.BASE_URL}/CategoryFetch/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(postData)
        })
            .then(res => res.json().then(data => ({ res, data })))
            .then(function (res, data) {

                if (res.res.status === 200) {
                    dispatch({
                        type: FETCH_CATEGORY_FILTER,
                        payload: res.data
                    })
                    dispatch({
                        type: CATEGORY_FILTER_LOADER_OFF,
                    })
                }

            })
        // .then(res => res.json())
        // .then(data => dispatch({
        //     type: FETCH_CATEGORY_FILTER,
        //     payload: data
        // }))
    }
    else {
        dispatch({
            type: FETCH_CATEGORY_FILTER_INITIAL
        })
    }
}

export const BrandFilterData = (postData) => dispatch => {

    if (postData != "") {
        fetch(`${AppConstants.BASE_URL}/BrandFetch/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(postData)
        })
            .then(res => res.json().then(data => ({ res, data })))
            .then(function (res, data) {

                if (res.res.status === 200) {
                    dispatch({
                        type: FETCH_BRAND_FILTER,
                        payload: res.data
                    })
                    dispatch({
                        type: BRAND_FILTER_LOADER_OFF,
                    })
                }

            })
        // .then(res => res.json())
        // .then(data => dispatch({
        //     type: FETCH_BRAND_FILTER,
        //     payload: data
        // }))
    }
    else {
        dispatch({
            type: FETCH_BRAND_FILTER_INITIAL
        })
    }
}



export const PSKUFilterData = (postData) => dispatch => {
    fetch(`${AppConstants.BASE_URL}/DataFetch/`, {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData)
    })
        .then(res => res.json().then(data => ({ res, data })))
        .then(function (res, data) {

            if (res.res.status === 200) {
                dispatch({
                    type: FETCH_PSKU_DATA,
                    payload: res.data
                })
                dispatch({
                    type: UPDATED_FLAG_FALSE,
                })
            }

        })

}

export const UpdatePSKU = (postData) => dispatch => {

    const self = this;
    fetch(`${AppConstants.BASE_URL}/UpdatePSKU/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData)
    })
        .then(res => res.json().then(data => ({ res, data })))
        .then(function (res, data) {

            if (res.res.status === 200) {
                dispatch({
                    type: UPDATED_FLAG,
                    payload: res.data
                })
            }

        })
}



export function loaderUpdate() {
    return dispatch => {
        dispatch({
            type: UPDATED_LOADER,
        })


    };
}

export function TableloaderUpdate() {
    return dispatch => {
        dispatch({
            type: TABLE_UPDATED_LOADER,
        })


    };
}

export function SourceFilterLoader() {
    return dispatch => {
        dispatch({
            type: SOURCE_FILTER_LOADER,
        })


    };
}

export function CategoryFilterLoader() {
    return dispatch => {
        dispatch({
            type: CATEGORY_FILTER_LOADER,
        })


    };
}

export function BrandFilterLoader() {
    return dispatch => {
        dispatch({
            type: BRAND_FILTER_LOADER,
        })


    };
}







export const UpdateTargetWD = (postData) => dispatch => {

    fetch(`${AppConstants.BASE_URL}/UpdateTargetWD/`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(postData)
        })
        .then(res => res.json().then(data => ({ res, data })))
        .then(function (res, data) {
            if (res.res.status === 200) {
                dispatch({
                    type: UPDATED_FLAG,
                    payload: res.data
                })
            }

        })
    // end






}



export const updateList = (key, value) => {
    return {
        type: UPDATE_LIST,
        key,
        value
    }
}

export const updateListData = (key, value) => {
    return {
        type: UPDATE_LIST_DATA,
        key,
        value
    }
}




