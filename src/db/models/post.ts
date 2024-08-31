import { DataTypes, Model, Optional } from "sequelize";
import connection from "../../config/dbConnection";

export interface PostAttributes {
  id?: number;
  idUser?: number;
  typePost?: string;
  idSound?: number;
  source?: string;
  thumbnail?: string;
  description?: string;
  shared?: string;
  tags?: string;
  mention?: string;
  isComment?: string;
  isPublic?: string;
  views?: string;
  additionalLink?: string;
  geolocation?: string;

  createdAt?: Date;
  updatedAt?: Date;
}

export interface PostInput extends Optional<PostAttributes, "id"> {}

class Post extends Model<PostAttributes, PostInput> implements PostAttributes {
  public id!: number;
  public idUser!: number;
  public typePost!: string;
  public idSound!: number;
  public source!: string;
  public thumbnail!: string;
  public description!: string;
  public shared!: string;
  public tags!: string;
  public mention!: string;
  public isComment!: string;
  public isPublic!: string;
  public views!: string;
  public additionalLink!: string;
  public geolocation!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Post.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT,
    },
    idUser: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    typePost: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    idSound: {
      allowNull: true,
      type: DataTypes.INTEGER,
    },
    source: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    thumbnail: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    description: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    shared: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    tags: {
      type: DataTypes.STRING,
      defaultValue: "[]",
    },
    mention: {
      type: DataTypes.STRING,
      defaultValue: "[]",
    },
    isComment: {
      type: DataTypes.STRING,
      defaultValue: "anyone",
    },
    isPublic: {
      type: DataTypes.STRING,
      defaultValue: "anyone",
    },
    views: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    additionalLink: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    geolocation: {
      allowNull: true,
      type: DataTypes.STRING,
      defaultValue: "[]",
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  },
  {
    timestamps: true,
    sequelize: connection,
    underscored: false,
  }
);

export default Post;
