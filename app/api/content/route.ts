import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { ContentModel } from "@/model/content.model";
import dbConnect from "@/lib/dbConnect";
import { TagModel } from "@/model/tag.model";
import { GroupModel } from "@/model/group.model";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { url, notes, type, title, tags, group } = await req.json();

    if (!url || !type || !title || !tags || !group) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const tagArray = tags
      .split(" ")
      .map((tag: string) => tag.trim())
      .filter((tag: string) => tag !== "");

    if (tagArray.length === 0) {
      return new NextResponse("At least one tag is required", { status: 400 });
    }

    await dbConnect();

    const tagDocuments = await Promise.all(
      tagArray.map(async (tagName: string) => {
        let tag = await TagModel.findOne({ title: tagName });

        if (!tag) {
          tag = new TagModel({ title: tagName });
          await tag.save();
        }

        return tag._id;
      })
    );

    let groupDoc = await GroupModel.findOne({
      name: group,
      userId: session.user.id,
    });
    if (!groupDoc) {
      const groupDoc = new GroupModel({ name: group, userId: session.user.id });
      await groupDoc.save();
    }

    const newContent = new ContentModel({
      url,
      notes,
      type,
      title,
      tags: tagDocuments,
      group: groupDoc._id,
      userId: session.user.id,
    });

    const savedContent = await newContent.save();

    return NextResponse.json(
      {
        message: "Content created successfully",
        content: savedContent,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating content:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const UserId = session.user.id;
    await dbConnect();

    const content = await ContentModel.find({ userId: UserId })
      .select("-userId")
      .populate({
        path: "tags",
        model: "Tags",
        select: "-createdAt -updatedAt",
      })
      .populate({
        path: "group",
        model: "Groups",
        select: "-createdAt -updatedAt -subGroups -userId",
      })
      .sort({ createdAt: -1 });

    if (!content) {
      return NextResponse.json(
        { message: "No content found for this user" },
        { status: 204 }
      );
    }

    return NextResponse.json(
      {
        data: content,
        message: "Content fetched successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching content:", error);

    return NextResponse.json(
      { message: "An error occurred while fetching the content" },
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

    const contentId = req.nextUrl.searchParams.get("contentId");
    if (!contentId) {
      return NextResponse.json(
        { message: "contentId is required" },
        { status: 400 }
      );
    }

    const userId = session.user.id;
    await dbConnect();

    const deleteResult = await ContentModel.deleteOne({
      _id: contentId,
      userId,
    });

    if (deleteResult.deletedCount === 0) {
      return NextResponse.json(
        { message: "Content not found or unauthorized to delete" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Content deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting content:", error);

    return NextResponse.json(
      { message: "An error occurred while deleting the content" },
      { status: 500 }
    );
  }
}
