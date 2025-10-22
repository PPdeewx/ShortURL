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

    <div v-if="shortUrl" class="result-box">
      <p>
        ✅ Short URL ของคุณ:
        <a :href="shortUrl" target="_blank">{{ shortUrl }}</a>
      </p>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref } from 'vue'

const longUrl = ref('')
const message = ref('')
const shortUrl = ref('')

const createShort = async () => {
  if (!longUrl.value.trim()) {
    message.value = '⚠️ กรุณากรอก URL ก่อน'
    return
  }

  try {
    const res = await axios.post('http://localhost:5000/api/shorten', {
      longUrl: longUrl.value
    })

    shortUrl.value = res.data.shortUrl
    message.value = '✅ สร้าง Short URL สำเร็จ!'
    longUrl.value = ''

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

.result-box {
  margin-top: 12px;
  background: #f8faff;
  border-radius: 10px;
  padding: 12px 20px;
  box-shadow: 0 0 0 1px #e2e6ef;
  text-align: center;
}

.result-box a {
  color: #3949c9;
  font-weight: 600;
  word-break: break-all;
  text-decoration: none;
}

.result-box a:hover {
  text-decoration: underline;
}
</style>
