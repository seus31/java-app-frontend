import { gql } from '@apollo/client/core'

// タスク一覧取得 (READ)
export const GET_TODOS = gql`
    query GetTodos {
        getTodos {
            id
            title
            completed
        }
    }
`

// タスク取得 (READ)
export const GET_TODO = gql`
    query GetTodo {
        getTodo {
            id
            title
            completed
        }
    }
`

// タスク追加 (CREATE)
export const CREATE_TODO = gql`
    mutation CreateTodo($title: String!) {
        createTodo(title: $title) {
            id
            title
        }
    }
`

// タスク更新 (UPDATE)
export const UPDATE_TODO = gql`
    mutation UpdateTodo($id: ID!, $title: String!, $completed: Boolean!) {
        updateTodo(id: $id, input: { title: $title, completed: $completed }) {
            id
            title
            completed
        }
    }
`

// タスク削除 (DELETE)
export const DELETE_TODO = gql`
    mutation DeleteTodo($id: ID!) {
        deleteTodo(id: $id) {
            id
        }
    }
`
