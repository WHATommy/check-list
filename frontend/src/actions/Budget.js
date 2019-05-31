import {
    GET_ERRORS,
    GET_BUDGET,
    DELETE_BUDGET
} from './Types';
import Axios from 'axios';

const getBudget = (budgetId) => {
    Axios
        .get(`/budget/budgetlogs/${budgetId}`)
        .then(res => {

        })
}