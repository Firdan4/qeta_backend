import { DataTypes, Model, Optional } from "sequelize";
import connection from "../../config/dbConnection";
import User from "./user";

type Reply = {
  title: string;
  value: string;
  messageId?: number | string;
};

type QuickReplies = {
  type: "radio" | "checkbox";
  values: Reply[];
  keepIt?: boolean;
};

export type MessageAttributes = {
  _id: string | number;
  conversationId: string;
  text: string;
  senderId: string;
  receiverId: string;
  image?: string;
  video?: string;
  audio?: string;
  system?: boolean;
  sent?: boolean;
  received?: boolean;
  pending?: boolean;
  quickReplies?: QuickReplies;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
};

class Message extends Model<MessageAttributes> implements MessageAttributes {
  public _id!: string | number;
  public conversationId!: string;
  public text!: string;
  public senderId!: string;
  public receiverId!: string;
  public image!: string;
  public video!: string;
  public audio!: string;
  public system!: boolean;
  public sent!: boolean;
  public received!: boolean;
  public pending!: boolean;
  public quickReplies!: QuickReplies;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

Message.init(
  {
    _id: {
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      type: DataTypes.UUID,
    },
    conversationId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    senderId: {
      type: DataTypes.CHAR(14),
      allowNull: false,
    },
    receiverId: {
      type: DataTypes.CHAR(14),
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    video: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    audio: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    system: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: true,
    },
    sent: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: true,
    },
    received: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: true,
    },
    pending: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: true,
    },
    quickReplies: {
      type: DataTypes.JSON,
      allowNull: true,
      comment: "Stores quick reply options in JSON format",
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

Message.belongsTo(User, { foreignKey: "senderId", as: "user" });

export default Message;
