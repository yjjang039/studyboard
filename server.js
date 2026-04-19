const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = 3000;

// 클라이언트가 보내는 JSON 데이터를 읽을 수 있도록 설정
app.use(express.json());

// 현재 폴더의 정적 파일(HTML, CSS, JS 등)을 클라이언트가 접근할 수 있도록 설정
app.use(express.static(__dirname));

const DB_FILE = path.join(__dirname, 'db.json');

// 1. 데이터 불러오기 API
app.get('/api/data', (req, res) => {
  if (fs.existsSync(DB_FILE)) {
    res.json(JSON.parse(fs.readFileSync(DB_FILE, 'utf-8')));
  } else {
    res.json({plans:[], timeline:[], cards:[], specs:[], badges:[]});
  }
});

// 2. 데이터 저장하기 API
app.post('/api/data', (req, res) => {
  fs.writeFileSync(DB_FILE, JSON.stringify(req.body, null, 2));
  res.json({ success: true });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`서버가 정상적으로 실행 중입니다: http://localhost:${PORT}`);
});