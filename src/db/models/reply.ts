import { DataTypes, Model, Optional } from "sequelize";
import connection from "../../config/dbConnection";
import User, { UserAttributes } from "./user";
import Comment from "./comment";

export type ReplyAttributes = {
  id: number;
  commentId: number;
  userId: number;
  content: string;
  tags?: string;
  pinned: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
};

export interface ReplyInput
  extends Optional<
    ReplyAttributes,
    "id" | "createdAt" | "updatedAt" | "deletedAt"
  > {}

class Reply
  extends Model<ReplyAttributes, ReplyInput>
  implements UserAttributes
{
  public id!: number;
  public commentId!: number;
  public userId!: number;
  public content!: string;
  public tags?: string;
  public pinned!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date | null;
}

Reply.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    commentId: {
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

User.hasMany(Reply, {
  foreignKey: "userId",
  as: "replies",
  onDelete: "CASCADE",
});
Reply.belongsTo(User, { foreignKey: "userId", as: "users" });
export default Reply;
