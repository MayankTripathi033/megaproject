const Conf = {
    appwriteURL: String(import.meta.env.VITE_APP_APPWRITE_URL),
    appwritePROJECT: String(import.meta.env.VITE_APP_APPWRITE_PROJECT_ID),
    appwriteDATABASE: String(import.meta.env.VITE_APP_APPWRITE_DATABASE_ID),
    appwriteCOLLECTION: String(import.meta.env.VITE_APP_APPWRITE_COLLECTION_ID),
    appwriteBUCKET: String(import.meta.env.VITE_APP_APPWRITE_BUCKET_ID)
}

export default Conf;