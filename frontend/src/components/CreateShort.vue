<template>
  <div class="shorten-container">
    <div class="input-group">
      <input
        v-model="longUrl"
        placeholder="วางลิงก์ของคุณที่นี่..."
        @keyup.enter="createShort"
      />
      <button @click="createShort">Shorten</button>
    </div>

    <p v-if="message" class="message">{{ message }}</p>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref } from 'vue'

const longUrl = ref('')
const message = ref('')

const createShort = async () => {
  if (!longUrl.value.trim()) {
    message.value = '⚠️ กรุณากรอก URL ก่อน'
    return
  }

  try {
    await axios.post('http://localhost:5000/api/shorten', { longUrl: longUrl.value })
    message.value = '✅ สร้าง Short URL สำเร็จ!'
    longUrl.value = ''
    setTimeout(() => (message.value = ''), 2000)
    window.dispatchEvent(new CustomEvent('created'))
  } catch (error) {
    message.value = '❌ ไม่สามารถสร้าง Short URL ได้'
    console.error(error)
  }
}
</script>

<style scoped>
.shorten-container {
  background: white;
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  transition: transform 0.2s;
}

.shorten-container:hover {
  transform: translateY(-2px);
}

h2 {
  color: #2c3e50;
  margin-bottom: 10px;
  font-weight: 600;
}

.input-group {
  display: flex;
  width: 100%;
  max-width: 500px;
  background: #f5f7fb;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: inset 0 0 0 1px #e0e0e0;
}

input {
  flex: 1;
  padding: 12px 14px;
  border: none;
  outline: none;
  background: transparent;
  font-size: 1rem;
}

button {
  background: linear-gradient(135deg, #74ABE2, #5563DE);
  color: white;
  border: none;
  padding: 12px 24px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: background 0.3s, transform 0.1s;
}

button:hover {
  background: linear-gradient(135deg, #5d93d8, #3949c9);
}

button:active {
  transform: scale(0.98);
}

.message {
  margin-top: 8px;
  color: #2c3e50;
  font-weight: 500;
}
</style>
