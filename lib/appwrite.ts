import { Account, Avatars, Client, Databases, ID } from 'react-native-appwrite';

export const appwriteConfig = {
  endpoint: 'https://cloud.appwrite.io/v1',
  platform: 'com.jsm.aora.melrain',
  projectId: '664aad2f0028e2c9a4fb',
  databaseId: '664aae4c001db9c3bf3a',
  userCollectionId: '664aae7100095fd4ef19',
  videoCollectionId: '664aae92003aba1a5052',
  storageId: '664ab2060016ab44b62c'
};

const client = new Client();
const account = new Account(client); //auth
const avatars = new Avatars(client);
const databases = new Databases(client);

client.setEndpoint(appwriteConfig.endpoint).setProject(appwriteConfig.projectId).setPlatform(appwriteConfig.platform);

// createUser

interface createUserProps {
  username: string;
  email: string;
  password: string;
}
export const createUser = async ({ username, email, password }: createUserProps) => {
  try {
    const newAccount = await account.create(ID.unique(), email, password, username);
    if (!newAccount) {
      throw new Error('Failed to create user');
    }

    // 用户名首字母大写作为头像
    const avatarUrl = avatars.getInitials(username);

    await signIn({ email, password });

    // 将注册在auth的用户写入数据库
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl
      }
    );

    return newUser;
  } catch (error) {
    console.error(error);
  }
};

// signIn function

interface SignInProps {
  email: string;
  password: string;
}
export const signIn = async ({ email, password }: SignInProps) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    console.error(error);
  }
};
