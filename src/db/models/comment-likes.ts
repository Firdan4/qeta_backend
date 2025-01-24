import { DataTypes, Model, Optional } from "sequelize";
import { PostAttributes } from "./post";
import connection from "../../config/dbConnection";

export type CommentLikeAttributes = {
  id: number; // Primary Key
  userId: string; // Foreign Key to User
  commentId: string; // Foreign Key to Post
  createdAt: Date; // CommentLike creation timestamp
  updatedAt: Date; // CommentLike creation timestamp
  deletedAt: Date; // CommentLike creation timestamp
};

export interface CommentLikeInput
  extends Optional<
    CommentLikeAttributes,
    "id" | "createdAt" | "updatedAt" | "deletedAt"
  > {}

class CommentLike
  extends Model<CommentLikeAttributes, CommentLikeInput>
  implements PostAttributes
{
  public id!: number;
  public userId!: string;
  public commentId!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

CommentLike.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.UUID,
    },
    commentId: {
      type: DataTypes.UUID,
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
    tableName: "comment-likes",
  }
);

export default CommentLike;
