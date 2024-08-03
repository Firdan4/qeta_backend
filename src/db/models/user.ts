import { DataTypes, Model, Optional } from "sequelize";
import connection from "../../config/dbConnection";

interface UserAttributes {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  refreshToken?: string | null;
  tokenVerificationEmail?: string | null;
  displayName?: string | null;
  photoURL?: string | null | undefined;
  bio?: string | null;
  followingCount?: number;
  followersCount?: number;
  likesCount?: number;
  youtube?: string | null;
  instagram?: string | null;
  tiktok?: string | null;
  facebook?: string | null;
  verifiedAccount?: boolean;
  phoneNumber?: string;
  token?: string;
  isPublic?: boolean;

  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserInput extends Optional<UserAttributes, "id"> {}

class User extends Model<UserAttributes, UserInput> implements UserAttributes {
  public id!: number;
  public firstName!: string;
  public lastName!: string;
  public email!: string;
  public password!: string;
  public refreshToken!: string | null;
  public tokenVerificationEmail!: string | null;
  public displayName!: string | null;
  public photoURL!: string | null | undefined;
  public bio!: string | null;
  public followingCount!: number;
  public followersCount!: number;
  public likesCount!: number;
  public youtube!: string | null;
  public instagram!: string | null;
  public tiktok!: string | null;
  public facebook!: string | null;
  public verifiedAccount!: boolean;
  public phoneNumber!: string;
  public token!: string;
  public isPublic!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User?.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT,
    },
    firstName: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    lastName: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    email: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    refreshToken: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    tokenVerificationEmail: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    displayName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    photoURL: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bio: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    followingCount: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "0",
    },
    followersCount: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "0",
    },
    likesCount: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "0",
    },
    youtube: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    instagram: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tiktok: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    facebook: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    verifiedAccount: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isPublic: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    sequelize: connection,
    underscored: false,
  }
);

export default User;
