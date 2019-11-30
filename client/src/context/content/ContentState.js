import React, {useReducer} from 'react'
import axios from 'axios'
import ContentContext from './contentContext'
import contentReducer from './contentReducer'
import {
    GET_CONTENT,
    ADD_CONTENT,
    DELETE_CONTENT,
    SET_CURRENT_CONTENT,
    CLEAR_CURRENT_CONTENT,
    UPDATE_CONTENT,
    FILTER_CONTENT,
    CLEAR_CONTENT,
    CLEAR_FILTER_CONTENT,
    CONTENT_ERROR,
} from '../types'

const ContentState = props => {
    const initialState = {
        content: null,
        currentPage: null,
        filtered: null,
        error: null,
    }

    const [state, dispatch] = useReducer(contentReducer, initialState)

    // Get Content
    const getContent = async () => {
        try {
            const res = await axios.get('/api/content')

            dispatch({
                type: GET_CONTENT,
                payload: res.data,
            })
        } catch (err) {
            dispatch({
                type: CONTENT_ERROR,
                payload: err.response.msg,
            })
        }
    }

    // Add Content
    const addContent = async (content) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }

        try {
            const res = await axios.post('/api/content', content, config)

            dispatch({
                type: ADD_CONTENT,
                payload: res.data,
            })
        } catch (err) {
            dispatch({
                type: CONTENT_ERROR,
                payload: err.response.msg,
            })
        }
    }

    // Delete Content
    const deleteContent = async (id) => {
        try {
            await axios.delete(`/api/content/${id}`)

            dispatch({
                type: DELETE_CONTENT,
                payload: id,
            })
        } catch (err) {
            dispatch({
                type: CONTENT_ERROR,
                payload: err.response.msg,
            })
        }
    }

    // Update Content
    const updateContent = async (content) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }

        try {
            const res = await axios.put(
                `/api/content/${content._id}`,
                content,
                config,
            )

            dispatch({
                type: UPDATE_CONTENT,
                payload: res.data,
            })
        } catch (err) {
            dispatch({
                type: CONTENT_ERROR,
                payload: err.response.msg,
            })
        }
    }

    // Clear Content
    const clearContent = () => {
        dispatch({type: CLEAR_CONTENT})
    }

    // Set Current Content
    const setCurrent = (content) => {
        dispatch({type: SET_CURRENT_CONTENT, payload: content})
    }

    // Clear Current Content
    const clearCurrent = () => {
        dispatch({type: CLEAR_CURRENT_CONTENT})
    }

    // Filter Content
    const filterContent = (text) => {
        dispatch({type: FILTER_CONTENT, payload: text})
    }

    // Clear Filter
    const clearFilter = () => {
        dispatch({type: CLEAR_FILTER_CONTENT})
    }

    return (
        <ContentContext.Provider
            value={{
                content: state.content,
                currentPage: state.currentPage,
                filtered: state.filtered,
                error: state.error,
                addContent,
                deleteContent,
                setCurrent,
                clearCurrent,
                updateContent,
                filterContent,
                clearFilter,
                getContent,
                clearContent,
            }}
        >
            {props.children}
        </ContentContext.Provider>
    )
}

export default ContentState
