import dbConnect from "@/lib/dbConnect";
import { ContentModel } from "@/model/content.model";
import { LinkModel } from "@/model/link.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { hashId } = await req.json();
    console.log(hashId);
    console.log("request come");
    await dbConnect();
    const existingLink: any = await LinkModel.find({ hashId });
    const UserId = existingLink.UserId;
    const content = await ContentModel.find({ UserId })
      .select("-userId")
      .populate({
        path: "tags",
        model: "Tags",
        select: "-createdAt -updatedAt",
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
    console.log("error while getting shared content", error);
    NextResponse.json({ message: "internal server error" }, { status: 500 });
  }
}
