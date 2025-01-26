import { DataTypes, Model, Optional } from "sequelize";
import connection from "../../config/dbConnection";
import User from "./user";
import Like from "./like";

export type CommentAttributes = {
  id: string;
  postId: string;
  userId: string;
  parentId: string | null;
  content: string;
  likeCount: number;
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
  implements CommentAttributes
{
  public id!: string;
  public postId!: string;
  public userId!: string;
  public parentId!: string | null;
  public content!: string;
  public likeCount!: number;
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
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    postId: {
      allowNull: false,
      type: DataTypes.CHAR(14),
    },
    userId: {
      allowNull: false,
      type: DataTypes.CHAR(14),
    },
    parentId: {
      defaultValue: null,
      allowNull: true,
      type: DataTypes.UUID,
    },
    content: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    likeCount: {
      defaultValue: 0,
      type: DataTypes.INTEGER,
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

Comment.hasMany(Like, {
  foreignKey: "commentId",
  as: "like",
});

User.hasMany(Comment, {
  foreignKey: "userId",
  as: "comments",
  onDelete: "CASCADE",
});
Comment.belongsTo(User, { foreignKey: "userId", as: "user" });

export default Comment;
