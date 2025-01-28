import { DataTypes, Model, Optional } from "sequelize";
import connection from "../../config/dbConnection";
import Like from "./like";
import shortid from "shortid";

export interface PostAttributes {
  id?: string | number;
  idUser?: number;
  typePost?: string;
  idSound?: number;
  source?: string;
  thumbnail?: string;
  description?: string;
  tags?: string;
  mention?: string;
  isComment?: string;
  isPublic?: string;
  views?: string;
  likes?: string;
  comments?: string;
  shared?: string;
  additionalLink?: string;
  geolocation?: string;

  createdAt?: Date;
  updatedAt?: Date;
}

export interface PostInput extends Optional<PostAttributes, "id"> {}

class Post extends Model<PostAttributes, PostInput> implements PostAttributes {
  public id!: string | number;
  public idUser!: number;
  public typePost!: string;
  public idSound!: number;
  public source!: string;
  public thumbnail!: string;
  public description!: string;
  public tags!: string;
  public mention!: string;
  public isComment!: string;
  public isPublic!: string;
  public views!: string;
  public likes!: string;
  public comments!: string;
  public shared!: string;
  public additionalLink!: string;
  public geolocation!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Post.init(
  {
    id: {
      allowNull: false,
      primaryKey: true,
      defaultValue: shortid.generate,
      type: DataTypes.CHAR(14),
    },
    idUser: {
      allowNull: false,
      type: DataTypes.CHAR(14),
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
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    comments: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    shared: {
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

Post.hasMany(Like, {
  foreignKey: "postId",
  as: "like",
});

export default Post;
