const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// ==========================================
// 1. Setup Instructions
// ==========================================
// This script pulls the latest "site-content" from Firestore 
// and overwrites your local src/data/cms-backup.json file.
//
// You must have a 'service-account.json' file in your root directory 
// that corresponds to your ACTIVE Firebase project.
// Go to Firebase Console > Project Settings > Service Accounts > Generate New Private Key
// ==========================================

const serviceAccountPath = path.join(__dirname, 'service-account.json');
const backupFilePath = path.join(__dirname, 'src', 'data', 'cms-backup.json');

if (!fs.existsSync(serviceAccountPath)) {
  console.error("❌ Error: Missing 'service-account.json' file.");
  console.error("Please generate one from the Firebase Console and place it in the root directory.");
  process.exit(1);
}

const serviceAccount = require(serviceAccountPath);

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function syncCMS() {
  console.log(`\n⏳ Syncing CMS content from [${serviceAccount.project_id}]...`);
  
  try {
    const snapshot = await db.collection('site-content').get();
    
    if (snapshot.empty) {
      console.log(`⚠️ Collection [site-content] is empty. Nothing to sync.`);
      return;
    }

    const backupData = {};
    let count = 0;

    for (const doc of snapshot.docs) {
      backupData[doc.id] = doc.data();
      count++;
    }

    // Ensure the data directory exists
    const dataDir = path.dirname(backupFilePath);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    // Write the JSON file beautifully formatted
    fs.writeFileSync(backupFilePath, JSON.stringify(backupData, null, 2), 'utf8');

    console.log(`✅ Successfully synced ${count} CMS documents into src/data/cms-backup.json`);
    console.log(`🚀 You can now commit this file to Git to lock in your hardcoded backup!`);
  } catch (error) {
    console.error(`❌ Error syncing CMS content:`, error);
  } finally {
    process.exit(0);
  }
}

syncCMS();
