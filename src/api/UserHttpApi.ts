
import axios, { AxiosResponse } from 'axios';
import {UserFinal, Shelter} from '../store/UserReducer';

export const axiosInstance = axios.create({
	baseURL: 'https://frontend-assignment-api.goodrequest.com',
	timeout: 15000,
});


 export const UserHttpApi = {
    getShelterList: function() {
        return axiosInstance.request({
            method: "GET",
            url: `/api/v1/shelters`
        });
    },

    createUser: function(user: UserFinal) {
        return axiosInstance.request({
            method: "POST",
            url: `/api/v1/shelters/contribute`,
            data: user
        });
    }
}

