import createError from "http-errors";
import { Response } from "express";
import { TRequest } from "../types";
import Follow from "../db/models/follow";
import User from "../db/models/user";
import connection from "../config/dbConnection";

// this is follow and unfollow endpoint
export const getFollow = async (req: TRequest, res: Response) => {
  const { followingId } = req.params;
  const followerId = req.id;

  try {
    const follow = await Follow.findAll({
      where: { followingId },
    });

    const isFollow = follow.some((item) => item.followerId === followerId);
    const data = {
      isFollow,
      follow,
      followCount: follow.length,
    };

    return res.status(200).send({
      message: "Get Follow Succesfully",
      data,
    });
  } catch (error: any) {
    return res.status(error.status || 500).send({
      message: error.message || "Internal Error!",
    });
  }
};

export const follow = async (req: TRequest, res: Response) => {
  try {
    const { followingId } = req.body;
    const followerId = req.id as number;

    if (!followingId || !followerId) {
      throw createError(400, "Missing required fields");
    }

    if (typeof followingId !== "number") {
      throw createError(400, "Invalid data type");
    }

    const user = await User.findByPk(followerId);
    if (!user) {
      throw createError(400, "User not found");
    }

    const data = await connection.transaction(async (t) => {
      user.followersCount = Number(user.followersCount) + 1; // perlu ubah di model menjadi integer
      await user.save({ transaction: t });

      const [data, created] = await Follow.findOrCreate({
        where: { followingId, followerId },
        paranoid: false, // Sertakan data yang dihapus untuk diperiksa
        transaction: t,
      });

      if (!created && data.deletedAt) {
        // Jika entri sudah ada namun soft deleted, pulihkan
        await data.restore();
        console.log("User Follow again!");
      }
      return data;
    });

    return res.status(200).send({
      message: "Berhasil diikuti!",
      data,
    });
  } catch (error: any) {
    return res.status(error.status || 500).send({
      message: error.message || "Internal Error!",
    });
  }
};

export const unFollow = async (req: TRequest, res: Response) => {
  try {
    const followingId = Number(req.params.followingId);
    const followerId = req.id;

    if (!followerId || !followingId) {
      throw createError(400, "Missing required fields");
    }

    if (typeof followingId !== "number") {
      throw createError(400, "Invalid data type");
    }

    await Follow.destroy({
      where: { followingId, followerId },
    });

    return res.status(200).send({
      message: "Berhenti mengikuti!",
      data: {
        followingId,
      },
    });
  } catch (error: any) {
    return res.status(error.status || 500).send({
      message: error.message || "Internal Error!",
    });
  }
};
