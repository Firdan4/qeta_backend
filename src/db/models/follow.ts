import { DataTypes, Model, Optional } from "sequelize";
import connection from "../../config/dbConnection";
import { UserAttributes } from "./user";

export type FollowAttributes = {
  id: number; // Primary Key
  followerId: string; // Foreign Key to User
  followingId: string; // Foreign Key to User
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
  implements FollowAttributes
{
  public id!: number;
  public followerId!: string;
  public followingId!: string;

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
      type: DataTypes.UUID,
    },
    followingId: {
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
  }
);

export default Follow;
