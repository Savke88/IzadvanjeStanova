const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.deleteOldRealEstate = functions.pubsub.schedule('every 24 hours').onRun(async (context) => {
  const firestore = admin.firestore();
  const threshold = admin.firestore.Timestamp.fromMillis(Date.now() - (90 * 24 * 60 * 60 * 1000)); // 90 dana
  const oldRealEstateQuery = firestore.collection('Nektretnine').where('createdAt', '<', threshold);

  const snapshot = await oldRealEstateQuery.get();
  const batch = firestore.batch();
  snapshot.docs.forEach(doc => {
    batch.delete(doc.ref);
  });
  await batch.commit();

  console.log('Obrisane su nekretnine u bazi starije od 90 dana');
});
