import Conf from '../Conf/Conf';
import {Client, Account, ID} from 'appwrite';

export class AuthService {
    client = new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(Conf.appwriteURL)
            .setProject(Conf.appwritePROJECT)
        this.account = new Account(this.client);
    }

    async createAccount({email, password, name}){
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if(userAccount) {
            return this.login({email, password})} //Call another method
            else return userAccount;
        } catch (error) {
            throw error;
        }
    }

    async login({email, password}){
        try {
            const userlogin = await this.account.createEmailSession(email, password)
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser(){
        try {
            const currentuser =  await this.account.get();
            if(currentuser){
                return currentuser
            } else {
                console.log("User not found");
            }

        } catch (error) {
            console.log("Appwrite :: getCurrentUser :: error", error);
        }
        return null;
    }

    async logout(){
        try {
            await this.account.deleteSessions();
        } catch (error) {
            throw error
        }
    }
} 

const authService = new AuthService();

export default authService;