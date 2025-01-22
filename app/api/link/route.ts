import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import { ILink, LinkModel } from "@/model/link.model";

function generateCharacterHash(): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 9; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
}
export async function POST() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const UserId = session.user.id;
    await dbConnect();
    const existingLink: ILink | null = await LinkModel.findOne({ UserId });

    if (existingLink) {
      return NextResponse.json(
        { message: "link already existed" },
        { status: 201 }
      );
    }

    const hash = generateCharacterHash();
    const newLink = new LinkModel({ hashId: hash, UserId });
    await newLink.save();
    return NextResponse.json(
      { message: "link created successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log("error while generating link", error);
    NextResponse.json(
      {
        message: "error while creating the link",
      },
      { status: 400 }
    );
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
    const existingLink: ILink | null = await LinkModel.findOne({ UserId });
    if (!existingLink) {
      return NextResponse.json(
        {
          message: "link not found try to first create the link",
        },
        { status: 201 }
      );
    }
    return NextResponse.json(
      {
        hash: existingLink.hashId,
        message: "link fetched successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("error while fetching the link", error);
  }
}

export async function DELETE() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const UserId = session.user.id;
    await dbConnect();
    const existingLink: ILink | null = await LinkModel.findOne({ UserId });

    if (!existingLink) {
      return NextResponse.json({ message: "link not found" }, { status: 201 });
    }

    await LinkModel.deleteOne({ hashId: existingLink.hashId, UserId });
    return NextResponse.json(
      {
        message: "link deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    NextResponse.json(
      {
        message: "error while deleting link internal server error",
      },
      { status: 500 }
    );
  }
}
