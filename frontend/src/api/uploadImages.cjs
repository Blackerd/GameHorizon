const fs = require('fs');
const path = require('path');
const axios = require('axios');
const FormData = require('form-data');

const folder = path.join(__dirname, 'images');
const files = fs.readdirSync(folder);

(async () => {
  for (const file of files) {
    const filePath = path.join(folder, file);
    const formData = new FormData();
    formData.append('file', fs.createReadStream(filePath));
    const res = await axios.post('http://localhost:8080/api/cloudinary/upload', formData, {
      headers: formData.getHeaders(),
    });
    console.log(`${file}: ${res.data.url}`);
  }
})();