<template>
  <div>
    <h1>Todo Manager</h1>

    <!-- タスク追加フォーム -->
    <form @submit.prevent="addTodo">
      <input v-model="newTodo.title" placeholder="Title" required />
      <button type="submit">Add Todo</button>
    </form>

    <!-- タスク一覧表示 -->
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        <input type="checkbox" v-model="todo.completed" @change="updateTodo(todo)" />
        <span>{{ todo.title }}</span>
        <button @click="deleteTodo(todo.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useNuxtApp } from '#app'
import { GET_TODOS, CREATE_TODO, UPDATE_TODO, DELETE_TODO } from '~/graphql/todoQueries'
import type { TodoType } from '~/types/TodoType'

const { $apollo } = useNuxtApp()
const todos = ref([])
const newTodo = ref({ title: '' })

// タスク一覧取得 (READ)
const fetchTodos = async () => {
  const { data } = await $apollo.query({ query: GET_TODOS })
  todos.value = data.getTodos
}

// タスク追加 (CREATE)
const addTodo = async () => {
  await $apollo.mutate({
    mutation: CREATE_TODO,
    variables: { ...newTodo.value },
    refetchQueries: [{ query: GET_TODOS }],
  })
  newTodo.value = { title: '' }
}

// タスク更新 (UPDATE)
const updateTodo = async (todo: TodoType) => {
  await $apollo.mutate({
    mutation: UPDATE_TODO,
    variables: { ...todo },
  })
}

// タスク削除 (DELETE)
const deleteTodo = async (id: number) => {
  await $apollo.mutate({
    mutation: DELETE_TODO,
    variables: { id },
    refetchQueries: [{ query: GET_TODOS }],
  })
}

onMounted(fetchTodos)
</script>

<style scoped>
/* 必要に応じてスタイルを追加 */
</style>
