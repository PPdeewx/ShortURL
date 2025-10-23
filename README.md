github = https://github.com/PPdeewx/ShortURL.git

วิธีลง
1.git clone https://github.com/PPdeewx/ShortURL
2.สร้าง .env ในโฟลเดอร์ backend
3.เพิ่มข้อมูลลงใน .env (ถ้าlocalhostให้ใช้ข้อมูลของlocalhost)
    PORT=5000
    MONGO_URI=mongodb+srv://admin:adminpass@shorturl.ucblw46.mongodb.net/
    BASE_URL=https://shorturl-backend-n4pz.onrender.com
4.ทำการรันbackend(terminal) = 
    cd backend
    node server.js
5.ทำการรันfrontend(terminal) =
    cd frontend
    npm run dev
    (ถ้าlocalhostให้ใช้ข้อมูลของlocalhostในส่วนของapi)

deploy url free host

backend = render
https://shorturl-backend-n4pz.onrender.com

frontend = vercel
https://short-url-seven-ashy.vercel.app
