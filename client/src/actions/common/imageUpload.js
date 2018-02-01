import axios from 'axios';

const imageUplaod = (image) => {
  let formData = new FormData();
  formData.append('file', image);
  formData.append('upload_preset', 'y5ewfnvb');
  return axios({
    method: 'POST',
    url: 'https://api.cloudinary.com/v1_1/oti4me/image/upload',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: formData
  });
}

export default imageUplaod;
