import axios from 'axios';

/**
 * @description A function to upload an image to cloudinary
 * 
 * @param {string} image
 * 
 * @return {object} request promise object
 */
const imageUplaod = (image) => {
  const { CLOUDINARY_UPLOAD_PRESET, CLOUDINARY_URL } = process.env;
  let formData = new FormData();
  formData.append('file', image);
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
  delete axios.defaults.headers.common.authorization;
  return axios({
    method: 'POST',
    url: CLOUDINARY_URL,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: formData
  });
}

export default imageUplaod;
