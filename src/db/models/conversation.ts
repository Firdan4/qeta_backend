import { DataTypes, Model, Optional } from "sequelize";
import connection from "../../config/dbConnection";
import User from "./user";
import Message from "./message";

export type ConversationAttributes = {
  id: string;
  senderId: string;
  receiverId: string;
  lastMessage: string;
  isArchive: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
};

export interface ConversationInput
  extends Optional<ConversationAttributes, "updatedAt"> {}

class Conversation
  extends Model<ConversationAttributes, ConversationInput>
  implements ConversationAttributes
{
  public id!: string;
  public senderId!: string;
  public receiverId!: string;
  public lastMessage!: string;
  public isArchive!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

Conversation.init(
  {
    id: {
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      type: DataTypes.UUID,
    },
    senderId: {
      type: DataTypes.CHAR(14),
      allowNull: false,
    },
    receiverId: {
      type: DataTypes.CHAR(14),
      allowNull: false,
    },
    lastMessage: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    isArchive: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
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

Conversation.hasMany(Message, { foreignKey: "conversationId", as: "message" });
Conversation.belongsTo(User, { foreignKey: "receiverId", as: "user" });

export default Conversation;
