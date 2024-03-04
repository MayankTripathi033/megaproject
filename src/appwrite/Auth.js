import Conf from '../Conf/Conf';
import {client, Account, ID} from 'appwrite';

export class AuthService {
    client = new client();
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
            if(userAccount) return this.login({email, password}) //Call another method
            else return userAccount;
        } catch (error) {
            throw error;
        }
    }

    async login({email, password}){
        try {
            const userlogin = await this.account.createEmailSession(email, password)
            if(userlogin) return;
            else return userlogin;
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser(){
        try {
            await this.account.get();
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