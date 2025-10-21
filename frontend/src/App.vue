<template>
  <main class="app-wrapper">
    <div class="card">
      <h1 class="title">🔗 Short URL</h1>

      <CreateShort @created="loadUrls" />

      <hr class="divider" />

      <h2 class="history-title">📜 ประวัติการสร้าง</h2>
      <UrlList :urls="urls" />
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import axios from 'axios'
import CreateShort from './components/CreateShort.vue'
import UrlList from './components/UrlList.vue'

const urls = ref([])

const loadUrls = async () => {
  try {
    const res = await axios.get('http://localhost:5000/api/history')
    urls.value = res.data
  } catch (err) {
    console.error("Error loading history:", err)
  }
}

onMounted(() => {
  loadUrls()
  window.addEventListener('created', loadUrls)
})

onBeforeUnmount(() => {
  window.removeEventListener('created', loadUrls)
})
</script>

<style scoped>
.app-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #e6e6e6;
  padding: 20px;
}

.card {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 600px;
  padding: 40px 30px;
  text-align: center;
  transition: transform 0.2s ease;
}
.card:hover {
  transform: translateY(-3px);
}

.title {
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 10px;
}

.divider {
  border: none;
  height: 1px;
  background: #eaeaea;
  margin: 40px 0;
}

.history-title {
  font-size: 1.3rem;
  color: #2c3e50;
  margin-bottom: 20px;
}
</style>
