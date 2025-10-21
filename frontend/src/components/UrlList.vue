<template>
  <div class="history-container">
    <table v-if="urls.length" class="history-table">
      <thead>
        <tr>
          <th>Original URL</th>
          <th>Short URL</th>
          <th>Clicks</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="url in urls" :key="url._id">
          <td>
            <a :href="url.longUrl" target="_blank" class="original-link">
              {{ truncate(url.longUrl, 50) }}
            </a>
          </td>
          <td>
            <div class="short-link-container">
              <a :href="url.shortUrl" target="_blank" class="short-link">{{ url.shortUrl }}</a>
              <button class="copy-btn" @click="copyToClipboard(url.shortUrl)">Copy</button>
            </div>
          </td>
          <td>{{ url.clicks }}</td>
        </tr>
      </tbody>
    </table>

    <p v-else class="no-data">ยังไม่มีข้อมูลประวัติการสร้าง URL</p>
  </div>
</template>

<script setup>
const props = defineProps(['urls'])

const truncate = (text, length) => {
  return text.length > length ? text.slice(0, length) + '...' : text
}

const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text)
  alert('คัดลอก Short URL แล้ว ✅')
}
</script>

<style scoped>
.history-container {
  width: 100%;
  overflow-x: auto;
}

.history-table {
  width: 100%;
  border-collapse: collapse;
  background: #fdfdfd;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}

.history-table thead {
  background: #74ABE2;
  color: white;
}

.history-table th, .history-table td {
  padding: 12px 16px;
  text-align: left;
  font-size: 0.95rem;
}

.history-table tbody tr:nth-child(even) {
  background: #f7f9fc;
}

.history-table tbody tr:hover {
  background: #eef3ff;
}

.original-link, .short-link {
  color: #2c3e50;
  text-decoration: none;
  word-break: break-all;
}

.original-link:hover, .short-link:hover {
  text-decoration: underline;
}

.short-link-container {
  display: flex;
  align-items: center;
  gap: 8px;
}

.copy-btn {
  background: #5563DE;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.8rem;
  transition: background 0.2s;
}

.copy-btn:hover {
  background: #3d4ab8;
}

.no-data {
  color: #7f8c8d;
  font-style: italic;
  text-align: center;
  margin-top: 20px;
}
</style>
