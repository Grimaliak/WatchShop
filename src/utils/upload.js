import multer from 'multer';
import path from 'path';

function randomStringFuncFactory(alph) {
  return (len) => {
    return Array(len)
      .fill()
      .map(() => alph[Math.floor(Math.random() * alph.length)])
      .join('');
  };
}

const randomStringLatinDigit = randomStringFuncFactory([
  ...'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
]);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve('public', 'uploaded-images'));
  },
  filename: function (req, file, cb) {
    const ext = file.originalname.match(/\.[^\.]*$/)?.[0] ?? '';
    const randomName = randomStringLatinDigit(20 - ext.length) + ext;
    cb(null, randomName);
  },
});

export default multer({ storage });
