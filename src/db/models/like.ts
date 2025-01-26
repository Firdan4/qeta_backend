import { DataTypes, Model, Optional, UUIDV4 } from "sequelize";
import { PostAttributes } from "./post";
import connection from "../../config/dbConnection";

export type LikeAttributes = {
  id: number; // Primary Key
  userId: string; // Foreign Key to User
  postId: string; // Foreign Key to Post
  commentId: string; // Foreign Key to Post
  likeType: "post" | "comment"; // Foreign Key to Post
  createdAt: Date; // Like creation timestamp
  updatedAt: Date; // Like creation timestamp
  deletedAt: Date; // Like creation timestamp
};

export interface LikeInput
  extends Optional<
    LikeAttributes,
    "id" | "createdAt" | "updatedAt" | "deletedAt"
  > {}

class Like extends Model<LikeAttributes, LikeInput> implements LikeAttributes {
  public id!: number;
  public userId!: string;
  public postId!: string;
  public commentId!: string;
  public likeType!: "post" | "comment";

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

Like.init(
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.CHAR(14),
    },
    postId: {
      type: DataTypes.CHAR(14),
    },
    commentId: {
      type: DataTypes.UUID,
    },
    likeType: {
      allowNull: false,
      defaultValue: "post",
      type: DataTypes.ENUM("post", "comment"),
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
