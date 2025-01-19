import { DataTypes, Model, Optional } from "sequelize";
import { PostAttributes } from "./post";
import connection from "../../config/dbConnection";

export type LikeAttributes = {
  id: number; // Primary Key
  userId: number; // Foreign Key to User
  postId: number; // Foreign Key to Post
  createdAt: Date; // Like creation timestamp
  updatedAt: Date; // Like creation timestamp
  deletedAt: Date; // Like creation timestamp
};

export interface LikeInput
  extends Optional<
    LikeAttributes,
    "id" | "createdAt" | "updatedAt" | "deletedAt"
  > {}

class Like extends Model<LikeAttributes, LikeInput> implements PostAttributes {
  public id!: number;
  public userId!: number;
  public postId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

Like.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.BIGINT,
    },
    postId: {
      type: DataTypes.BIGINT,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    deletedAt: {
      allowNull: true,
      type: DataTypes.DATE,
    },
  },
  {
    timestamps: true,
    sequelize: connection,
    underscored: false,
    paranoid: true,
  }
);

export default Like;
