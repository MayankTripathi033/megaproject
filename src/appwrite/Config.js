import {Client, ID, Databases, Storage, Query} from 'appwrite';
import Conf from '../Conf/Conf';


export class DatabaseService{
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client
        .setEndpoint(Conf.appwriteURL)
        .setProject(Conf.appwritePROJECT);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title, slug, content, featuredImage, status, userId}){
        try {
            return await this.databases.createDocument(
                Conf.appwriteDATABASE,
                Conf.appwriteCOLLECTION,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        } catch (error) {
            console.log("appwrite :: createpost :: error", error);
        }
    }

    async updatePost(slug,{title, content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(Conf.appwriteCOLLECTION, Conf.appwriteDATABASE, slug, {
                title,
                content,
                featuredImage,
                status
            })
        } catch (error) {
            console.log("Appwrite Service :: updatePost :: error", error);
        }
    }

    async deletePost(slug){
        try {
             await this.databases.deleteDocument(
                Conf.appwriteDATABASE,
                Conf.appwriteCOLLECTION,
                slug,
            ) 
            return true;
        } catch (error) {
            console.log("appwrite :: deletePost :: error", error);
            return false;
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                slug,
                Conf.appwriteCOLLECTION,
                Conf.appwriteDATABASE
            )
        } catch (error) {
            console.log("Appwrite :: GetPost :: Error", error);
            return false;
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                Conf.appwriteCOLLECTION,
                Conf.appwriteDATABASE,
                queries,
                100
            )
        } catch (error) {
            console.log("Appwrite Service :: getPosts :: error", error);  
            return false; 
        }
    }
    //file upload method

    async uploadfile(file){
        try {
            await this.bucket.createFile(
                Conf.appwriteBUCKET,
                ID.unique(),
                file
            )
            return true;
        } catch (error) {
            console.log("appwrite service :: uploadfile :: error", error);
            return false;
        }
    }

    async deletefile(fileId){
        try {
            await this.bucket.deleteFile(
                Conf.appwriteBUCKET,
                fileId
            )
            return true;
        } catch (error) {
            console.log("Appwrite Service :: DeleteFile :: error", error);
            return false;
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            Conf.appwriteBUCKET,
            fileId,
        )
    }
}

const service = new DatabaseService;

export default service;