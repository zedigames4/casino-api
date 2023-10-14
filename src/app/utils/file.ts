import fs from 'fs';

const removeFile = (filenames: string | string[]) => {
  try {
    if (Array.isArray(filenames)) {
      for (let i = 0; i < filenames.length; i += 1) {
        const filePath = `uploads/${filenames[i]}`;
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
          console.log('File deleted successfully');
        } else {
          console.log('File does not exist');
        }
      }
    } else {
      const filePath = `uploads/${filenames}`;
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log('File deleted successfully');
      } else {
        console.log('File does not exist');
      }
    }
  } catch (error: any) {
    console.error(error?.message);
  }
};

export default removeFile;
