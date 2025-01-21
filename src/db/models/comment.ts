import { DataTypes, Model, Optional } from "sequelize";
import connection from "../../config/dbConnection";
import User, { UserAttributes } from "./user";
import Reply from "./reply";

export type CommentAttributes = {
  id: number;
  postId: number;
  userId: number;
  content: string;
  tags?: string;
  pinned: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
};

export interface CommentInput
  extends Optional<
    CommentAttributes,
    "id" | "createdAt" | "updatedAt" | "deletedAt"
  > {}

class Comment
  extends Model<CommentAttributes, CommentInput>
  implements UserAttributes
{
  public id!: number;
  public postId!: number;
  public userId!: number;
  public content!: string;
  public tags?: string;
  public pinned!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

Comment.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    postId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    content: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    tags: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    pinned: {
      defaultValue: false,
      type: DataTypes.BOOLEAN,
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

Comment.hasMany(Reply, {
  foreignKey: "commentId",
  as: "replies",
  onDelete: "CASCADE", // Jika comment dihapus, reply terkait juga dihapus
});
User.hasMany(Comment, {
  foreignKey: "userId",
  as: "comments",
  onDelete: "CASCADE",
});
Comment.belongsTo(User, { foreignKey: "userId", as: "users" });

export default Comment;
