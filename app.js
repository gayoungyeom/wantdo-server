const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv'); //환경변수 관리
const { json } = require('./middlewares/result');

dotenv.config();

const app = express();
app.use(cors());
app.set('port', process.env.PORT);

//클라이언트에서 api 요청을 보낼 때 body로 넘어온 값을 파싱하는 역할 수행
app.use(express.json()); //for parsing application/json
app.use(express.urlencoded({ extended: false })); //for parsing application/x-ww-form-urlencoded

app.use('/bean', require('./routes/bean'));

app.use(json.notFound);
app.use(json.result);
app.use(json.internalServerError);

app.listen(app.get('port'), async () => {
  console.log(`Example app listening at http://localhost:${app.get('port')}`);
});
