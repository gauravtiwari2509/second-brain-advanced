import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import { GroupModel } from "@/model/group.model";
import { ContentModel } from "@/model/content.model";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        {
          message: "unauthorized",
        },
        { status: 401 }
      );
    }
    const userId = session?.user.id;
    await dbConnect();
    const groups = await GroupModel.find({ userId }).select("-userId");
    return NextResponse.json(
      {
        message: "groups fetched successfully",
        data: groups,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "error while fetching group details" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        {
          message: "unauthorized",
        },
        { status: 401 }
      );
    }
    const { name } = await req.json();
    const userId = session?.user.id;
    await dbConnect();
    const isGroupAvailable = await GroupModel.findOne({ name, userId });
    if (isGroupAvailable) {
      return NextResponse.json(
        {
          message: "group already exist try new name",
        },
        { status: 400 }
      );
    }
    const newGroup = await GroupModel.create({ name, userId });
    await newGroup.save();
    return NextResponse.json(
      {
        message: "group created successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "internal server error",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const groupId = req.nextUrl.searchParams.get("groupId");
    if (!groupId) {
      return NextResponse.json(
        { message: "contentId is required" },
        { status: 400 }
      );
    }

    const userId = session.user.id;
    await dbConnect();

    await ContentModel.deleteMany({
      group: groupId,
      userId: userId,
    });
    const deleteResult = await GroupModel.deleteOne({
      _id: groupId,
      userId,
    });

    if (deleteResult.deletedCount === 0) {
      return NextResponse.json(
        { message: "group not found or unauthorized to delete" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Group deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting Group:", error);

    return NextResponse.json(
      { message: "An error occurred while deleting the content" },
      { status: 500 }
    );
  }
}
