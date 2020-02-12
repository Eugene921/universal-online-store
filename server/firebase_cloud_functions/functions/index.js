const functions = require('firebase-functions');
const path = require('path');
const os = require('os');
const cors = require('cors')({ origin: true });
const Busbuy = require('busboy');
const fs = require('fs');
const gcs = require('@google-cloud/storage');


const admin = require("firebase-admin");

const serviceAccount = require('./my-store-9b009-firebase-adminsdk-xzo09-b7c5da9d66.json');

const FirebaseApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://my-store-9b009.firebaseio.com"
});
console.log(FirebaseApp);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.uploadImages = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    if (req.metod !== 'POST') {
      return res.status(500).json({
        message: 'Not allowed!',
      })
    }

    const busboy = new Busbuy({ headers: req.headers });
    let uploadImages = null;

    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
      const filepath = path.join(os.tmpdir(), filename);
      uploadImages = { file: filepath, type: mimetype };
      file.pipe(fs.createWriteStream(filepath))
    });

    busboy.on('finish', () => {
      const backet = gcs.backet('gs://my-store-9b009.appspot.com');
      backet.upload(uploadImages.file, {
        uploadType: 'media',
        metadata: {
          metadate: {
            contentType: uploadImages.type,
          }
        }
      },)
      .then(() => {
        return res.status(200).json({ message: 'It worked!' })
      })
      .catch(err => {
        return res.status(500).join({ error: err })
      })
    })
    return busboy.end(req.rawBody);
  })
});
