import { DataTypes, Model, Optional } from "sequelize";
import connection from "../../config/dbConnection";
import { UserAttributes } from "./user";

export type FollowAttributes = {
  id: number; // Primary Key
  followerId: number; // Foreign Key to User
  followingId: number; // Foreign Key to User
  createdAt: Date; // Like creation timestamp
  updatedAt: Date; // Like creation timestamp
  deletedAt: Date; // Like creation timestamp
};

export interface FollowInput
  extends Optional<
    FollowAttributes,
    "id" | "createdAt" | "updatedAt" | "deletedAt"
  > {}

class Follow
  extends Model<FollowAttributes, FollowInput>
  implements UserAttributes
{
  public id!: number;
  public followerId!: number;
  public followingId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

Follow.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    followerId: {
      type: DataTypes.INTEGER,
    },
    followingId: {
      type: DataTypes.INTEGER,
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

export default Follow;
